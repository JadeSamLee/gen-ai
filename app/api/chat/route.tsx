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
  } catch (error: unknown) {
    // Change 'any' to 'unknown'
    console.log("Error while fetching response :: ", error);

    // Optionally, you can cast 'error' if you need to access specific properties
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Failed", error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}
