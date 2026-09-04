"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/primitives";
import { useIntake } from "./IntakeProvider";

export function IntakeButton({
  children = "Request a Consultation",
  variant = "primary",
  size = "md",
  withArrow,
  block,
  className,
}: {
  children?: ReactNode;
  variant?: "primary" | "plate" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  block?: boolean;
  className?: string;
}) {
  const { openIntake } = useIntake();
  return (
    <Button variant={variant} size={size} withArrow={withArrow} block={block} className={className} onClick={openIntake}>
      {children}
    </Button>
  );
}

export function IntakeLinkButton({ children, className }: { children: ReactNode; className?: string }) {
  const { openIntake } = useIntake();
  return (
    <button type="button" className={className} onClick={openIntake}>
      {children}
    </button>
  );
}
