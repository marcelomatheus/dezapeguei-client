export function formatMoneyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function parseMoneyToNumber(maskedValue: string): number {
  const digits = maskedValue.replace(/\D/g, "");
  if (!digits) {
    return 0;
  }

  return Number(digits) / 100;
}

export function formatMoneyInput(value: number): string {
  return formatMoneyBRL(Number.isFinite(value) ? value : 0);
}

export function maskPhoneBR(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function normalizePhoneDigits(input?: string | null): string {
  return (input ?? "").replace(/\D/g, "");
}

export function normalizePhoneForWhatsapp(input?: string | null): string | null {
  const digits = normalizePhoneDigits(input);

  if (!digits) {
    return null;
  }

  if (digits.length < 10) {
    return null;
  }

  return digits.length <= 11 ? `55${digits}` : digits;
}
