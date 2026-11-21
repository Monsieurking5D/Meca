"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleCheck, Lock, ShoppingBag } from "lucide-react";
import { useCart } from "@/store";
import type { CheckoutFormData } from "@/types";
import { cn, formatPriceEur } from "@/lib/utils";
import {
  CHECKOUT_COUNTRIES,
  createDemoOrder,
  EMPTY_CHECKOUT_FORM,
  FIELD_LIMITS,
  normalizeCheckoutForm,
  validateCheckoutForm,
  type CheckoutErrors,
  type CheckoutField,
  type DemoOrder,
} from "./checkout-logic";

const INPUT_CLASS =
  "mt-1.5 block w-full rounded-lg border bg-bg px-3 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30";

interface FieldProps {
  name: CheckoutField;
  label: string;
  error?: string;
  className?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
    className: string;
  }) => React.ReactNode;
}

function Field({ name, label, error, className, children }: FieldProps) {
  const id = `checkout-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
        className: cn(
          INPUT_CLASS,
          error ? "border-danger" : "border-border hover:border-border-strong"
        ),
      })}
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function OrderConfirmation({ order }: { order: DemoOrder }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-success/30 bg-surface p-8 text-center">
      <CircleCheck
        className="mx-auto h-12 w-12 text-success"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h2 className="mt-4 text-xl font-semibold text-text">
        Commande enregistrée (démo)
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        Merci {order.customer.fullName}. Aucun paiement n&apos;a été prélevé :
        ce tunnel est une démonstration.
      </p>
      <dl className="mt-6 space-y-1.5 rounded-lg border border-border bg-bg p-4 text-left text-sm">
        <div className="flex justify-between">
          <dt className="text-text-secondary">Référence</dt>
          <dd className="font-mono text-accent">{order.reference}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">Articles</dt>
          <dd className="font-mono tabular-nums">{order.totals.itemCount}</dd>
        </div>
        <div className="flex justify-between font-semibold">
          <dt>Total</dt>
          <dd className="font-mono tabular-nums">
            {formatPriceEur(order.totals.totalEur)}
          </dd>
        </div>
      </dl>
      <Link
        href="/shop"
        className="mt-6 inline-flex h-11 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
      >
        Retour à la boutique
      </Link>
    </div>
  );
}

/** Demo checkout: validated shipping form + order summary. Stripe-ready seam in `createDemoOrder`. */
export function CheckoutForm() {
  const { items, totals, isHydrated, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormData>(EMPTY_CHECKOUT_FORM);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [order, setOrder] = useState<DemoOrder | null>(null);

  if (order) {
    return <OrderConfirmation order={order} />;
  }

  if (!isHydrated) {
    return (
      <div
        className="h-96 animate-pulse rounded-2xl border border-border bg-surface"
        aria-busy="true"
        aria-label="Chargement du panier"
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
        <ShoppingBag
          className="h-10 w-10 text-text-muted"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h2 className="mt-4 text-base font-semibold text-text">
          Votre panier est vide
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Ajoutez un outil avant de passer commande.
        </p>
        <Link
          href="/shop"
          className="mt-5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
        >
          Parcourir la boutique
        </Link>
      </div>
    );
  }

  const update = (name: CheckoutField, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizeCheckoutForm(form);
    const nextErrors = validateCheckoutForm(normalized);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(`checkout-${firstInvalid}`)?.focus();
      return;
    }
    setOrder(createDemoOrder(normalized, items));
    clearCart();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-2 text-lg font-semibold text-text">
            Livraison
          </legend>
          <Field name="fullName" label="Nom complet" error={errors.fullName} className="sm:col-span-2">
            {(props) => (
              <input
                {...props}
                name="fullName"
                autoComplete="name"
                maxLength={FIELD_LIMITS.fullName.max}
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            )}
          </Field>
          <Field name="email" label="E-mail" error={errors.email} className="sm:col-span-2">
            {(props) => (
              <input
                {...props}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                maxLength={FIELD_LIMITS.email.max}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            )}
          </Field>
          <Field name="address" label="Adresse" error={errors.address} className="sm:col-span-2">
            {(props) => (
              <input
                {...props}
                name="address"
                autoComplete="street-address"
                maxLength={FIELD_LIMITS.address.max}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            )}
          </Field>
          <Field name="postalCode" label="Code postal" error={errors.postalCode}>
            {(props) => (
              <input
                {...props}
                name="postalCode"
                autoComplete="postal-code"
                maxLength={FIELD_LIMITS.postalCode.max}
                value={form.postalCode}
                onChange={(e) => update("postalCode", e.target.value)}
              />
            )}
          </Field>
          <Field name="city" label="Ville" error={errors.city}>
            {(props) => (
              <input
                {...props}
                name="city"
                autoComplete="address-level2"
                maxLength={FIELD_LIMITS.city.max}
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            )}
          </Field>
          <Field name="country" label="Pays" error={errors.country} className="sm:col-span-2">
            {(props) => (
              <select
                {...props}
                name="country"
                autoComplete="country"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
              >
                {CHECKOUT_COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field name="notes" label="Note (optionnel)" error={errors.notes} className="sm:col-span-2">
            {(props) => (
              <textarea
                {...props}
                name="notes"
                rows={3}
                maxLength={FIELD_LIMITS.notes.max}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            )}
          </Field>
        </fieldset>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-bg transition-[transform,background-color] hover:bg-accent-hover active:scale-[0.99]"
        >
          <Lock className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          Valider la commande · {formatPriceEur(totals.totalEur)}
        </button>
        <p className="text-center text-xs text-text-muted">
          Démo : aucun paiement réel. Le paiement Stripe sera branché ici.
        </p>
      </form>

      <aside
        aria-labelledby="checkout-summary"
        className="h-fit rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-24"
      >
        <h2 id="checkout-summary" className="text-base font-semibold text-text">
          Récapitulatif
        </h2>
        <ul className="mt-4 divide-y divide-border">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-3 py-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-bg">
                <Image src={item.thumbnailUrl} alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-text">{item.name}</p>
                <p className="font-mono text-xs text-text-muted">× {item.quantity}</p>
              </div>
              <span className="font-mono text-sm tabular-nums text-text">
                {formatPriceEur(item.priceEur * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-text-secondary">
            <dt>Sous-total</dt>
            <dd className="font-mono tabular-nums">{formatPriceEur(totals.subtotalEur)}</dd>
          </div>
          <div className="flex justify-between text-text-secondary">
            <dt>Livraison</dt>
            <dd className="font-mono tabular-nums">
              {totals.shippingEur === 0 ? "Offerte" : formatPriceEur(totals.shippingEur)}
            </dd>
          </div>
          <div className="flex justify-between pt-1.5 text-base font-semibold text-text">
            <dt>Total</dt>
            <dd className="font-mono tabular-nums text-accent">{formatPriceEur(totals.totalEur)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
