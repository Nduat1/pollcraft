"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarInset, SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setName(parsedUser.name || "")
      setEmail(parsedUser.email || "")
      setBio(parsedUser.bio || "")
    }
  }, [])

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      bio,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    alert("Profile updated successfully!")
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
          <h1 className="text-lg font-semibold">Profile</h1>
        </header>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
              <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and profile information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">{name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{name || "User"}</h3>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
 
            <Card>
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
                <CardDescription>Overview of your account activity.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{JSON.parse(localStorage.getItem("polls") || "[]").length}</div>
                    <p className="text-sm text-muted-foreground">Total Polls</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">
                      {JSON.parse(localStorage.getItem("polls") || "[]").reduce(
                        (sum: number, poll: any) => sum + poll.totalVotes,
                        0,
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Votes</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">
                      {user ? new Date(user.createdAt || Date.now()).toLocaleDateString() : "Today"}
                    </div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
