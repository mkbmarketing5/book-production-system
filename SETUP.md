# Setup Guide for Book Production System

## 🚀 Quick Start (5 minutes)

### 1. Create Supabase Project

1. Go to https://supabase.com and sign up
2. Click "New Project"
3. Fill in:
   - **Project name**: `book-production-system`
   - **Database password**: Generate a strong password
   - **Region**: Choose closest to you
4. Click "Create new project" and wait 2-3 minutes

### 2. Get Your Credentials

1. Once project is created, go to **Settings → API**
2. Copy these three values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Create Environment Variables

1. In your project root, rename `.env.example` to `.env.local`
2. Paste your three keys:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### 4. Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click **Create new bucket**
3. Name: `book-assets`
4. Make it **Public** (check the box)
5. Click **Create bucket**

### 5. Run Database Migrations

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click **Run**
6. Wait for "Success" message

### 6. Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser!

---

## 📝 Optional: AI Integration

For AI features, add these keys to `.env.local`:

```bash
# OpenAI (for ChatGPT integration)
OPENAI_API_KEY=sk-...

# Claude (Anthropic alternative)
CLAUDE_API_KEY=sk-...

# Hugging Face (for image generation)
HUGGINGFACE_API_KEY=hf_...
```

---

## ✅ Testing

1. Go to http://localhost:3000
2. Click **Sign Up** and create account
3. Create a new project
4. Start writing!

---

## 🆘 Troubleshooting

**"Missing Supabase environment variables"**
- Check `.env.local` file exists
- Verify all three keys are correct
- Restart dev server: `Ctrl+C` then `npm run dev`

**"Database error"**
- Check migrations ran successfully in Supabase
- Verify Storage bucket is public

**"Auth not working"**
- Go to Supabase → Auth → Providers
- Make sure "Email" provider is enabled

