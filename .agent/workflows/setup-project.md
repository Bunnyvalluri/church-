---
description: Setup Kingdom of Christ Ministries Web Application
---

# Kingdom of Christ Ministries - Full Stack Church Web Application Setup

## Phase 1: Project Initialization (Week 1)

### Step 1: Initialize Next.js Project
```bash
npx create-next-app@latest ./ --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

### Step 2: Install Core Dependencies
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast class-variance-authority clsx tailwind-merge lucide-react
```

### Step 3: Install shadcn/ui
```bash
npx shadcn-ui@latest init
```

### Step 4: Install Additional UI Components
```bash
npx shadcn-ui@latest add button card input textarea select dialog dropdown-menu tabs toast navigation-menu
```

### Step 5: Install Database & Auth
```bash
npm install @prisma/client prisma next-auth bcryptjs stripe
npm install -D @types/bcryptjs
```

### Step 6: Install AI Dependencies
```bash
npm install langchain @langchain/openai @langchain/community @pinecone-database/pinecone openai ai
```

### Step 7: Initialize Prisma
```bash
npx prisma init
```

## Phase 2: Core Features Development (Week 2-3)

### Public Pages
- Home (Hero, Services, Upcoming Events)
- About Church
- Pastors & Leaders
- Ministries
- Events Calendar
- Sermons (Video/Audio Library)
- Gallery
- Contact Us

### Member Portal
- Login/Register
- Member Dashboard
- Prayer Requests
- Announcements
- Volunteer Registration

### Admin Dashboard
- Manage Events
- Upload Sermons
- Manage Members
- Post Announcements
- Donation Tracking

## Phase 3: AI Integration (Week 4)

### AI Features
1. **Bilingual AI Chatbot (Telugu + English)**
   - RAG-based sermon search
   - Event information
   - General church queries

2. **Smart Prayer Request System**
   - Auto-categorization
   - Bible verse suggestions
   - Prayer partner matching

3. **Sermon Intelligence**
   - Auto-transcription
   - Searchable sermon library
   - Topic-based recommendations

## Phase 4: Deployment

### Vercel Deployment
```bash
vercel --prod
```

### Database Setup
- Railway PostgreSQL or Vercel Postgres
- Run migrations: `npx prisma migrate deploy`
