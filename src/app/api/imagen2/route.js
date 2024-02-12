const url = "https://api.together.xyz/v1/completions";
const apiKey = process.env.TAI_API_KEY;

export async function POST(req2) {
  const req = await req2.json();
  const inputText = req.inputText;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: inputText,
        negative_prompt: "",
        request_type: "image-model-inference",
        width: 1024,
        height: 1024,
        steps: 40,
        n: 2,
        seed: 9193,
        promptObj: {
          prompt: "",
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    const stat = response.status;
    const str = result.choices[0].image_base64;
    // console.log("Image 64:", str);
    const responseBody = JSON.stringify({ string: str });
    const responseHeaders = {
      "Content-Type": "application/json",
      // Add more headers if needed
    };

    return new Response(responseBody, {
      status: stat,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(error);
    return new Response({ err: error.message });
  }
}
