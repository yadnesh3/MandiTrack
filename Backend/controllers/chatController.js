const https = require("https");

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1500;

const SYSTEM_PROMPT =
  "You are MandiTrack Assistant, a helpful bilingual assistant for Indian farmers and mandi officers. " +
  "Answer in the user's language (English, Marathi, or Hindi). Help with MandiTrack features, lot tracking, mandi processes, and interpreting displayed prices. " +
  "Do not invent live market prices, financial guarantees, or personal account data. Keep answers clear and concise.";

const sendGroqError = (res, status, code, message) =>
  res.status(status).json({ success: false, code, message });

const chat = (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return sendGroqError(
      res,
      503,
      "GROQ_NOT_CONFIGURED",
      "Chat assistant is not configured yet. Add GROQ_API_KEY to the backend environment and restart the server."
    );
  }

  const rawMessages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = rawMessages
    .slice(-MAX_MESSAGES)
    .filter((message) => message && ["user", "assistant"].includes(message.role))
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((message) => message.content);

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return sendGroqError(res, 400, "INVALID_CHAT_MESSAGE", "Please enter a message for the assistant.");
  }

  const requestBody = JSON.stringify({
    model: GROQ_MODEL,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    temperature: 0.3,
    max_tokens: 500,
  });

  let completed = false;
  const fail = (status, code, message) => {
    if (completed) return;
    completed = true;
    sendGroqError(res, status, code, message);
  };

  const groqRequest = https.request(
    GROQ_API_URL,
    {
      method: "POST",
      timeout: 20000,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    },
    (groqResponse) => {
      let body = "";
      groqResponse.setEncoding("utf8");
      groqResponse.on("data", (chunk) => {
        body += chunk;
      });
      groqResponse.on("end", () => {
        if (completed) return;

        try {
          const payload = JSON.parse(body);
          const reply = payload.choices?.[0]?.message?.content?.trim();

          if (groqResponse.statusCode !== 200 || !reply) {
            console.error("Groq chat request failed with HTTP", groqResponse.statusCode, payload.error?.message || "");
            return fail(502, "GROQ_UPSTREAM_ERROR", "The chat assistant is temporarily unavailable. Please try again.");
          }

          completed = true;
          return res.status(200).json({ success: true, reply });
        } catch (error) {
          console.error("Unable to parse Groq response:", error.message);
          return fail(502, "GROQ_UPSTREAM_ERROR", "The chat assistant returned an invalid response. Please try again.");
        }
      });
    }
  );

  groqRequest.on("error", (error) => {
    console.error("Groq chat request failed:", error.message);
    fail(502, "GROQ_UPSTREAM_ERROR", "The chat assistant is temporarily unavailable. Please try again.");
  });

  groqRequest.on("timeout", () => {
    groqRequest.destroy();
    fail(504, "GROQ_TIMEOUT", "The chat assistant is taking too long to respond. Please try again.");
  });

  groqRequest.write(requestBody);
  groqRequest.end();
};

module.exports = { chat };
