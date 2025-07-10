import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  const systemPrompt = process.env.SYSTEM_PROMPT;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || !systemPrompt) {
    return NextResponse.json({ error: "Configuração do servidor ausente." }, { status: 500 });
  }

  const messages = [
    { role: "system", content: systemPrompt },
    ...(history || []),
    { role: "user", content: message }
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
