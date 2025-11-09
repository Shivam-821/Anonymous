/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export async function POST(req: Request) {
  try {

    const { userInput } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY not set.");
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing Google API Key. Please set GOOGLE_GENERATIVE_AI_API_KEY in .env.",
        },
        { status: 500 }
      );
    }

    const prompt = 
  !userInput || userInput.trim() === ""
    ? `Generate a single string containing two open-ended, engaging questions separated by '||'. 
       Questions must be respectful and free of hate speech, and should avoid offending anyone on religious, political, caste, or racial grounds. 
       Use a warm, human tone with emotional keywords such as emotional, exiciting fighter, personal, supportive, love, respect (use some, not all). 
       Vary the style: some questions can sound like they come from a lover, some from a curious friend, and some exploring how the receiver plans and spends their day. 
       Keep them heartfelt and unique, not repetitive. !!IMPORTANT!! CONTENT MUST NOT ME LARGER THAN 100 WORDS`
    : `Continue this thought in an anonymous, open-ended way: "${userInput}" !!IMPORTANT!! CONTENT MUST NOT ME LARGER THAN 100 WORDS and should have some important and curiosity in it.`;


    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-09-2025",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = result.responseId;
    const text = result.text;

    return NextResponse.json({ success: true, text }, { status: 200 });
  } catch (error: any) {
    console.error("Suggest API error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Which book you like most to read and suggest others to read.||Is there any plan for this weekend",
      },
      { status: 500 }
    );
  }
}
