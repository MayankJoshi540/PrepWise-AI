"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";

const CATEGORY_PROMPTS = {
  FRONTEND: "React, JavaScript, CSS, performance, accessibility, browser APIs",
  BACKEND:
    "Node.js, REST APIs, databases, authentication, caching, scalability",
  FULLSTACK:
    "full-stack architecture, API design, state management, deployment",
  DSA: "data structures, algorithms, time complexity, problem solving",
  SYSTEM_DESIGN:
    "distributed systems, scalability, databases, microservices, caching",
  BEHAVIORAL:
    "leadership, teamwork, conflict resolution, career growth, STAR method",
  DEVOPS: "CI/CD, Docker, Kubernetes, cloud infrastructure, monitoring",
  MOBILE:
    "React Native, iOS/Android, performance, offline support, app lifecycle",
};

export const generateInterviewQuestions = async ({ category, difficulty = "Medium" }) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  if (!category || !CATEGORY_PROMPTS[category])
    throw new Error("Invalid category");

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  const prompt = `
You are a senior technical interviewer conducting a realistic AI mock interview.

Generate exactly 6 interview questions for a ${category} role. Every question must be exactly at ${difficulty} difficulty.

Focus on the following topics:
${CATEGORY_PROMPTS[category]}

Requirements:
- Ensure all questions are tailored for the selected difficulty level: ${difficulty}.
- Include both conceptual and practical, real-world scenario questions.
- Questions should sound natural, like they are being asked in a live interview.
- Avoid duplicate or overly similar questions.
- Each question should test understanding rather than simple memorization.

For every question, provide:
- "question": The interview question.
- "answer": An ideal answer (2–5 concise sentences) that covers the key points expected from a strong candidate at this difficulty.
- "difficulty": "${difficulty}"
- "topic": The primary concept being tested.

Return ONLY a valid JSON array in the following format:

[
  {
    "question": "...",
    "answer": "...",
    "difficulty": "${difficulty}",
    "topic": "..."
  }
]

Do not include markdown, code fences, explanations, or any text outside the JSON array.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const clean = text.replace(/^```json|^```|```$/gm, "").trim();
  const questions = JSON.parse(clean);

  return { questions };
};