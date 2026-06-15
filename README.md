# 📚 Book Production System

A personal web application for writing, formatting, and publishing books with AI assistance. Go from idea to manuscript to publish-ready files.

## Features

### MVP Phase
- ✏️ **Manuscript Editor** - Write chapters in your voice with formatting support
- 📋 **Chapter Organizer** - Organize chapters, sections, and content structure
- 🤖 **AI Writing Assistant** - Brainstorm, expand outlines, refine content
- 🖼️ **Asset Library** - Import and manage images, graphics, and references
- 🎨 **Cover Designer** - Create covers with KDP/Ingram templates
- 📄 **Export** - PDF, DOCX, EPUB, and KDP-ready print files
- 💾 **Version History** - Track changes and revisions
- 🎭 **Voice Guide** - Save writing style and tone instructions

### Future Enhancements
- Image generation with AI (DALL-E, Midjourney)
- Advanced formatting and layout tools
- Multi-book series management
- Publishing workflow automation
- Analytics and reader feedback
- Pen name management

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Storage**: Supabase Storage
- **AI Integration Points**: OpenAI, Claude, Hugging Face (configurable)
- **State Management**: Zustand
- **Markdown**: React Markdown + GFM

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mkbmarketing5/book-production-system.git
   cd book-production-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for server-side operations)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── projects/                # Manuscript management
│   ├── ai-workspace/            # AI assistant interface
│   ├── assets/                  # Asset library
│   ├── covers/                  # Cover designer
│   └── api/                     # API routes (coming soon)
├── components/                   # Reusable React components
├── lib/                         # Utilities and helpers
│   ├── supabase.ts             # Supabase client
│   └── types.ts                # TypeScript definitions
├── supabase/
│   └── migrations/              # Database migrations
├── public/                       # Static assets
└── package.json
```

## Database Schema

### Core Tables
- **projects** - Book projects and manuscripts
- **chapters** - Individual chapters and sections
- **assets** - Images, graphics, references
- **cover_designs** - Book cover designs
- **style_guides** - Voice/tone instructions for AI
- **version_history** - Chapter revision history
- **export_jobs** - Export tracking
- **ai_content_history** - Generated content tracking

## API Routes (to be implemented)

```
GET  /api/projects              - List projects
POST /api/projects              - Create project
GET  /api/projects/[id]         - Get project details
PUT  /api/projects/[id]         - Update project
DEL  /api/projects/[id]         - Delete project

GET  /api/projects/[id]/chapters    - List chapters
POST /api/projects/[id]/chapters    - Create chapter
PUT  /api/chapters/[id]             - Update chapter
DEL  /api/chapters/[id]             - Delete chapter

GET  /api/assets                - List assets
POST /api/assets                - Upload asset
DEL  /api/assets/[id]           - Delete asset

GET  /api/covers                - List covers
POST /api/covers                - Create cover
PUT  /api/covers/[id]           - Update cover

POST /api/export                - Start export job
GET  /api/export/[id]           - Get export status

POST /api/ai/generate-text      - Generate text content
POST /api/ai/generate-image     - Generate images
POST /api/ai/enhance-content    - Rewrite/enhance content
```

## Usage

### Creating a Project
1. Click "New Project" on the Manuscripts page
2. Enter project details (title, genre, pen name)
3. Add writing voice instructions (optional)
4. Start writing chapters

### Using AI Workspace
1. Open AI Workspace
2. Ask for specific assistance (brainstorm, expand outline, generate concepts)
3. Review and approve suggestions
4. Insert approved content into your manuscript

### Managing Assets
1. Upload images, graphics, or references
2. Organize by project
3. Tag assets for easy discovery
4. Embed in chapters

### Designing Covers
1. Select cover specification (KDP, Ingram, etc.)
2. Choose template or design from scratch
3. Upload artwork or generate with AI
4. Export at correct resolution

### Exporting
1. Select export format (PDF, DOCX, EPUB, KDP Print)
2. Configure export options
3. Generate file
4. Download or send to publishing platform

## Configuration

### AI Services

To enable AI features, add API keys to `.env.local`:

```env
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-...
HUGGINGFACE_API_KEY=hf_...
```

### Cover Specifications

Cover specs are defined in `app/covers/page.tsx`. Add more specifications as needed.

## Development

### Running in Development Mode
```bash
npm run dev
```

### Type Checking
```bash
npm run type-check
```

### Building for Production
```bash
npm run build
npm run start
```

## Roadmap

- [ ] Complete manuscript editor with advanced formatting
- [ ] Database schema and migrations
- [ ] Supabase authentication
- [ ] AI text generation and enhancement
- [ ] Image generation integration
- [ ] Advanced cover designer
- [ ] PDF/EPUB/DOCX export functionality
- [ ] KDP integration for direct publishing
- [ ] Version control and comparison
- [ ] Analytics dashboard
- [ ] Collaboration features
- [ ] Mobile app

## Support

For issues or questions, create an issue on GitHub.

## License

MIT
