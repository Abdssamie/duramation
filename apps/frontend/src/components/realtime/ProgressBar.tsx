import {Progress} from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const ProgressBar = ({
  data,
  progressColor = 'bg-purple-500',
}: {
  data: {
    percent?: number;
    percentage?: number;
    progress?: number | string;
  };
  progressColor?: string;
}) => {
  // Extract percentage from various possible data formats
  let percentage = 0;

  if (data) {
    if (typeof data.percent === 'number') {
      percentage = data.percent;
    } else if (typeof data.percentage === 'number') {
      percentage = data.percentage;
    } else if (typeof data.progress === 'number') {
      percentage = data.progress;
    } else if (typeof data.progress === 'string') {
      const match = data.progress.match(/(\d+)%/);
      if (match && match[1]) {
        percentage = parseInt(match[1]);
      }
    }
  }

  // Clamp between 0 and 100
  percentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="w-full mt-2">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-mono text-xs">{percentage}%</span>
      </div>
      <Progress value={percentage} className={cn("h-1.5", `[&>[data-slot=progress-indicator]]:${progressColor}`)} />
    </div>
  );
};