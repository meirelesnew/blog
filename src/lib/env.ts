export function validateEnv() {
  const required = ["GEMINI_API_KEY", "DATABASE_URL"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
    DATABASE_URL: process.env.DATABASE_URL!,
    POST_CONTEXT: process.env.POST_CONTEXT || "",
  };
}
