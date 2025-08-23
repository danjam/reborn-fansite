// src/components/charts/CropProfitChart.tsx
import { memo, useMemo } from 'react';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useTheme } from '@/hooks/useTheme';

interface CropProfitChartProps {
  analysis: Array<{
    name: string;
    growTime: number;
    totalProfitPerCycle: number;
    profitPerMinute: number;
  }>;
  timeHours?: number;
}

interface ChartDataPoint {
  hour: number;
  time: string;
  [cropName: string]: number | string;
}

interface LegendPayload {
  value: string;
  type: string;
  color: string;
}

interface TooltipPayload {
  dataKey: string;
  value: number;
  color: string;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

interface CustomLegendProps {
  payload?: LegendPayload[];
}

export const CropProfitChart = memo(
  ({ analysis, timeHours = 24 }: CropProfitChartProps) => {
    const theme = useTheme();

    // Generate chart data for profit over time
    const chartData = useMemo(() => {
      const dataPoints: ChartDataPoint[] = [];
      const intervalMinutes = 60; // 1 hour intervals
      const totalMinutes = timeHours * 60;

      // Generate data points for each hour
      for (
        let minutes = 0;
        minutes <= totalMinutes;
        minutes += intervalMinutes
      ) {
        const hour = minutes / 60;
        const dataPoint: ChartDataPoint = {
          hour: hour,
          time: `${hour}h`,
        };

        // Calculate cumulative profit for each crop at this time
        analysis.forEach(crop => {
          const cycles = Math.floor(minutes / crop.growTime);
          const cumulativeProfit = cycles * crop.totalProfitPerCycle;
          dataPoint[crop.name] = cumulativeProfit;
        });

        dataPoints.push(dataPoint);
      }

      return dataPoints;
    }, [analysis, timeHours]);

    // Colors for each line - expanded palette for more vegetables
    const cropColors = [
      '#10b981', // green-500
      '#3b82f6', // blue-500
      '#f59e0b', // amber-500
      '#ef4444', // red-500
      '#8b5cf6', // violet-500
      '#06b6d4', // cyan-500
      '#f97316', // orange-500
      '#84cc16', // lime-500
      '#ec4899', // pink-500
      '#6366f1', // indigo-500
      '#14b8a6', // teal-500
      '#f43f5e', // rose-500
      '#a855f7', // purple-500
      '#22c55e', // green-500
      '#0ea5e9', // sky-500
      '#eab308', // yellow-500
      '#dc2626', // red-600
      '#7c3aed', // violet-600
    ];

    // Custom legend component
    const CustomLegend = ({ payload }: CustomLegendProps) => {
      if (!payload || !payload.length) return null;

      return (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-0.5 rounded"
                style={{ backgroundColor: entry.color }}
              />
              <span className={`text-sm ${theme.text.secondary}`}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    };

    // Custom tooltip component - FIXED: theme.card() instead of theme.card
    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
      if (!active || !payload || !payload.length) return null;

      return (
        <div className={`${theme.card()} p-3 shadow-lg border`}>
          <p className={`text-sm font-medium ${theme.text.primary} mb-2`}>
            Time: {label}
          </p>
          {payload
            .sort((a, b) => b.value - a.value)
            .map((entry, index) => (
              <p
                key={index}
                className={`text-sm ${theme.text.secondary}`}
                style={{ color: entry.color }}
              >
                {entry.dataKey}: {entry.value.toLocaleString()} coins
              </p>
            ))}
        </div>
      );
    };

    return (
      <div>
        <div className="mb-4">
          <h3 className={`text-lg font-semibold ${theme.text.primary} mb-2`}>
            Profit Over Time ({timeHours}h)
          </h3>
        </div>

        <div style={{ width: '100%', height: '450px' }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
            >
              <XAxis
                dataKey="time"
                stroke={
                  theme.text.muted.includes('text-gray-400')
                    ? '#9ca3af'
                    : '#6b7280'
                }
                fontSize={12}
              />
              <YAxis
                stroke={
                  theme.text.muted.includes('text-gray-400')
                    ? '#9ca3af'
                    : '#6b7280'
                }
                fontSize={12}
                tickFormatter={value => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />

              {analysis.slice(0, 6).map((crop, index) => (
                <Line
                  key={crop.name}
                  type="monotone"
                  dataKey={crop.name}
                  stroke={cropColors[index % cropColors.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
);

// Add display name for better debugging
CropProfitChart.displayName = 'CropProfitChart';

export default CropProfitChart;
