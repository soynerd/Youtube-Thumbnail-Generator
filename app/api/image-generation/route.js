import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs/promises";
import path from "path";

const sysPrompt = `
You are an intellegent agent specialize in writing better prompt and its handling on image generation.
The user will give you a prompt for image generation for youtube video, you have to give prompt for making a thubnail of video.
Enhace it, and make it more detailed so that the model can generate a better image.
Output Rules:
Strictly return array of six modified prompt only.
Use Double quotation for all string, and inside a string if you want to highlite a heading use single quotation.

Ex:
developer: {domains: [educator, tech], Style: [Realistic], customStyle: 'It should be futuristic', suggestions: [Include a good background, Add bold text]}
user: 'I am a tech youtuber, and i want a thumbnail image for promotional video. It should vibe with the tech enthusiast.'
assistant: ['Create an high defination image with the available image for a tech youtuber. Its a promotional video. Its should match with lastest thumbnail creation as youtuber are using.',
'Create a realistic futuristic thumbnail for a tech YouTube channel. The design should capture the enthusiasm of tech lovers with bold, eye-catching text and a dynamic background. Emphasize a professional yet exciting style that feels modern and futuristic.',
'Generate a promotional YouTube thumbnail for a tech educator. The style should be realistic with a futuristic vibe, featuring a clean but impactful background and large bold typography. The mood should inspire curiosity and excitement for technology.',
'Design a tech-focused YouTube thumbnail that feels realistic and futuristic. Include bold text overlays, a visually engaging background related to innovation (like neon circuits, futuristic city, or abstract tech patterns), and an overall energetic vibe for tech enthusiasts.',
'Make a high-quality YouTube thumbnail for a tech YouTuber. The style must be realistic yet futuristic, with a polished educational-tech aesthetic. Add bold, attention-grabbing text and ensure the background enhances the futuristic technology theme.',
'Produce a futuristic realistic thumbnail for a tech YouTube promotional video. It should appeal to tech enthusiasts and learners, featuring bold, readable text, a strong tech-inspired background, and a clean, professional composition suitable for a YouTube educator.',
]

`;

const client = new OpenAI();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    // Parse FormData (not JSON!)
    const formData = await request.formData();

    const prompt = formData.get("prompt");
    const domains = JSON.parse(formData.get("domains") || "[]");
    const styles = JSON.parse(formData.get("styles") || "[]");
    const customStyle = formData.get("customStyle") || "";
    const suggestions = JSON.parse(formData.get("suggestions") || "[]");

    // Uploaded images
    const files = formData.getAll("images"); // array of File objects
    const images = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return buffer.toString("base64");
      })
    );

    const developerContent = { domains, styles, customStyle, suggestions };

    // Step 1: Ask GPT to create 6 enhanced prompts
    const queryResponse = await client.responses.create({
      model: "gpt-4.1",
      input: [
        { role: "system", content: sysPrompt },
        { role: "developer", content: JSON.stringify(developerContent) },
        { role: "user", content: prompt },
      ],
    });

    const raw = queryResponse.output_text.trim();
    let prompts;
    try {
      prompts = JSON.parse(raw); // Expecting array of strings
    } catch (err) {
      console.error("❌ Failed to parse GPT output:", raw);
      return NextResponse.json(
        { message: "Invalid GPT output", raw },
        { status: 500 }
      );
    }

    // Step 2: Generate images with Gemini
    const requests = prompts.map(async (p, idx) => {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image-preview",
          contents: [
            { text: p },
            ...(images.length > 0
              ? [
                  {
                    inlineData: {
                      mimeType: "image/png",
                      data: images[0], // use first uploaded image
                    },
                  },
                ]
              : []),
          ],
        });

        const parts = response.candidates?.[0]?.content?.parts || [];
        const inline = parts.find((pt) => pt.inlineData);

        if (inline?.inlineData?.data) {
          const base64 = inline.inlineData.data;
          const dataUrl = `data:image/png;base64,${base64}`;
          return { idx, image: dataUrl };
        }

        return { idx, error: "No image returned" };
      } catch (err) {
        console.error(`❌ Gemini request ${idx} failed:`, err);
        return { idx, error: err.message };
      }
    });

    const results = await Promise.all(requests);

    // Return JSON with images back to frontend
    return NextResponse.json({ images: results });
  } catch (error) {
    console.error("❌ Error in API route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
