"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, MoreHorizontal, Search, Plus, Users, Calendar,ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PollsPage() {
  const [polls, setPolls] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const savedPolls = localStorage.getItem("polls")
    if (savedPolls) {
      setPolls(JSON.parse(savedPolls))
    }
  }, [])

  const filteredPolls = polls.filter(
    (poll) =>
      poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poll.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const deletePoll = (pollId: string) => {
    const updatedPolls = polls.filter((poll) => poll.id !== pollId)
    setPolls(updatedPolls)
    localStorage.setItem("polls", JSON.stringify(updatedPolls))
  }

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
          <h1 className="text-lg font-semibold">My Polls</h1>
        </header>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">My Polls</h2>
            <Button asChild>
              <Link href="/dashboard/create/page">
                <Plus className="mr-2 h-4 w-4" />
                Create Poll
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search polls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {filteredPolls.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{searchTerm ? "No polls found" : "No polls yet"}</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try adjusting your search terms" : "Create your first poll to get started"}
                  </p>
                  {!searchTerm && (
                    <Button asChild>
                      <Link href="/dashboard/create/page">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Poll
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredPolls.map((poll) => (
                <Card key={poll.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{poll.title}</CardTitle>
                        {poll.description && <CardDescription>{poll.description}</CardDescription>}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {poll.totalVotes} votes
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(poll.createdAt).toLocaleDateString()}
                          </div>
                          <Badge variant={poll.status === "active" ? "default" : "secondary"}>{poll.status}</Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger >
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="z-50 w-40">
                          <DropdownMenuItem asChild>
                            <Link href={`/poll/${poll.id}`} className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View Poll
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/edit/${poll.id}`} className="flex items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Poll
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deletePoll(poll.id)}
                            className="text-red-600 flex items-center"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Poll
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Options:</p>
                      <div className="flex flex-wrap gap-2">
                        {poll.options.map((option: { text: string; votes: number }, index: number) => (
                          <Badge key={index} variant="outline">
                            {option.text} ({option.votes} votes)
                            
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
  </SidebarProvider>    
  )
}
