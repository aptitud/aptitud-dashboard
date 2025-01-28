import { chartConfig } from "./finance-chart-config";

export function FinanceChartLegend() {
  return (
    <div className="flex justify-center flex-wrap pt-1">
      {Object.entries(chartConfig).map(([key, { color, label }]) => (
        <div key={key} className="flex items-center mr-4">
          <div className="h-2 w-4 mr-1" style={{ backgroundColor: color }} />
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      ))}
    </div>
  );
}
