import { aiModelKey } from "../src/lib/constants";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = aiModelKey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const aiChatSession = model.startChat({
  generationConfig,
  history: [],
});
