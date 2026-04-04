"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function MenuToggle({ targetId }: { targetId: string }) {
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
      className="grid size-12 place-items-center lg:hidden"
      popoverTarget={targetId}
      aria-label="メニュー"
      aria-expanded={open}
    >
      {[
        "translate-y-2 [transition:rotate_75ms_linear,translate_75ms_linear_75ms] group-has-[:popover-open]:translate-y-0 group-has-[:popover-open]:rotate-45 group-has-[:popover-open]:[transition:translate_75ms_linear,rotate_75ms_linear_75ms]",
        "[transition:opacity_0s_linear_75ms] group-has-[:popover-open]:opacity-0",
        "-translate-y-2 [transition:rotate_75ms_linear,translate_75ms_linear_75ms] group-has-[:popover-open]:translate-y-0 group-has-[:popover-open]:-rotate-45 group-has-[:popover-open]:[transition:translate_75ms_linear,rotate_75ms_linear_75ms]",
      ].map((className, i) => (
        <span
          key={i}
          className={cn(
            "bg-foreground absolute h-px w-6 rounded-full",
            className,
          )}
        />
      ))}
    </button>
  );
}
