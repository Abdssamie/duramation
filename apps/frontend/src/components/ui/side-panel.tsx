"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Direction = "left" | "right" | "top" | "bottom";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  direction?: Direction;
}

const directionClasses: Record<Direction, { open: string; closed: string }> = {
  left: { open: "translate-x-0", closed: "-translate-x-full" },
  right: { open: "translate-x-0", closed: "translate-x-full" },
  top: { open: "translate-y-0", closed: "-translate-y-full" },
  bottom: { open: "translate-y-0", closed: "translate-y-full" },
};

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  direction = "right",
}) => {
  const { open, closed } = directionClasses[direction];

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full max-w-md transform rounded-lg bg-background shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? open : closed
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-accent"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default SidePanel;