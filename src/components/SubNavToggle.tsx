"use client";

import { useEffect, useState } from "react";

export default function SubNavToggle({ targetId }: { targetId: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const popover = document.getElementById(targetId);
    if (!popover) return;
    const onToggle = (e: Event) => {
      setOpen((e as ToggleEvent).newState === "open");
    };
    popover.addEventListener("toggle", onToggle);
    return () => popover.removeEventListener("toggle", onToggle);
  }, [targetId]);

  return (
    <button
      className="relative z-1 grid size-12 place-items-center md:hidden"
      popoverTarget={targetId}
      aria-label="メニュー"
      aria-expanded={open}
    >
      <span className="bg-foreground absolute left-1/2 h-px w-4 origin-[0.5px_50%] -translate-x-[0.5px] translate-y-1 rotate-225 rounded-full transition-transform group-has-[:popover-open]:-translate-y-1 group-has-[:popover-open]:rotate-135" />
      <span className="bg-foreground absolute left-1/2 h-px w-4 origin-[0.5px_50%] -translate-x-[0.5px] translate-y-1 -rotate-45 rounded-full transition-transform group-has-[:popover-open]:-translate-y-1 group-has-[:popover-open]:rotate-45" />
    </button>
  );
}
