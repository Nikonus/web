const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function generateVideoMeta(title: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Generate a professional YouTube-style video description and 5 SEO tags 
for this video title:

"${title}"

Return response strictly in this JSON format:

{
  "description": "...",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}
`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("Gemini response invalid");

  return JSON.parse(text);
}