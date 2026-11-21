import type { CartItem, CheckoutFormData } from "@/types";
import { computeCartTotals, type CartTotals } from "@/store";

export const CHECKOUT_COUNTRIES = [
  { code: "FR", label: "France", postalPattern: /^\d{5}$/ },
  { code: "BE", label: "Belgique", postalPattern: /^\d{4}$/ },
  { code: "CH", label: "Suisse", postalPattern: /^\d{4}$/ },
  { code: "LU", label: "Luxembourg", postalPattern: /^(L-?)?\d{4}$/i },
] as const;

export type CheckoutCountryCode = (typeof CHECKOUT_COUNTRIES)[number]["code"];

export const FIELD_LIMITS = {
  fullName: { min: 2, max: 80 },
  email: { max: 120 },
  address: { min: 5, max: 160 },
  city: { min: 2, max: 80 },
  postalCode: { max: 10 },
  notes: { max: 500 },
} as const;

export type CheckoutField = keyof CheckoutFormData;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

export const EMPTY_CHECKOUT_FORM: CheckoutFormData = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "FR",
  notes: "",
};

// Pragmatic email check (RFC-complete validation belongs server-side / Stripe).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function checkLength(
  value: string,
  limits: { min?: number; max: number },
  label: string
): string | undefined {
  if (limits.min !== undefined && value.length < limits.min) {
    return value.length === 0
      ? `${label} est obligatoire.`
      : `${label} : ${limits.min} caractères minimum.`;
  }
  if (value.length > limits.max) {
    return `${label} : ${limits.max} caractères maximum.`;
  }
  return undefined;
}

/** Trims every field; never mutates the input. */
export function normalizeCheckoutForm(
  data: CheckoutFormData
): CheckoutFormData {
  return {
    fullName: data.fullName.trim().replace(/\s+/g, " "),
    email: data.email.trim().toLowerCase(),
    address: data.address.trim(),
    city: data.city.trim(),
    postalCode: data.postalCode.trim().toUpperCase(),
    country: data.country.trim().toUpperCase(),
    notes: data.notes?.trim() ?? "",
  };
}

/** Validates a normalised form. Returns an empty object when valid. */
export function validateCheckoutForm(data: CheckoutFormData): CheckoutErrors {
  const errors: CheckoutErrors = {};

  const fullName = checkLength(data.fullName, FIELD_LIMITS.fullName, "Le nom");
  if (fullName) errors.fullName = fullName;

  if (data.email.length === 0) {
    errors.email = "L'e-mail est obligatoire.";
  } else if (
    data.email.length > FIELD_LIMITS.email.max ||
    !EMAIL_PATTERN.test(data.email)
  ) {
    errors.email = "Adresse e-mail invalide.";
  }

  const address = checkLength(data.address, FIELD_LIMITS.address, "L'adresse");
  if (address) errors.address = address;

  const city = checkLength(data.city, FIELD_LIMITS.city, "La ville");
  if (city) errors.city = city;

  const country = CHECKOUT_COUNTRIES.find((c) => c.code === data.country);
  if (!country) {
    errors.country = "Pays de livraison non pris en charge.";
  }

  if (data.postalCode.length === 0) {
    errors.postalCode = "Le code postal est obligatoire.";
  } else if (
    data.postalCode.length > FIELD_LIMITS.postalCode.max ||
    (country && !country.postalPattern.test(data.postalCode))
  ) {
    errors.postalCode = "Code postal invalide pour ce pays.";
  }

  if ((data.notes ?? "").length > FIELD_LIMITS.notes.max) {
    errors.notes = `Note : ${FIELD_LIMITS.notes.max} caractères maximum.`;
  }

  return errors;
}

export interface DemoOrder {
  reference: string;
  createdAt: string;
  customer: CheckoutFormData;
  items: readonly CartItem[];
  totals: CartTotals;
}

function createOrderReference(): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `MECA-${random.toUpperCase()}`;
}

/**
 * Demo order creation. Stripe hook point: replace the body with a call to a
 * Route Handler creating a Checkout Session (server re-prices from `@/data`,
 * never trusts client totals) and redirect to `session.url`.
 */
export function createDemoOrder(
  customer: CheckoutFormData,
  items: readonly CartItem[]
): DemoOrder {
  return {
    reference: createOrderReference(),
    createdAt: new Date().toISOString(),
    customer,
    items: [...items],
    totals: computeCartTotals(items),
  };
}
