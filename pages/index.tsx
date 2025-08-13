import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Share2, MessageCircle, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            🚀 New: Real-time poll results
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Engaging Polls in Seconds
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build beautiful polls, collect votes from your audience, and analyze results with stunning charts. Perfect
            for surveys, feedback, and decision making.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/auth/signup/page">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/demo/page">Try Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need to create amazing polls</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From simple yes/no questions to complex multi-choice surveys, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Beautiful Analytics</CardTitle>
              <CardDescription>
                Visualize results with interactive bar charts, pie charts, and real-time updates.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Easy Voting</CardTitle>
              <CardDescription>
                Simple, intuitive voting interface that works on any device. No registration required for voters.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Share2 className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Social Sharing</CardTitle>
              <CardDescription>
                Share your polls instantly on social media, via email, or with a simple link.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MessageCircle className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Comments & Feedback</CardTitle>
              <CardDescription>Let voters leave comments and feedback to gather deeper insights.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-yellow-600 mb-2" />
              <CardTitle>Real-time Results</CardTitle>
              <CardDescription>Watch votes come in live with real-time updates and notifications.</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your data is protected with enterprise-grade security and privacy controls.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to create your first poll?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust PollCraft for their polling needs. Start free, upgrade when you need
              more features.
            </p>
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                <Link href="/auth/signup/page">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent w-full sm:w-auto"
                asChild
              >
                <Link href="/pricing/page">View Pricing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
