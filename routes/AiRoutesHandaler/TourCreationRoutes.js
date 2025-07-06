const express = require("express");
const router = express.Router();
const promptForGemini = require("../../Prompts/geminiPrompt");
const {
  generateGeminiResponse,
} = require("../../Controlers/ZarooAi/AiController");
const { z } = require("zod");

const placeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

const tourPackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  places: z.array(placeSchema),
  guideIncluded: z.boolean(),
  transportIncluded: z.boolean(),
  language: z.string(),
  days: z.number().int().positive(),
  priceUSD: z.number().positive(),
  priceIDR: z.number().positive(),
  dateRange: z.string(),
  notes: z.string().optional(),
});

const tourArraySchema = z.array(tourPackageSchema);

router.post("/tours", async (req, res) => {
  const userData = req.body;

  if (!userData.destination || !userData.startDate || !userData.endDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const prompt = promptForGemini(userData);
    const geminiResponse = await generateGeminiResponse(prompt);

    let parsedData;
    try {
      // Step 1: Clean the response
      let cleaned = geminiResponse.trim();

      // Step 2: Remove code block markers like ```json or ```
      if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/```json|```/g, "").trim();
      }

      // Step 3: Parse
      parsedData = JSON.parse(cleaned);
    } catch (e) {
      return res.status(500).json({
        error: "AI did not return valid JSON",
        raw: geminiResponse,
      });
    }
    
    const result = tourArraySchema.safeParse(parsedData);

    console.log(geminiResponse);

    if (!result.success) {
      return res.status(422).json({
        error: "Sanitization failed",
        issues: result.error.issues,
      });
    }

    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({
      error: "Gemini API failed",
      message: err.message,
    });
  }
});

module.exports = router;
