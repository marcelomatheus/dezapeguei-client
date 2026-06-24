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

export function formatDateBR(value: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTimeBR(value: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function normalizeDocumentDigits(input?: string | null): string {
  return (input ?? "").replace(/\D/g, "").slice(0, 14);
}

export function maskCpfCnpj(input: string): string {
  const digits = normalizeDocumentDigits(input);

  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}
