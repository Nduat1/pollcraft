"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

interface PollChartProps {
  poll: {
    options: string[]
    votes: number[]
    totalVotes: number
  }
}

export function PollChart({ poll }: PollChartProps) {
  const [chartType, setChartType] = useState<"bar" | "pie">("bar")

  const data = poll.options.map((option, index) => ({
    name: option,
    votes: poll.votes[index],
    percentage: poll.totalVotes > 0 ? Math.round((poll.votes[index] / poll.totalVotes) * 100) : 0,
  }))

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
          Bar Chart
        </Button>
        <Button variant={chartType === "pie" ? "default" : "outline"} size="sm" onClick={() => setChartType("pie")}>
          Pie Chart
        </Button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value} votes`, "Votes"]}
                labelFormatter={(label) => `Option: ${label}`}
              />
              <Bar dataKey="votes" fill="#3b82f6" />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="votes"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} votes`, "Votes"]} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
