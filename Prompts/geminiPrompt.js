// geminiPrompt.js
function promptForGemini({
  destination,
  premium,
  startDate,
  endDate,
  adults,
  children,
  specialRequests,
  paymentMethod,
}) {
  return `
  You are a travel AI assistant. Based on the user input below, generate 10 to 20 tour package options.
  
  **User Input:**
  - Destination: ${destination}
  - Package type: ${premium}
  - Travel dates: ${startDate} to ${endDate}
  - Adults: ${adults}
  - Children: ${children}
  - Special requests: ${specialRequests || "None"}
  - Payment method: ${
    paymentMethod === "before" ? "Before the tour" : "After the tour"
  }
  
  **Instructions:**
  1. Suggest famous tourist spots in ${destination}.
  2. Generate 10–20 unique tour packages with:
     - id (e.g., "P001")
     - name
     - places: array of objects { name, description }
     - guideIncluded: boolean
     - transportIncluded: boolean
     - language: string
     - days: positive integer
     - priceUSD: number
     - priceIDR: number
     - dateRange: "${startDate} to ${endDate}"
     - notes: optional string
  
  **Output Format:**
  Return ONLY a **valid JSON array**, without any extra explanation, markdown, or text.
  `;
}

module.exports = promptForGemini;
