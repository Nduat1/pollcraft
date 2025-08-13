"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Share2, MessageCircle, BarChart3, Users, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PollChart } from "@/components/poll-chart"
import { Footer } from "@/components/footer"

const demoPoll = {
  id: "demo",
  title: "What's your favorite programming language?",
  description:
    "Help us understand developer preferences in 2025. This is a demo poll to showcase PollCraft's features.",
  options: ["JavaScript", "Python", "Java", "Go", "Rust"],
  votes: [145, 132, 89, 67, 45],
  totalVotes: 478,
  allowComments: true,
  multipleChoice: false,
  createdAt: new Date().toISOString(),
  status: "active",
  comments: [
    {
      id: "1",
      text: "JavaScript is so versatile! You can build anything with it.",
      author: "DevMaster",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "2",
      text: "Python's simplicity makes it perfect for beginners and experts alike.",
      author: "CodeNinja",
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
  ],
}

export default function DemoPage() {
  const [selectedOption, setSelectedOption] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(demoPoll.comments)
  const [currentPoll, setCurrentPoll] = useState(demoPoll)

  const handleVote = () => {
    if (!selectedOption) return

    const optionIndex = Number.parseInt(selectedOption)
    const newVotes = [...currentPoll.votes]
    newVotes[optionIndex]++

    setCurrentPoll({
      ...currentPoll,
      votes: newVotes,
      totalVotes: currentPoll.totalVotes + 1,
    })
    setHasVoted(true)
  }

  const handleComment = () => {
    if (!comment.trim()) return

    const newComment = {
      id: Date.now().toString(),
      text: comment.trim(),
      author: "Demo User",
      createdAt: new Date().toISOString(),
    }

    setComments([...comments, newComment])
    setComment("")
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/demo`
    if (navigator.share) {
      await navigator.share({
        title: currentPoll.title,
        text: currentPoll.description,
        url: url,
      })
    } else {
      navigator.clipboard.writeText(url)
      alert("Demo poll link copied to clipboard!")
    }
  }

  const getPercentage = (votes: number) => {
    return currentPoll.totalVotes > 0 ? Math.round((votes / currentPoll.totalVotes) * 100) : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {/* Demo Banner */}
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Demo</Badge>
                <p className="text-sm">
                  This is a demo poll. Try voting and leaving comments to see how PollCraft works!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Poll Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{currentPoll.title}</CardTitle>
                  <CardDescription className="text-base">{currentPoll.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {currentPoll.totalVotes} votes
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(currentPoll.createdAt).toLocaleDateString()}
                    </div>
                    <Badge variant={currentPoll.status === "active" ? "default" : "secondary"}>
                      {currentPoll.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Voting Section */}
            <Card>
              <CardHeader>
                <CardTitle>{hasVoted ? "Results" : "Cast Your Vote"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!hasVoted ? (
                  <>
                    <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                      {currentPoll.options.map((option: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <Button onClick={handleVote} className="w-full" disabled={!selectedOption}>
                      Submit Vote
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    {currentPoll.options.map((option: string, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{option}</span>
                          <span className="text-sm text-muted-foreground">
                            {currentPoll.votes[index]} votes ({getPercentage(currentPoll.votes[index])}%)
                          </span>
                        </div>
                        <Progress value={getPercentage(currentPoll.votes[index])} className="h-2" />
                      </div>
                    ))}
                    <div className="text-center text-sm text-muted-foreground pt-2">
                      Thank you for voting! Total votes: {currentPoll.totalVotes}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chart Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Visual Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PollChart poll={currentPoll} />
              </CardContent>
            </Card>
          </div>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Comments ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comment">Leave a comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleComment} disabled={!comment.trim()}>
                  Post Comment
                </Button>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to create your own polls?</h2>
              <p className="text-blue-100 mb-6">Sign up for free and start creating engaging polls in minutes.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth/signup">Get Started Free</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                  asChild
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
