import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  const body = await req.json();
  const budgetSummary = body.budgetSummary;

  if (!budgetSummary) {
    return NextResponse.json({ error: "Budget summary is required" }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Here is a user's budget: ${budgetSummary}. Provide a list of actionable recommendations to save money. No need to sort into different sections; please have one actionable item per line and give 10 items.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;

    const generatedText = response.text();
    const recommendations = generatedText
      .split("\n")
      .filter((rec) => rec.trim() !== "");

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}
