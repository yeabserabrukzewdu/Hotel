
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  return typeof process !== 'undefined' ? process.env.API_KEY : '';
};

export const getWellnessAdvice = async (userGoal: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "I am currently polishing our luxury recommendations. Please contact our front desk for immediate assistance.";

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userGoal,
      config: {
        systemInstruction: "You are an elite fitness and wellness concierge for L.A. Hotel & Spa in Addis Ababa. Provide a sophisticated, concise recommendation (under 100 words) that includes gym, spa, and nutrition advice available at our hotel.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently polishing our luxury recommendations. Please contact our front desk for immediate assistance.";
  }
};

export const generateReservationEmail = async (bookingDetails: any) => {
  const apiKey = getApiKey();
  if (!apiKey) return `Confirmation of your stay at L.A. Hotel & Spa. We look forward to welcoming you to your ${bookingDetails.roomName} from ${bookingDetails.checkIn} to ${bookingDetails.checkOut}.`;

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a luxury confirmation email for guest: ${bookingDetails.name}. 
      Room: ${bookingDetails.roomName}. 
      Dates: ${bookingDetails.checkIn} to ${bookingDetails.checkOut}. 
      Special Request: ${bookingDetails.specialRequest || 'None'}.
      Include a welcoming mention of our high-altitude fitness center and Bole spa.`,
      config: {
        systemInstruction: "You are the Head Concierge at L.A. Hotel & Spa. Your writing is elegant, formal, and welcoming. Use sophisticated vocabulary. Format the email beautifully (Plain text but visually structured). Mention that this email is sent from the official reservations desk at yeabserabruk1234@gmail.com.",
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Email Generation Error:", error);
    return `Confirmation of your stay at L.A. Hotel & Spa. We look forward to welcoming you to your ${bookingDetails.roomName} from ${bookingDetails.checkIn} to ${bookingDetails.checkOut}.`;
  }
};

export const generateAdminInsights = async (stats: any) => {
  const apiKey = getApiKey();
  if (!apiKey) return "Unable to generate insights at this time.";

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these hotel fitness center stats: ${JSON.stringify(stats)}. Suggest 3 strategic actions to increase high-end membership retention and revenue in 150 words or less.`,
      config: {
        systemInstruction: "You are a senior hospitality business analyst specializing in high-end wellness and fitness center operations.",
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Unable to generate insights at this time.";
  }
};
