type RequiredEnvKey = "NEXT_PUBLIC_API_URL" | "NEXT_PUBLIC_WS_URL";

type EnvShape = {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_WS_URL: string;
};

function getRequiredEnvValue(key: RequiredEnvKey): string {
  const value = process.env[key];

  if (!value && typeof window !== "undefined") {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value ?? "";
}

export const env: EnvShape = {
  NEXT_PUBLIC_API_URL: 'http://localhost:8080',
  NEXT_PUBLIC_WS_URL: 'ws://localhost:8000',
};
