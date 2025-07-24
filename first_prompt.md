# Wisdom Deck Project - First Prompt for AI Assistant

## 1. Project Overview & Core Technologies

**Project Name:** Wisdom Deck (wisdomdeck.online)  
**Core Mission:** A web platform celebrating Yoruba language and culture through interactive games and educational content.

**Primary Features:**

- **Yoruba Word Master Game:** A Word Master-style game using 5-letter Yoruba words with accent-sensitive mechanics and Supabase database integration (✅ COMPLETELY REBRANDED from "Wordle")
- **Yoruba Proverbs eBook:** A promotional page for an eBook with live Stripe payment integration

**Tech Stack:**

- **Framework:** Next.js (v14.1.0) with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v3.4.1)
- **Database:** Supabase (PostgreSQL) with two tables: `dictionary_ai` (A-I) and `dictionary_jz` (J-Z)
- **Payment Processing:** Stripe integration with webhook handling
- **Testing:** Jest, React Testing Library, Playwright with @axe-core/playwright for accessibility
- **CI/CD:** GitHub Actions with comprehensive quality assurance pipeline
- **Deployment:** Vercel (production-ready)

## 2. Current State & Key Implementation Details

### Yoruba Word Master Game (FULLY INTEGRATED WITH SUPABASE) - ✅ COMPLETELY REBRANDED

- **✅ COMPLETE:** The game is fully functional with Supabase database integration
- **URL:** `/yoruba-word-master` (✅ COMPLETED: renamed from `/yoruba-wordle`)
- **Branding:** "Yorùbá Word Master" with proper Yorùbá accent marks throughout
- **Subtitle:** "A Yorùbá Word Guessing Game"
- **Word Validation:** Uses `lib/supabase.ts` with grapheme-aware counting using `Intl.Segmenter`
- **Database:** 11,447 Yoruba words across two tables (`dictionary_ai` and `dictionary_jz`)
- **API Routes:**
  - `/api/word-master/random-word` - Fetches random daily word (✅ COMPLETED: renamed from `/api/wordle/`)
  - `/api/word-master/validate-guess` - Validates user guesses against database (✅ COMPLETED: renamed from `/api/wordle/`)
- **Features:** Accent-sensitive keyboard, "Help & Hints" modal, hint systems, Unicode normalization
- **Component:** `components/YorubaWordMaster.tsx` (✅ COMPLETED: renamed from YorubaWordle.tsx)
- **Hook:** `hooks/useWordMaster.ts` (✅ COMPLETED: renamed from useWordle.ts)
- **UI Improvements:**
  - "Back to Wisdom Deck" link positioned at top-left corner
  - Help & Hints button positioned at top-right corner (no overlap with title)
  - Wisdom Deck logo (120x120px) in footer
  - Clean, professional layout with proper contrast

### Latest UX Enhancements (December 2024)

- **✅ Dynamic Grid Squares:** Complete implementation for 3-7 letter word support
  - GameBoard now dynamically adapts grid columns based on word length
  - Settings panel includes word length selection (3-7 letters)
  - Supabase queries filter by word_length with fallback logic
  - API route validates word length range (3-7)
  - Keyboard layout and spacing remain identical across all word lengths
- **✅ Development Scripts:** Added `dev:force` script for development workflow
  - Kills all existing Next.js processes and Node.js processes on ports 3000-3009
  - Forces server to start on port 3000
  - Includes 1-second delay for process termination
- **✅ Reveal Word Functionality:** Complete implementation allowing players to reveal the solution
  - Added to HelpModal with confirmation dialogs
  - Displays revealed solution below game board
  - Resets on new game
- **✅ HelpModal Improvements:** Replaced HowToPlayModal with better tabbed interface
  - "How to Play" tab: Game instructions and rules
  - "Need Help?" tab: Enhanced reveal word functionality with better UX
  - Better confirmation dialogs and user feedback
- **✅ Navbar Updates:** Changed "Help" button text to "Help & Hints"
- **✅ Modal UX Enhancements:**
  - Universal escape key support for all modals
  - Backdrop click-to-close functionality
  - Confirmation modals for destructive actions
  - Toast notifications for user feedback
- **✅ Settings Panel Improvements:**
  - Apply button no longer forces game reset
  - Settings changes apply immediately without losing progress
  - Toast notification when settings are applied
  - Word length selection with immediate game restart when changed
- **✅ Memory Leak Fixes:** Optimized modal event listeners to prevent accumulation
- **✅ Dependency Stability:** Fixed @nodelib package version conflicts
- **✅ Cache Management:** Added development scripts for cache clearing

### Wisdom Deck Branding & UI Enhancements (LATEST)

- **Logo Integration:** Wisdom Deck logo (120x120px) added to footers on both home page and game page
- **Navbar Cleanup:** Removed "Wisdom Deck" text from navbar, aligned navigation links to the right
- **Footer Enhancements:**
  - Removed social media links from home page footer
  - Added Wisdom Deck logo image to both footers
  - Matched footer text sizes across pages
  - Removed logo text next to logo image for cleaner look
- **Game Page Layout:**
  - Fixed overlapping elements by repositioning navigation and help buttons
  - Clean header with centered title and subtitle
  - Consistent dark theme with proper contrast

### Supabase Integration Status

- **✅ COMPLETE:** All phases successfully implemented
- **Database:** Two-table architecture (dictionary_ai, dictionary_jz) handling 11,447 words
- **Word Validation:** Robust validation with grapheme-aware character counting
- **Unicode Support:** Full support for Yoruba diacritics and complex characters
- **Error Handling:** Comprehensive error handling and user feedback

### Payment Integration (Stripe)

- **✅ COMPLETE:** Full Stripe integration for eBook purchases
- **Components:** `components/proverbs/ProverbPurchase.tsx`
- **API Routes:**
  - `/api/stripe/checkout` - Creates checkout sessions
  - `/api/stripe/webhook` - Handles payment confirmations
- **Email Integration:** Resend API for automated eBook delivery

### Quality Assurance & Testing

- **✅ COMPREHENSIVE:** Robust testing pipeline with excellent results
- **E2E Testing:** Playwright with graduated accessibility testing (reduced from 219 to 2 violations)
- **Unit Testing:** Jest with React Testing Library and jest-axe
- **CI/CD:** GitHub Actions running on every push/PR
- **Performance:** Bundle analysis with @next/bundle-analyzer
- **Security:** npm audit for vulnerability scanning
- **Updated Tests:** All test expectations updated for new URL and title changes

### Recent Fixes & Improvements

- **✅ Yoruba Word Master Rebranding:** Complete rebranding from "Wordle" to "Word Master"
- **✅ URL Update:** `/yoruba-wordle` → `/yoruba-word-master`
- **✅ Component Renaming:** `YorubaWordle.tsx` → `YorubaWordMaster.tsx`
- **✅ Hook Renaming:** `useWordle.ts` → `useWordMaster.ts`
- **✅ API Route Renaming:** `/api/wordle/` → `/api/word-master/`
- **✅ UI/UX Enhancements:** Professional logo integration and layout improvements
- **✅ Navigation Fixes:** Proper positioning of navigation elements
- **✅ Vercel Deployment:** Fixed missing environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- **✅ Dependencies:** Installed missing packages (@stripe/stripe-js, @axe-core/playwright)
- **✅ Server Components:** Added 'use client' directive to fix Server Component hooks error
- **✅ Stripe API:** Updated to latest API version ('2025-06-30.basil')
- **✅ Playwright Config:** Fixed baseURL and webServer configuration
- **✅ Reveal Word Feature:** Complete implementation with confirmation dialogs
- **✅ HelpModal Replacement:** Better tabbed interface with enhanced UX
- **✅ Modal UX:** Universal escape key and backdrop click support
- **✅ Memory Leaks:** Fixed accumulating event listeners in modals
- **✅ Dependencies:** Resolved @nodelib package version conflicts

## 3. Environment Variables Required

**Production Environment Variables (Vercel):**

- `NEXT_PUBLIC_SUPABASE_URL` = `https://hwquviowywgcfxkfzplf.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Supabase anon key)
- `STRIPE_SECRET_KEY` = (Stripe secret key)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = (Stripe publishable key)
- `STRIPE_WEBHOOK_SECRET` = (Stripe webhook secret)
- `RESEND_API_KEY` = (Resend API key)

## 4. Current Status

**✅ PRODUCTION READY:**

- All tests passing (E2E tests complete in ~4.2 seconds)
- Accessibility compliance (2 total violations, down from 219)
- Successful Vercel deployment with all environment variables configured
- Comprehensive test coverage and quality assurance
- Full Supabase integration with robust word validation
- Complete Stripe payment processing
- **✅ COMPLETED:** Yoruba Word Master rebranding fully implemented
- **✅ COMPLETED:** Professional UI/UX enhancements with logo integration
- **✅ COMPLETED:** Updated URLs and navigation structure
- **✅ COMPLETED:** All rename operations (routes, components, hooks, APIs)
- **✅ COMPLETED:** Comprehensive testing phase with all systems operational
- **✅ COMPLETED:** Reveal Word functionality with confirmation dialogs
- **✅ COMPLETED:** HelpModal replacement with tabbed interface
- **✅ COMPLETED:** Modal UX improvements and memory leak fixes
- **✅ COMPLETED:** Dependency stability and cache management
- **✅ COMPLETED:** Dynamic grid squares for 3-7 letter word support
- **✅ COMPLETED:** Development workflow improvements with dev:force script

### **Testing Results Summary:**

- ✅ **Server Start:** Development server starts without errors
- ✅ **Home Page Load:** Page loads with correct branding and navigation
- ✅ **Game Page Load:** New route `/yoruba-word-master` works perfectly
- ✅ **Old Route Broken:** Old `/yoruba-wordle` route returns 404 as expected
- ✅ **API Endpoints:** All `/api/word-master/` endpoints working correctly
- ✅ **Old API Broken:** Old `/api/wordle/` endpoints return 404 as expected
- ✅ **Navigation:** Smooth transitions between pages
- ✅ **Game Functionality:** Basic game interaction works without errors
- ✅ **Visual Branding:** Consistent "Word Master" branding throughout
- ✅ **Console Errors:** No critical errors during testing
- ✅ **Reveal Word:** Functionality works with confirmation dialogs
- ✅ **Help Modal:** Tabbed interface with enhanced UX
- ✅ **Modal Interactions:** Escape key and backdrop click support
- ✅ **Settings Panel:** Apply without game reset functionality
- ✅ **Dynamic Grid:** Grid adapts to 3-7 letter words correctly
- ✅ **Word Length Selection:** Settings panel word length selection works
- ✅ **Dev Force Script:** Successfully kills processes and starts on port 3000

**Key Files:**

- `lib/supabase.ts` - Core database integration and word validation
- `components/YorubaWordMaster.tsx` - Main game component (✅ COMPLETED: renamed from YorubaWordle.tsx)
- `hooks/useWordMaster.ts` - Main game logic hook (✅ COMPLETED: renamed from useWordle.ts)
- `app/yoruba-word-master/page.tsx` - Game page (✅ COMPLETED: renamed from yoruba-wordle)
- `app/api/word-master/` - Game API routes (✅ COMPLETED: renamed from wordle)
- `app/api/stripe/` - Payment API routes
- `components/layout/Footer.tsx` - Footer with Wisdom Deck logo
- `components/layout/Navbar.tsx` - Clean navigation bar
- `components/wordle/HelpModal.tsx` - Enhanced help modal with tabbed interface
- `components/word-master/ConfirmationModal.tsx` - Reusable confirmation modal
- `components/word-master/ToastNotification.tsx` - Toast notification component
- `components/wordle/GameBoard.tsx` - Dynamic grid component with word length support
- `components/word-master/SettingsPanel.tsx` - Settings panel with word length selection
- `tests/example.spec.ts` - E2E tests with accessibility (updated for new URLs)
- `playwright.config.ts` - Test configuration
- `mocks/handlers.js` - API mock handlers (✅ COMPLETED: updated for new API paths)
- `VERCEL_DEPLOYMENT_GUIDE.md` - Deployment troubleshooting guide
- `public/wisdom-deck-logo.png` - Wisdom Deck logo asset

## 5. Before We Begin

Please confirm your understanding of:

1. The current architecture with Supabase database integration
2. The comprehensive testing pipeline and recent improvements
3. The production-ready status with Vercel deployment
4. The accent-sensitive Yoruba Word Master game mechanics (✅ COMPLETELY REBRANDED)
5. The Stripe payment integration for the eBook
6. **✅ COMPLETED:** The complete Yoruba Word Master rebranding and UI enhancements
7. **✅ COMPLETED:** The updated URL structure and navigation improvements
8. **✅ COMPLETED:** All rename operations (routes, components, hooks, APIs)
9. **✅ COMPLETED:** Comprehensive testing phase with all systems operational
10. **✅ COMPLETED:** Reveal Word functionality with confirmation dialogs
11. **✅ COMPLETED:** HelpModal replacement with enhanced tabbed interface
12. **✅ COMPLETED:** Modal UX improvements and memory leak fixes
13. **✅ COMPLETED:** Dependency stability and cache management
14. **✅ COMPLETED:** Dynamic grid squares for 3-7 letter word support
15. **✅ COMPLETED:** Development workflow improvements with dev:force script

The project is now fully functional and deployed with professional branding throughout. All Phase 1 & 2 changes have been completed successfully, including comprehensive testing. Any new development should maintain the high quality standards and comprehensive testing approach that has been established.

---

## Latest Changes (December 2024)

- **Dynamic Grid Squares:**
  - Complete implementation for 3-7 letter word support
  - GameBoard now dynamically adapts grid columns based on word length
  - Settings panel includes word length selection (3-7 letters)
  - Supabase queries filter by word_length with fallback logic
  - API route validates word length range (3-7)
  - Keyboard layout and spacing remain identical across all word lengths
- **Development Scripts:**
  - Added `dev:force` script for development workflow
  - Kills all existing Next.js processes and Node.js processes on ports 3000-3009
  - Forces server to start on port 3000
  - Includes 1-second delay for process termination
- **Reveal Word Functionality:**
  - Complete implementation allowing players to reveal the solution
  - Added to HelpModal with confirmation dialogs
  - Displays revealed solution below game board
  - Resets on new game
- **HelpModal Improvements:**
  - Replaced HowToPlayModal with better tabbed interface
  - "How to Play" tab: Game instructions and rules
  - "Need Help?" tab: Enhanced reveal word functionality with better UX
  - Better confirmation dialogs and user feedback
- **Navbar Updates:**
  - Changed "Help" button text to "Help & Hints"
  - Consistent emoji icons for all game actions
- **Modal UX Enhancements:**
  - Universal escape key support for all modals
  - Backdrop click-to-close functionality
  - Confirmation modals for destructive actions
  - Toast notifications for user feedback
- **Settings Panel Improvements:**
  - Apply button no longer forces game reset
  - Settings changes apply immediately without losing progress
  - Toast notification when settings are applied
  - Word length selection with immediate game restart when changed
- **Memory Leak Fixes:**
  - Optimized modal event listeners to prevent accumulation
  - Proper cleanup functions in useEffect hooks
- **Dependency Stability:**
  - Fixed @nodelib package version conflicts
  - Added cache management scripts to package.json
- **Navigation:**
  - Single ConditionalNavbar is used for all pages; no duplicate navbars.
  - Mobile menu no longer includes 'Back to Wisdom Deck'.
  - All game actions in the mobile and desktop navbars use emoji icons (🎮 New Game, 📊 Statistics, ⚙️ Settings, ❓ Help & Hints).
  - Desktop and mobile navbars are visually consistent and compact.
- **Hint Toggles:**
  - Tonal Accents, Part of Speech, and English Translation toggles are only accessible via the Settings modal (not in the navbar or as a separate bar).
  - Settings modal is the only place to toggle hint options for both desktop and mobile.
- **Game Layout:**
  - Ultra-compact layout: minimal spacing, keyboard always visible on mobile, consistent 4px spacing between header, grid, and keyboard.
  - Footer/logo is always visible, with a tiny logo on mobile and no copyright text.
- **Accessibility & UX:**
  - All navigation and toggles are accessible and touch-friendly.
  - No duplicate or unnecessary navigation elements remain.

---

This section should be kept up to date as further changes are made.
