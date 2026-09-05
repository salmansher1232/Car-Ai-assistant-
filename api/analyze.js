module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { image } = req.body || {};

    if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
      return res.status(400).json({
        error: "Image data is required."
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Analyze this car auction sheet or car photo. Extract only information that is actually visible. If something is unclear, say Unknown and do not invent it. Give: Make/Model, Year, Mileage, Auction Grade, Damage/Repair Notes, visible parts damage, important repair risks, and a short BUY or SKIP recommendation."
              },
              {
                type: "input_image",
                image_url: image,
                detail: "high"
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "AI request failed"
      });
    }

    return res.status(200).json({
      result: data.output_text || "No analysis returned."
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error."
    });
  }
};
