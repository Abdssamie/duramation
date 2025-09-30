"use client";

import * as React from "react";
import { X, Pencil, Save, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type DockedSidePanelProps = {
  children: (isEditing: boolean) => React.ReactNode;
  onClose: () => void;
  onSave?: () => void;
  title: string;
  isEditable?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

const DockedSidePanel = React.forwardRef<HTMLDivElement, DockedSidePanelProps>(
  ({ className, title, children, onClose, onSave, isEditable = false, ...props }, ref) => {
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
      setIsEditing(false);
    }, [title]);

    const handleSave = () => {
      if (onSave) {
        onSave();
      }
      setIsEditing(false);
    };

    const handleCancel = () => {
      setIsEditing(false);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-[400px] border-l bg-background transition-all duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="flex items-center gap-2">
              {isEditable && !isEditing && (
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
              {isEditable && isEditing && (
                <>
                  <Button variant="ghost" size="icon" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleCancel}>
                    <Ban className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4">{children(isEditing)}</div>
        </div>
      </div>
    );
  }
);

DockedSidePanel.displayName = "DockedSidePanel";

export { DockedSidePanel };