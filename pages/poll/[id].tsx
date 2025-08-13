"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Share2, MessageCircle, BarChart3, Users, Calendar } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PollChart } from "@/components/poll-chart"
import { Footer } from "@/components/footer"

export default function PollPage() {
  const params = useParams()
  const [poll, setPoll] = useState<any>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    const polls = JSON.parse(localStorage.getItem("polls") || "[]")
    const foundPoll = polls.find((p: any) => p.id === params.id)
    if (foundPoll) {
      setPoll(foundPoll)
      setComments(foundPoll.comments || [])
    }

    // Check if user has voted
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]")
    setHasVoted(votedPolls.includes(params.id))
  }, [params.id])

  const handleVote = () => {
    if (!poll || selectedOptions.length === 0) return

    const polls = JSON.parse(localStorage.getItem("polls") || "[]")
    const pollIndex = polls.findIndex((p: any) => p.id === params.id)

    if (pollIndex !== -1) {
      selectedOptions.forEach((optionIndex) => {
        polls[pollIndex].votes[Number.parseInt(optionIndex)]++
        polls[pollIndex].totalVotes++
      })

      localStorage.setItem("polls", JSON.stringify(polls))
      setPoll(polls[pollIndex])

      // Mark as voted
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]")
      votedPolls.push(params.id)
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls))
      setHasVoted(true)
    }
  }

  const handleComment = () => {
    if (!comment.trim() || !poll) return

    const newComment = {
      id: Date.now().toString(),
      text: comment.trim(),
      author: "Anonymous",
      createdAt: new Date().toISOString(),
    }

    const polls = JSON.parse(localStorage.getItem("polls") || "[]")
    const pollIndex = polls.findIndex((p: any) => p.id === params.id)

    if (pollIndex !== -1) {
      if (!polls[pollIndex].comments) {
        polls[pollIndex].comments = []
      }
      polls[pollIndex].comments.push(newComment)
      localStorage.setItem("polls", JSON.stringify(polls))
      setComments([...comments, newComment])
      setComment("")
    }
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/poll/${poll.id}`
    const shareData = {
      title: poll.title,
      text: poll.description || `Vote on: ${poll.title}`,
      url: url,
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url)
        alert("Poll link copied to clipboard!")
      }
    } catch (error) {
      // If clipboard API fails, show the URL
      const textArea = document.createElement("textarea")
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      alert("Poll link copied to clipboard!")
    }
  }

  const handleOptionChange = (optionIndex: string, checked: boolean) => {
    if (poll.multipleChoice) {
      if (checked) {
        setSelectedOptions([...selectedOptions, optionIndex])
      } else {
        setSelectedOptions(selectedOptions.filter((opt) => opt !== optionIndex))
      }
    } else {
      setSelectedOptions([optionIndex])
    }
  }

  if (!poll) {
    return <div className="container mx-auto p-4">Poll not found</div>
  }

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="space-y-6">
          {/* Poll Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{poll.title}</CardTitle>
                  {poll.description && <CardDescription className="text-base">{poll.description}</CardDescription>}
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
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Voting Section */}
            <Card>
              <CardHeader>
                <CardTitle>{hasVoted ? "Results" : "Cast Your Vote"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!hasVoted ? (
                  <>
                    {poll.multipleChoice ? (
                      <div className="space-y-3">
                        {poll.options.map((option: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox
                              id={`option-${index}`}
                              checked={selectedOptions.includes(index.toString())}
                              onCheckedChange={(checked: boolean) => handleOptionChange(index.toString(), checked as boolean)}
                            />
                            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <RadioGroup
                        value={selectedOptions[0] || ""}
                        onValueChange={(value: string) => setSelectedOptions([value])}
                      >
                        {poll.options.map((option: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                    <Button onClick={handleVote} className="w-full" disabled={selectedOptions.length === 0}>
                      Submit Vote
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    {poll.options.map((option: string, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{option}</span>
                          <span className="text-sm text-muted-foreground">
                            {poll.votes[index]} votes ({getPercentage(poll.votes[index])}%)
                          </span>
                        </div>
                        <Progress value={getPercentage(poll.votes[index])} className="h-2" />
                      </div>
                    ))}
                    <div className="text-center text-sm text-muted-foreground pt-2">
                      Thank you for voting! Total votes: {poll.totalVotes}
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
                {poll.totalVotes > 0 ? (
                  <PollChart poll={poll} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No votes yet. Be the first to vote!</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Comments Section */}
          {poll.allowComments && (
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

                {comments.length > 0 && (
                  <>
                    <Separator />
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
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
