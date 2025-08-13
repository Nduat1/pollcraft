"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardLayout from "./layout"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Users, TrendingUp, Plus, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [polls, setPolls] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load demo polls
    const savedPolls = localStorage.getItem("polls")
    if (savedPolls) {
      setPolls(JSON.parse(savedPolls))
    } else {
      // Create demo polls
      const demoPolls = [
        {
          id: "1",
          title: "What's your favorite programming language?",
          description: "Help us understand developer preferences",
          options: ["JavaScript", "Python", "Java", "Go"],
          votes: [45, 32, 18, 12],
          totalVotes: 107,
          createdAt: new Date().toISOString(),
          status: "active",
        },
        {
          id: "2",
          title: "Best time for team meetings?",
          description: "Finding the optimal meeting time",
          options: ["9 AM", "11 AM", "2 PM", "4 PM"],
          votes: [23, 34, 28, 15],
          totalVotes: 100,
          createdAt: new Date().toISOString(),
          status: "active",
        },
      ]
      localStorage.setItem("polls", JSON.stringify(demoPolls))
      setPolls(demoPolls)
    }
  }, [])

  const totalVotes = polls.reduce((sum, poll) => sum + poll.totalVotes, 0)
  const activePolls = polls.filter((poll) => poll.status === "active").length

  return (
    <SidebarProvider >
      <SidebarInset>
        <header >
          <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <div className="mb-1">
              <Link href="/dashboard/layout">
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Link>
            </div>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}!</h2>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/dashboard/create/page">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Poll
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Polls</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{polls.length}</div>
                <p className="text-xs text-muted-foreground">{activePolls} active polls</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVotes}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Participation</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{polls.length > 0 ? Math.round(totalVotes / polls.length) : 0}</div>
                <p className="text-xs text-muted-foreground">votes per poll</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Polls */}
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Recent Polls</CardTitle>
                <CardDescription>Your latest polls and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {polls.slice(0, 3).map((poll) => (
                    <div key={poll.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{poll.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {poll.totalVotes} votes • Created {new Date(poll.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={poll.status === "active" ? "default" : "secondary"}>{poll.status}</Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/poll/${poll.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  {polls.length === 0 && (
                    <div className="text-center py-8">
                      <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No polls yet</h3>
                      <p className="text-muted-foreground">Create your first poll to get started</p>
                      <Button className="mt-4" asChild>
                        <Link href="/dashboard/create/page">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Poll
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" asChild>
                  <Link href="/dashboard/create/page">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Poll
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/polls/page">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View All Polls
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/analytics/page">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/demo/page">
                    <Eye className="mr-2 h-4 w-4" />
                    Try Demo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
    </SidebarInset>
  </SidebarProvider>
  )
}
