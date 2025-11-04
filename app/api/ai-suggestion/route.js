import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const client = new OpenAI();
const sysPrompt = `
You are an intellegent agent specialize in writing better prompt and its handling on image generation.
The user will give you a prompt for image generation for youtube video. 
Yu need to return an array of small prompt which will improve his prompt.
You can think in different dimension, so that he will get best result which user requires.

Ouput expected: Only return a json object. with key 'suggestion' and value must be an array [], don't give more than 5 suggestion. 
Don't return anything else except for the above.
Strictly follow the above rules.
Ex:
user: 'create an image for 1st episode of cooking for series chai and cooking'
assistant: { suggestion: ["Make it more vibrant", "Focus on a cinematic shot", "Add a catchy line", "Make it look permium", "Indian style"]}
`;

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    if (prompt) {
      try {
        const response = await client.responses.create({
          model: "gpt-4.1-nano",
          input: [
            { role: "system", content: sysPrompt },
            { role: "user", content: prompt },
          ],
        });
        const suggestion = JSON.parse(response.output_text).suggestion;

        return NextResponse.json({
          suggestion: suggestion,
        });
      } catch (error) {
        console.error("Backend :: Ai-Suggestion :: error ", error);
      }
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
