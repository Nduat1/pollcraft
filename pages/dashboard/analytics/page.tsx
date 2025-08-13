"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Users, TrendingUp, Eye, MessageCircle, Share2, Target, ArrowLeft } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function AnalyticsPage() {
  const [polls, setPolls] = useState<any[]>([])
  const [timeRange, setTimeRange] = useState("7d")

  useEffect(() => {
    const savedPolls = localStorage.getItem("polls")
    if (savedPolls) {
      setPolls(JSON.parse(savedPolls))
    }
  }, [])

  // Calculate analytics data
  const totalPolls = polls.length
  const totalVotes = polls.reduce((sum, poll) => sum + poll.totalVotes, 0)
  const activePolls = polls.filter((poll) => poll.status === "active").length
  const avgVotesPerPoll = totalPolls > 0 ? Math.round(totalVotes / totalPolls) : 0

  // Generate mock time series data
  const generateTimeSeriesData = () => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    const data = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString(),
        votes: Math.floor(Math.random() * 50) + 10,
        polls: Math.floor(Math.random() * 5) + 1,
        views: Math.floor(Math.random() * 200) + 50,
      })
    }
    return data
  }

  const timeSeriesData = generateTimeSeriesData()

  // Poll performance data
  const pollPerformanceData = polls
    .map((poll) => ({
      name: poll.title.length > 20 ? poll.title.substring(0, 20) + "..." : poll.title,
      votes: poll.totalVotes,
      comments: poll.comments?.length || 0,
      engagement: poll.totalVotes + (poll.comments?.length || 0) * 2,
    }))
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5)

  // Vote distribution data
  const voteDistributionData = polls
    .map((poll) => ({
      name: poll.title.length > 15 ? poll.title.substring(0, 15) + "..." : poll.title,
      value: poll.totalVotes,
    }))
    .filter((item) => item.value > 0)

  // Engagement metrics
  const engagementData = [
    { name: "Views", value: 1250, change: "+12%" },
    { name: "Votes", value: totalVotes, change: "+8%" },
    { name: "Comments", value: polls.reduce((sum, poll) => sum + (poll.comments?.length || 0), 0), change: "+15%" },
    { name: "Shares", value: 89, change: "+22%" },
  ]

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="mb-1">
            <Link href="/dashboard/layout">
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Link>
          </div>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Analytics</h1>
        </header>

        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Polls</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPolls}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVotes}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Polls</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activePolls}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-600">{Math.round((activePolls / totalPolls) * 100) || 0}%</span> of total
                  polls
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Votes/Poll</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgVotesPerPoll}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5%</span> from last week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {/* Votes Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Votes Over Time</CardTitle>
                <CardDescription>Daily vote activity for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="votes" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Poll Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Polls</CardTitle>
                <CardDescription>Polls with the most votes and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pollPerformanceData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="votes" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Charts Row */}
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {/* Vote Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Vote Distribution</CardTitle>
                <CardDescription>How votes are distributed across your polls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={voteDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {voteDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Key engagement indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagementData.map((metric, index) => (
                    <div key={metric.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {metric.name === "Views" && <Eye className="h-5 w-5 text-blue-600" />}
                        {metric.name === "Votes" && <Users className="h-5 w-5 text-green-600" />}
                        {metric.name === "Comments" && <MessageCircle className="h-5 w-5 text-orange-600" />}
                        {metric.name === "Shares" && <Share2 className="h-5 w-5 text-purple-600" />}
                        <div>
                          <p className="font-medium">{metric.name}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {metric.change}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Recent activity across all your polls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {polls.slice(0, 5).map((poll, index) => (
                  <div key={poll.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{poll.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {poll.totalVotes} votes • Created {new Date(poll.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={poll.status === "active" ? "default" : "secondary"}>{poll.status}</Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">{poll.totalVotes} votes</p>
                        <p className="text-xs text-muted-foreground">{poll.comments?.length || 0} comments</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
