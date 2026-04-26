import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { AIRecommendation } from "@/types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    // ── Auth guard ──────────────────────────────────────────────
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to use the AI assistant." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const query: string = body.query ?? "";

    if (!query.trim()) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY is not set. Returning fallback data.");
      return generateFallback(query);
    }

    // Fetch catalog to provide context to the AI
    let catalog = [];
    try {
      catalog = await prisma.product.findMany({
        select: { name: true, slug: true, description: true, category: true, price: true },
      });
    } catch (dbError) {
      console.error("Failed to fetch catalog for AI context:", dbError);
      return NextResponse.json(
        { error: "Database connection failed. Check your .env file." },
        { status: 500 }
      );
    }

    if (catalog.length === 0) {
      return NextResponse.json(
        { error: "Catalog is empty. Please run the database seed first." },
        { status: 400 }
      );
    }

    // Fetch user orders to check if they own a HUB
    let hasBoughtHub = false;
    try {
      const userId = Number(session.user.id);
      if (!isNaN(userId)) {
        const userOrders = await prisma.order.findMany({
          where: { userId },
          include: { items: { include: { product: true } } },
        });
        hasBoughtHub = userOrders.some((order) =>
          order.items.some((item) => item.product.category === "HUB")
        );
      }
    } catch (e) {
      console.error("Failed to check user orders:", e);
    }

    const prompt = `
You are an expert Smart Home and Smart Farming IoT assistant.
A user wants a hardware recommendation based on the following input: "${query}"

Here is our available catalog:
${JSON.stringify(catalog, null, 2)}

Your task is to recommend a curated package of hardware from the catalog that best solves the user's problem.

CRITICAL INSTRUCTIONS:
1. Select components, sensors, and apps that have a direct connection with the user's request.
2. Ownership status: The user has ${hasBoughtHub ? 'ALREADY PURCHASED' : 'NOT PURCHASED'} a HUB.
3. ${!hasBoughtHub ? 'Because the user does not own a HUB, you MUST include a HUB product (category: "HUB") in your recommended package. This is mandatory for new users or first-time buyers.' : 'Since the user already owns a HUB, do NOT include a HUB in the package unless their prompt explicitly asks for another one.'}

Respond ONLY with a valid JSON object adhering strictly to the following structure. Do not include markdown formatting like \`\`\`json.
{
  "packageName": "A creative, short name for the bundle (e.g. 'Kit Monitorizare Aer')",
  "description": "A 1-2 sentence explanation of why these products were chosen.",
  "productSlugs": ["slug1", "slug2"]
}
Only include slugs that exist in the provided catalog.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content || "{}";
    
    // Clean markdown if present
    const cleanJson = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const aiResponse = JSON.parse(cleanJson) as {
      packageName: string;
      description: string;
      productSlugs: string[];
    };

    // Ensure EnvHUB Gateway is always included for new users
    if (!hasBoughtHub) {
      const includesHub = catalog.some(p => p.category === "HUB" && aiResponse.productSlugs.includes(p.slug));
      if (!includesHub) {
        // Prefer the physical gateway; fall back to any HUB category item
        const physicalHub = catalog.find(p => p.slug === "envhub-gateway") ?? catalog.find(p => p.category === "HUB");
        if (physicalHub) {
          aiResponse.productSlugs.unshift(physicalHub.slug); // put it first
        }
      }
    }

    // Fetch the actual products based on recommended slugs
    const recommendedProducts = await prisma.product.findMany({
      where: { slug: { in: aiResponse.productSlugs } },
    });

    const totalPrice = recommendedProducts.reduce((sum, p) => sum + p.price, 0);

    const recommendation: AIRecommendation = {
      packageName: aiResponse.packageName || "Custom IoT Solution",
      description: aiResponse.description || "Based on your needs, we curated this package.",
      products: recommendedProducts,
      totalPrice,
    };

    return NextResponse.json(recommendation);
  } catch (error) {
    console.error("[AI_RECOMMEND_OPENAI]", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to generate recommendation. Details: ${errorMessage}` },
      { status: 500 }
    );
  }
}

async function generateFallback(query: string) {
  try {
    const fallbackProducts = await prisma.product.findMany({
      take: 3,
      orderBy: { featured: "desc" },
    });
    
    const totalPrice = fallbackProducts.reduce((sum, p) => sum + p.price, 0);
    return NextResponse.json({
      packageName: "Starter Pack (Fallback)",
      description: "OPENAI_API_KEY is missing. Showing featured products.",
      products: fallbackProducts,
      totalPrice,
    });
  } catch (e) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
