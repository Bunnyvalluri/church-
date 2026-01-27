# 🏛️ Kingdom of Christ Ministries - Professional Church Web Application

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge&logo=openai)

A modern, professional, and AI-powered church web application built with Next.js 14, TypeScript, and Tailwind CSS. Features bilingual support (English & Telugu), online donations, member portal, and an intelligent AI chatbot.

## ✨ Features

### 🎨 **Professional Design**
- **Modern UI/UX** with gradient backgrounds and glassmorphism effects
- **Responsive Design** - Works perfectly on all devices
- **Dark Mode Support** - Automatic theme switching
- **Smooth Animations** - Framer Motion powered transitions
- **Premium Components** - Built with Radix UI and shadcn/ui

### 🏠 **Public Website**
- ✅ **Hero Section** - Stunning gradient background with stats
- ✅ **About Church** - Mission, values, and church information
- ✅ **Services** - All ministry programs and service times
- ✅ **Events Calendar** - Upcoming events with registration
- ✅ **Sermons Library** - Video/audio sermons with search
- ✅ **Testimonials** - Member testimonials with ratings
- ✅ **Contact Form** - Integrated contact form with map
- ✅ **Gallery** - Photo gallery of church events

### 👤 **Member Portal** (Coming Soon)
- Login/Register system
- Member dashboard
- Prayer request submission
- Event registration
- Donation history
- Profile management

### 🧑‍💼 **Admin Dashboard** (Coming Soon)
- Event management
- Sermon uploads
- Member management
- Announcement posting
- Donation tracking
- Analytics dashboard

### 🤖 **AI Features**
- ✅ **Bilingual AI Chatbot** (English & Telugu)
  - 24/7 automated support
  - Service time inquiries
  - Location and contact information
  - Event information
  - Prayer request guidance
  - Membership information

### 💳 **Online Donations**
- Stripe integration for secure payments
- Multiple donation purposes
- Recurring donations support
- Donation receipts

## 🚀 Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Premium UI components
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Production database
- **NextAuth.js** - Authentication system

### **AI Integration**
- **LangChain** - AI orchestration framework
- **OpenAI GPT** - Language model
- **Pinecone** - Vector database for RAG
- **Gemini AI** - Google's AI model
- **Anthropic Claude** - Alternative AI model

### **Payment & Communication**
- **Stripe** - Payment processing
- **Resend** - Email service
- **Twilio** - SMS notifications

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- API keys for AI services (optional for basic features)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd church
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy `.env.local` and update with your credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/church_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe (for donations)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# AI Services (optional)
OPENAI_API_KEY="sk-..."
GEMINI_API_KEY="..."
PINECONE_API_KEY="..."

# Email & SMS (optional)
RESEND_API_KEY="re_..."
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
```

### 4. Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
church/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── events/         # Event management
│   │   ├── sermons/        # Sermon management
│   │   └── donations/      # Payment processing
│   ├── (auth)/             # Auth pages (login, register)
│   ├── admin/              # Admin dashboard
│   ├── member/             # Member portal
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── ai/                 # AI chatbot components
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── sections/           # Page sections (Hero, About, etc.)
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Utility functions
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                  # Static assets
└── .env.local              # Environment variables
```

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User** - Member accounts with roles (Admin, Pastor, Member)
- **Event** - Church events with categories
- **Sermon** - Video/audio sermons with transcripts
- **PrayerRequest** - Prayer requests with categories
- **Donation** - Online donations with Stripe integration
- **Announcement** - Church announcements
- **Testimonial** - Member testimonials
- **Ministry** - Ministry information
- **Pastor** - Pastor profiles
- **Gallery** - Photo gallery

## 🤖 AI Integration Guide

### Setting up the AI Chatbot

1. **OpenAI Setup**
   ```bash
   # Get API key from https://platform.openai.com
   OPENAI_API_KEY="sk-..."
   ```

2. **Pinecone Vector Database**
   ```bash
   # Create index at https://www.pinecone.io
   PINECONE_API_KEY="..."
   PINECONE_INDEX="church-sermons"
   ```

3. **Sermon Indexing** (for RAG)
   - Upload sermon transcripts
   - Generate embeddings
   - Store in Pinecone for semantic search

### AI Features Roadmap

- ✅ Basic chatbot with keyword responses
- 🔄 RAG-based sermon search
- 🔄 Prayer request auto-categorization
- 🔄 Bible verse recommendations
- 🔄 Multilingual support (Telugu, Hindi, etc.)
- 🔄 Voice input/output

## 💳 Payment Integration

### Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard
3. Configure webhook endpoint: `/api/webhooks/stripe`
4. Test with test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy!

3. **Setup Database**
   - Use Vercel Postgres or Railway
   - Update `DATABASE_URL` in Vercel environment variables
   - Run migrations: `npx prisma migrate deploy`

### Alternative Deployment Options

- **Netlify** - Great for static sites
- **Railway** - Full-stack deployment with database
- **AWS Amplify** - Enterprise-grade hosting
- **DigitalOcean** - VPS deployment

## 📱 Mobile App (Future)

Convert to mobile app using:
- **React Native** - Cross-platform mobile app
- **Expo** - Faster development
- **Capacitor** - Web to native

## 🎯 Roadmap

### Phase 1: MVP (Completed ✅)
- [x] Professional website design
- [x] All public pages
- [x] Basic AI chatbot
- [x] Responsive design

### Phase 2: Member Features (In Progress 🔄)
- [ ] Authentication system
- [ ] Member dashboard
- [ ] Prayer request system
- [ ] Event registration
- [ ] Online donations

### Phase 3: Admin Dashboard (Planned 📋)
- [ ] Event management
- [ ] Sermon uploads
- [ ] Member management
- [ ] Analytics
- [ ] Email campaigns

### Phase 4: Advanced AI (Planned 🤖)
- [ ] RAG-based sermon search
- [ ] Multilingual chatbot
- [ ] Voice assistant
- [ ] Auto sermon transcription
- [ ] Smart recommendations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email info@kingdomofchrist.org or call +91 96409 43777.

## 🙏 Acknowledgments

- **Church Leadership** - For their vision and support
- **Development Team** - For building this amazing platform
- **Community** - For their feedback and contributions

---

**Built with ❤️ for Kingdom of Christ Ministries, Hyderabad**

🌐 **Website**: [http://localhost:3000](http://localhost:3000)  
📧 **Email**: info@kingdomofchrist.org  
📱 **Phone**: +91 96409 43777  
📍 **Address**: 15-201, Vivekananda Nagar, Jeedimetla, Hyderabad, Telangana 500055
