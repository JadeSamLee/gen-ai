
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/tunedModels/socratic-teaching-assistant-zeovionhaia7:generateContent?key=` +
        process.env.NEXT_PUBLIC_API_KEY,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    const responseText = response.data.candidates[0].content.parts[0].text;

    return NextResponse.json(
      {
        message: "success",
        data: responseText,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("Error while fetching response :: ", error);

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
