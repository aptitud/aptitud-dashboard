import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChartTooltipContainerProps = {
  className?: string;
  children: ReactNode;
}

export function ChartTooltipContainer({ className, children }: ChartTooltipContainerProps) {
  return (
    <div className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}>
      {children}
    </div>
  )
}

type ChartToolItemProps = {
  color?: string;
  label: string;
  value?: number | string;
}

export function ChartTooltipItem({ color, label, value }: ChartToolItemProps) {
  const labelClass = value ? "text-muted-foreground" : "font-medium text-foreground";
  return (
    <div className="flex w-full flex-wrap items-stretch gap-2">
      {color && <ChartTooltipIndicator color={color} />}
      <div className="flex flex-1 justify-between leading-none items-center">
          <span className={labelClass}>{label}</span>
          {value && <span className="font-mono font-medium tabular-nums text-foreground">&nbsp;{value}</span>}
      </div>
    </div>
  )
}

type ChartTooltipIndicatorProps = {
  color: string;
}

function ChartTooltipIndicator({ color }: ChartTooltipIndicatorProps) {
  const style = {
    "--color-bg": color,
    "--color-border": color,
  } as React.CSSProperties

  return (
    <div className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] h-2.5 w-2.5" style={style} />
  );
}