import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}
export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5.6 2.5 7 5.2 5.6 6.6a8.4 8.4 0 0 0 3.8 3.8L10.8 9l2.7 1.4v2.1a1 1 0 0 1-1.1 1A11.4 11.4 0 0 1 2.5 3.6a1 1 0 0 1 1-1.1z" />
    </svg>
  );
}
export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 1.8 13.2 4v3.6c0 3-2.1 5.5-5.2 6.6-3.1-1.1-5.2-3.6-5.2-6.6V4z" />
      <path d="M5.9 7.9 7.4 9.4l2.9-2.9" />
    </svg>
  );
}
export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
export function AlertIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 4.8v3.6M8 11.1h.01" />
    </svg>
  );
}
export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={18} height={18} viewBox="0 0 18 18" {...props}>
      <path d="M2.5 5.5h13M2.5 9h13M2.5 12.5h13" />
    </svg>
  );
}
export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3.2 8.4 6.3 11.5 12.8 5" />
    </svg>
  );
}
export function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={28} height={28} viewBox="0 0 16 16" {...props}>
      <path d="M8 14.5s4.5-4.4 4.5-8A4.5 4.5 0 0 0 3.5 6.5c0 3.6 4.5 8 4.5 8z" />
      <circle cx="8" cy="6.5" r="1.6" />
    </svg>
  );
}
export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="3.5" width="12" height="9" rx="1" />
      <path d="m2.5 4.5 5.5 4 5.5-4" />
    </svg>
  );
}
