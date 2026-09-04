"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cx } from "./primitives";
import { AlertIcon, CheckIcon, ChevronDownIcon } from "./icons";

type FieldProps = { label: string; id: string; hint?: string; error?: string; optional?: boolean; className?: string } & Omit<ComponentPropsWithoutRef<"input">, "id" | "className">;

export function Field({ label, id, hint, error, optional, className, ...rest }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cx("kp-field", className)}>
      <label className="kp-field__label" htmlFor={id}>
        {label}
        {optional ? <span className="kp-field__optional">optional</span> : null}
      </label>
      <input id={id} className="kp-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest} />
      {hint && !error ? (
        <p className="kp-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="kp-field__error" id={errorId} role="alert">
          <AlertIcon width={14} height={14} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextareaProps = { label: string; id: string; hint?: string; error?: string; optional?: boolean; className?: string } & Omit<ComponentPropsWithoutRef<"textarea">, "id" | "className">;

export function Textarea({ label, id, hint, error, optional, className, ...rest }: TextareaProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cx("kp-field", className)}>
      <label className="kp-field__label" htmlFor={id}>
        {label}
        {optional ? <span className="kp-field__optional">optional</span> : null}
      </label>
      <textarea id={id} className="kp-input kp-input--textarea" aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest} />
      {hint && !error ? (
        <p className="kp-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="kp-field__error" id={errorId} role="alert">
          <AlertIcon width={14} height={14} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SelectProps = {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  hint?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"select">, "id" | "className">;

export function Select({ label, id, options, placeholder, hint, className, defaultValue, ...rest }: SelectProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={cx("kp-field", className)}>
      <label className="kp-field__label" htmlFor={id}>
        {label}
      </label>
      <span className="kp-select">
        <select id={id} className="kp-input" aria-describedby={hintId} defaultValue={rest.value === undefined ? (defaultValue ?? (placeholder ? "" : undefined)) : undefined} {...rest}>
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="kp-select__arrow" />
      </span>
      {hint ? (
        <p className="kp-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TrackSelector<T extends string>({
  options,
  name,
  legend,
  value,
  onChange,
  className,
}: {
  options: { value: T; title: string; description: string }[];
  name: string;
  legend: string;
  value?: T | null;
  onChange?: (v: T) => void;
  className?: string;
}) {
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="kp-field__label" style={{ marginBottom: "var(--kp-space-4)" }}>
        {legend}
      </legend>
      <div className={cx("kp-track", options.length === 2 && "kp-track--two", className)}>
        {options.map((opt) => (
          <label key={opt.value} className="kp-track__option">
            <input className="kp-track__input" type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={() => onChange?.(opt.value)} />
            <span className="kp-track__head">
              <span className="kp-track__mark" aria-hidden="true" />
              <span className="kp-track__title">{opt.title}</span>
            </span>
            <span className="kp-track__desc">{opt.description}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function StepIndicator({ steps, current, className }: { steps: string[]; current: number; className?: string }) {
  return (
    <nav aria-label="Form progress">
      <ol className={cx("kp-steps", className)}>
        {steps.map((step, i) => {
          const done = i < current;
          const isCurrent = i === current;
          return (
            <li key={step} className={cx("kp-steps__item", done && "kp-steps__item--done", isCurrent && "kp-steps__item--current")} aria-current={isCurrent ? "step" : undefined}>
              <span className="kp-steps__dot">{done ? <CheckIcon width={12} height={12} /> : i + 1}</span>
              <span>{step}</span>
              {i < steps.length - 1 ? <span className="kp-steps__bar" aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function FilterBar({ options, value, onChange, label = "Filter results by practice area", className }: { options: { id: string; label: string; count?: number }[]; value: string; onChange?: (id: string) => void; label?: string; className?: string }) {
  return (
    <div className={cx("kp-filters", className)} role="group" aria-label={label}>
      {options.map((opt) => (
        <button key={opt.id} type="button" className="kp-chip" aria-pressed={value === opt.id} onClick={() => onChange?.(opt.id)}>
          <span>{opt.label}</span>
          {typeof opt.count === "number" ? <span className="kp-chip__count">{opt.count}</span> : null}
        </button>
      ))}
    </div>
  );
}
