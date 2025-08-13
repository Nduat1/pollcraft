"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SidebarInset, SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Plus, X, Save, ArrowLeft } from "lucide-react"

export default function CreatePollPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [allowComments, setAllowComments] = useState(true)
  const [multipleChoice, setMultipleChoice] = useState(false)
  const router = useRouter()

  const addOption = () => {
    setOptions([...options, ""])
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || options.some((opt) => !opt.trim())) {
      alert("Please fill in all fields")
      return
    }

    const newPoll = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      options: options.filter((opt) => opt.trim()),
      votes: new Array(options.length).fill(0),
      totalVotes: 0,
      allowComments,
      multipleChoice,
      createdAt: new Date().toISOString(),
      status: "active",
      comments: [],
    }

    // Save to localStorage
    const existingPolls = JSON.parse(localStorage.getItem("polls") || "[]")
    existingPolls.push(newPoll)
    localStorage.setItem("polls", JSON.stringify(existingPolls))

    router.push(`/poll/[id]/${newPoll.id}`)
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
          <h1 className="text-lg font-semibold">Create Poll</h1>
        </header>

        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Create a New Poll</CardTitle>
                <CardDescription>Design your poll with custom options and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Poll Title *</Label>
                    <Input
                      id="title"
                      placeholder="What's your question?"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add more context to your poll..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Poll Options *</Label>
                    {options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          required
                        />
                        {options.length > 2 && (
                          <Button type="button" variant="outline" size="icon" onClick={() => removeOption(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addOption} className="w-full bg-transparent">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Comments</Label>
                        <p className="text-sm text-muted-foreground">Let voters leave comments on your poll</p>
                      </div>
                      <Switch checked={allowComments} onCheckedChange={setAllowComments} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Multiple Choice</Label>
                        <p className="text-sm text-muted-foreground">Allow voters to select multiple options</p>
                      </div>
                      <Switch checked={multipleChoice} onCheckedChange={setMultipleChoice} />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" onClick={handleSubmit} className="flex-1">
                      <Save className="mr-2 h-4 w-4" />
                      Create Poll
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
