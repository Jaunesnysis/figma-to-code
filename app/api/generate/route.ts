import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert frontend developer. 
A user will give you a screenshot of a UI design.
Your job is to convert it into a clean, production-ready React functional component using Tailwind CSS.

Rules:
- Return ONLY the component code, nothing else
- No explanation, no markdown backticks, no comments outside the code
- Use only Tailwind CSS for styling, no custom CSS
- Use placeholder text where you see text content
- Use placeholder images from https://placehold.co where you see images
- Make it a default export
- Component must be self-contained, no props needed
- Use realistic, clean code a senior developer would write`;

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const base64Data = image.split(",")[1];
    const mimeType = image.split(";")[0].split(":")[1];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mimeType,
                  data: base64Data,
                },
              },
              {
                type: "text",
                text: "Convert this UI screenshot into a React + Tailwind component.",
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Claude error:", data);
      return NextResponse.json({ error: "Claude API error" }, { status: 500 });
    }

    const code = data.content?.[0]?.text;

    if (!code) {
      return NextResponse.json({ error: "No code generated" }, { status: 500 });
    }

    return NextResponse.json({ code });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
