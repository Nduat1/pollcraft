# 🗳️ PollCraft - Online Poll System

A modern, feature-rich online polling platform built with Next.js 15, React 18, and TypeScript. Create engaging polls, collect votes from your audience, and analyze results with beautiful interactive charts.

![PollCraft Banner](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=PollCraft+-+Create+Amazing+Polls)

## ✨ Features

### 🎯 Core Functionality
- **Poll Creation**: Create unlimited polls with multiple choice options
- **Real-time Voting**: Live vote counting with instant result updates
- **Beautiful Analytics**: Interactive charts powered by Recharts
- **Social Sharing**: Share polls via social media, email, or direct links
- **Comments & Feedback**: Allow voters to leave comments and insights
- **Demo Polls**: Pre-built example polls for testing and inspiration

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Smooth Animations**: Polished interactions and transitions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### 🔐 User Management
- **Authentication System**: Secure login and registration
- **User Dashboard**: Manage all your polls in one place
- **Profile Management**: Customize your profile and preferences
- **Poll Analytics**: Detailed statistics and voting patterns
- **Settings Panel**: Configure notifications and privacy settings

### 📊 Analytics & Insights
- **Interactive Charts**: Bar charts, pie charts, and trend analysis
- **Real-time Updates**: Live vote tracking and result visualization
- **Export Data**: Download poll results in various formats
- **Voting Patterns**: Analyze voter behavior and demographics
- **Performance Metrics**: Track poll engagement and reach

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/pollcraft.git
   cd pollcraft
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js** - React framework with App Router
- **React** - UI library with latest features
- **TypeScript** - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme switching functionality

### Data Visualization
- **Recharts** - Composable charting library
- **Interactive Charts** - Bar, pie, and line charts
- **Real-time Updates** - Live data visualization


## 📁 Project Structure

\`\`\`
pollcraft/
├── pages/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/               # Login page
│   │   └── signup/              # Registration page
│   ├── dashboard/               # Protected dashboard routes
│   │   ├── analytics/           # Analytics page
│   │   ├── create/              # Poll creation
│   │   ├── polls/               # Poll management
│   │   ├── profile/             # User profile
│   │   └── settings/            # User settings
│   ├── demo/                    # Demo polls
│   ├── features/                # Features showcase
│   ├── pricing/                 # Pricing page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── app-sidebar.tsx          # Dashboard sidebar
│   ├── footer.tsx               # Site footer
│   ├── navbar.tsx               # Navigation bar
│   ├── poll-chart.tsx           # Chart components
│   └── theme-provider.tsx       # Theme context
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── middleware.ts                # Next.js middleware
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Secondary**: Neutral grays with proper contrast ratios
- **Accent Colors**: Green, Orange, Purple, Yellow, Red for charts
- **Dark Mode**: Fully supported with automatic theme detection

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear heading structure with proper spacing
- **Accessibility**: WCAG AA compliant contrast ratios

### Components
- **Cards**: Consistent spacing and elevation
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Accessible inputs with validation states
- **Charts**: Interactive and responsive data visualization


## 📱 Features Walkthrough

### 1. Homepage
- Hero section with call-to-action
- Feature showcase with icons and descriptions
- Social proof and testimonials
- Responsive design for all devices

### 2. Authentication
- Secure login and registration forms
- Form validation and error handling
- Redirect to dashboard after authentication
- Password strength requirements

### 3. Dashboard
- **Overview**: Poll statistics and recent activity
- **Create Poll**: Step-by-step poll creation wizard
- **Manage Polls**: View, edit, and delete existing polls
- **Analytics**: Detailed voting statistics and charts
- **Profile**: User information and preferences
- **Settings**: Notification and privacy controls

### 4. Poll Creation
- Multiple choice options (up to 10 options)
- Poll title and description
- Voting restrictions and expiration dates
- Preview before publishing
- Social sharing configuration

### 5. Voting Interface
- Clean, intuitive voting UI
- Real-time result updates
- Comment system for feedback
- Social sharing buttons
- Mobile-optimized experience

### 6. Analytics Dashboard
- Interactive charts and graphs
- Vote distribution analysis
- Time-based voting patterns
- Export functionality
- Filtering and sorting options

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic builds

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


