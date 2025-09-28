"use client"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"


import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with text"

const chartData = [
  { browser: "safari", visitors: 10, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function InfoBarchart() {
  return (
   
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[100px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={180}
            innerRadius={30}
            outerRadius={45}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[35, 28]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={4} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xs font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
  )
}
