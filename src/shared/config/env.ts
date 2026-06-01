type RequiredEnvKey = "NEXT_PUBLIC_API_URL" | "NEXT_PUBLIC_WS_URL";

function getRequiredEnvValue(key: RequiredEnvKey, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  NEXT_PUBLIC_API_URL: getRequiredEnvValue(
    "NEXT_PUBLIC_API_URL",
    process.env.NEXT_PUBLIC_API_URL,
  ),
  NEXT_PUBLIC_WS_URL: getRequiredEnvValue(
    "NEXT_PUBLIC_WS_URL",
    process.env.NEXT_PUBLIC_WS_URL,
  ),
} as const;
