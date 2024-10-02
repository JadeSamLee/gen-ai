import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { prompt } = body;

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY || "");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    return NextResponse.json(
      {
        message: "success",
        data: responseText,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        message: "failed",
      },
      { status: 500 }
    );
  }
}
