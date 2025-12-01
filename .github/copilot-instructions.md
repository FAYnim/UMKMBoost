# AI Coding Assistant Instructions - UMKM Promotion Website

## Project Overview
This is an AI-powered web platform helping Indonesian SMEs (UMKM) create promotional content. The core features are AI Content Ideas, Caption Generator, and Text Poster Generator. Target users are non-technical small business owners who need quick, simple content creation tools.

## Architecture & Structure
Follow the planned directory structure from PRD.md:
```
├── /assets (icons, images, fonts)
├── /src
│   ├── /css (style.css)
│   ├── /js (main.js, ai-ideas.js, ai-caption.js, ai-poster.js)
│   └── /pages (home.html, ideas.html, caption.html, poster.html)
└── index.html
```

## Tech Stack & Patterns
- **Frontend**: HTML5, CSS3 (Flexbox), Vanilla JavaScript SPA
- **Routing**: Hash-based routing (#/home, #/ideas, #/caption, #/poster)
- **State**: LocalStorage for optional history
- **AI Integration**: Generic AI API handler for prompt-based content generation

## Key Development Guidelines

### UI/UX Principles
- **UMKM-friendly design**: Large buttons, clear text (≥14px), minimal interface
- **Mobile-first responsive**: Target users often use budget smartphones
- **Load performance**: <2 seconds, lightweight components
- **No authentication**: Barrier-free access for quick content creation
- **Color scheme**: Blue/white minimalist modern design

### Component Architecture
Create reusable components for:
- `Button` - Large, accessible buttons for UMKM users
- `AIResultCard` - Display AI-generated content consistently
- `FormBuilder` - Handle category/tone/CTA inputs
- `LoadingSpinner` - Show during AI processing
- `Toast/Alert` - User feedback and error handling

### AI Integration Patterns
Each AI feature (ideas, captions, posters) should:
- Accept Indonesian business context (jenis usaha, tujuan konten)
- Generate 3-5 relevant outputs per request
- Include platform-specific formatting (Reels/Feed/Story/Carousel)
- Provide ready-to-use content with hashtags and CTAs

### Form Input Standards
- **Business Type**: Dropdown with Indonesian UMKM categories (makanan, fashion, jasa, minuman)
- **Content Purpose**: jualan, edukasi, brand awareness, promo harian
- **Tone Options**: Friendly, professional, casual (in Bahasa Indonesia)
- **Platform**: Instagram, Facebook, WhatsApp Status

### Content Generation Specs
- **AI Ideas**: Return title, description, suggested format, platform recommendation
- **Caption Generator**: Include hashtag suggestions, tone matching, length options
- **Poster Generator**: Structured text layout with clear CTA, copyable format

### File Naming & Organization
- Use kebab-case for files: `ai-caption-generator.js`
- Group related functionality: all AI features in `/js` directory
- Separate pages for each main feature to maintain SPA simplicity

## Development Workflow
1. Start with `main.js` for routing and core SPA functionality
2. Build individual feature modules (`ai-ideas.js`, etc.) as separate files
3. Create corresponding HTML pages in `/pages` directory
4. Test mobile responsiveness throughout development
5. Validate with Indonesian business scenarios

## Testing Considerations
- Test with real Indonesian business names and scenarios
- Verify mobile usability on smaller screens
- Ensure AI outputs are culturally appropriate for Indonesian SMEs
- Check loading performance on slower connections

## Key Business Context
Remember that users are Indonesian small business owners who may not be tech-savvy. All generated content should be in Bahasa Indonesia unless specifically requested otherwise. Focus on practical, immediately usable promotional content that requires minimal editing.