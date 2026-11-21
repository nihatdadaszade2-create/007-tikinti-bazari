/** Shared contact-form validation — used by both the browser and the API route. */
export interface ContactInput {
  name: string;
  phone: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 80, phone: 20, message: 1000 } as const;

/** Strip control characters / angle brackets and collapse whitespace. */
export function sanitize(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, max);
}

export function cleanContact(raw: Record<string, unknown>): ContactInput {
  return {
    name: sanitize(raw.name, LIMITS.name),
    phone: sanitize(raw.phone, LIMITS.phone),
    message: sanitize(raw.message, LIMITS.message),
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.length < 2) errors.name = "Adınızı daxil edin (ən azı 2 simvol).";
  const digits = input.phone.replace(/\D/g, "");
  if (!/^[+\d\s()-]+$/.test(input.phone) || digits.length < 9 || digits.length > 15)
    errors.phone = "Düzgün telefon nömrəsi daxil edin, məs.: +994 50 123 45 67";
  if (input.message.length < 10) errors.message = "Mesajınızı yazın (ən azı 10 simvol).";
  return errors;
}
