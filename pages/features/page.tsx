import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  Share2,
  MessageCircle,
  Zap,
  Shield,
  Palette,
  Globe,
  Clock,
  Target,
  Smartphone,
  Download,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const features = [
  {
    icon: BarChart3,
    title: "Beautiful Analytics",
    description: "Visualize poll results with interactive bar charts, pie charts, and real-time data visualization.",
    details: ["Interactive charts", "Real-time updates", "Export capabilities", "Custom styling"],
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: Users,
    title: "Easy Voting Experience",
    description: "Simple, intuitive voting interface that works seamlessly on any device without registration.",
    details: ["No registration required", "Mobile-optimized", "Single or multiple choice", "Instant feedback"],
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: Share2,
    title: "Social Sharing",
    description: "Share your polls instantly across social media platforms, via email, or with a simple link.",
    details: ["One-click sharing", "Social media integration", "Custom share messages", "QR code generation"],
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    icon: MessageCircle,
    title: "Comments & Feedback",
    description: "Enable rich discussions with comment systems that let voters share detailed thoughts and feedback.",
    details: ["Threaded comments", "Moderation tools", "Anonymous options", "Rich text support"],
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    icon: Zap,
    title: "Real-time Results",
    description: "Watch votes pour in live with instant updates, notifications, and dynamic result visualization.",
    details: ["Live vote counting", "Push notifications", "Auto-refresh", "Result animations"],
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Enterprise-grade security with privacy controls, data encryption, and compliance features.",
    details: ["Data encryption", "Privacy controls", "GDPR compliant", "Secure hosting"],
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Personalize your polls with custom themes, colors, and branding to match your style.",
    details: ["Custom colors", "Brand integration", "Theme templates", "Dark/light modes"],
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Create polls in multiple languages and reach a global audience with localization features.",
    details: ["20+ languages", "RTL support", "Auto-translation", "Regional formats"],
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950",
  },
  {
    icon: Clock,
    title: "Poll Scheduling",
    description: "Schedule polls to start and end automatically, set deadlines, and manage time-sensitive surveys.",
    details: ["Auto start/stop", "Deadline management", "Timezone support", "Reminder notifications"],
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-950",
  },
  {
    icon: Target,
    title: "Advanced Targeting",
    description:
      "Target specific audiences with demographic filters, location-based restrictions, and custom criteria.",
    details: ["Demographic filters", "Location targeting", "Custom criteria", "Audience insights"],
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description:
      "Perfect mobile experience with responsive design, touch-friendly interface, and offline capabilities.",
    details: ["Responsive design", "Touch optimized", "Offline support", "App-like experience"],
    color: "text-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-950",
  },
  {
    icon: Download,
    title: "Data Export",
    description: "Export poll data in multiple formats including CSV, PDF, and JSON for further analysis.",
    details: ["Multiple formats", "Scheduled exports", "API access", "Bulk operations"],
    color: "text-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-950",
  },
]

const integrations = [
  { name: "Slack", description: "Get poll notifications in Slack channels" },
  { name: "Microsoft Teams", description: "Integrate polls with Teams workflows" },
  { name: "Google Workspace", description: "Sync with Google Sheets and Drive" },
  { name: "Zapier", description: "Connect with 3000+ apps via Zapier" },
  { name: "Webhook API", description: "Custom integrations with our API" },
  { name: "Email Marketing", description: "Integrate with Mailchimp, ConvertKit" },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            ✨ Comprehensive Feature Set
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Everything You Need for Perfect Polls
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover all the powerful features that make PollCraft the ultimate polling platform. From basic surveys to
            advanced analytics, we've got you covered.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent">
              <Link href="/demo">Try Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Every Use Case</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're conducting market research, gathering feedback, or making team decisions, our features adapt
            to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Integrations Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect PollCraft with your favorite tools and workflows for a streamlined experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{integration.name}</h3>
                <p className="text-sm text-muted-foreground">{integration.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Join the growing community of users who rely on PollCraft for their polling needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-blue-100">Polls Created</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2M+</div>
                <p className="text-blue-100">Votes Collected</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <p className="text-blue-100">Active Users</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <p className="text-blue-100">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience all these features and more with our free plan. Upgrade anytime as your needs grow.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Start Free Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
