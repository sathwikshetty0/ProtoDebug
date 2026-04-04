import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { mode, context, issue } = await req.json();

  const systemPrompt = `You are an expert debugging assistant for IoT and web development prototyping.
You help developers identify and fix problems quickly during prototyping.
Be concise, practical, and specific. Use bullet points and code snippets where helpful.
Focus on the most likely causes first.`;

  let userMessage: string;

  if (mode === "proactive") {
    userMessage = `I am building: ${context}

List the most common problems and pitfalls I am likely to face during prototyping.
For each problem, briefly explain why it happens and how to prevent or fix it.
Focus on practical, real issues that come up frequently.`;
  } else {
    userMessage = `I am working on: ${context}

Problem / Issue I am facing:
${issue}

Diagnose the likely cause(s) and give me step-by-step instructions to fix it.
Include any relevant code snippets or commands.`;
  }

  const stream = client.messages.stream({
    model: "claude-opus-4-6",
    max_tokens: 2048,
    thinking: { type: "adaptive" },
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
