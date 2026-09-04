"use client";

import { PhoneIcon } from "@/components/ui/icons";
import { useIntake } from "@/components/intake/IntakeProvider";
import { SITE } from "@/lib/site";

export function StickyCallBar() {
  const { openIntake } = useIntake();
  return (
    <div className="kp-callbar">
      <a className="kp-callbar__action" href={SITE.phoneHref}>
        <PhoneIcon />
        <span>Call {SITE.phone}</span>
      </a>
      <button type="button" className="kp-callbar__action kp-callbar__action--primary" onClick={openIntake}>
        Free Consultation
      </button>
    </div>
  );
}
