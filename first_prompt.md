# Wisdom Deck Project - First Prompt for AI Assistant

## 1. Project Overview & Core Technologies

**Project Name:** Wisdom Deck (wisdomdeck.online)  
**Core Mission:** A web platform celebrating Yoruba language and culture through interactive games and educational content.

**Primary Features:**

- **Yoruba Word Master Game:** A Word Master-style game using 2-7 letter Yoruba words with accent-sensitive mechanics, difficulty categorization, and Supabase database integration (✅ COMPLETELY REBRANDED from "Wordle")
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
- **Features:** Accent-sensitive keyboard, "Help & Hints" modal, hint systems, Unicode normalization, difficulty categorization, progressive hints, multiple spellings support
- **Component:** `components/YorubaWordMaster.tsx` (✅ COMPLETED: renamed from YorubaWordle.tsx)
- **Hook:** `hooks/useWordMaster.ts` (✅ COMPLETED: renamed from useWordle.ts)
- **UI Improvements:**
  - "Back to Wisdom Deck" link positioned at top-left corner
  - Help & Hints button positioned at top-right corner (no overlap with title)
  - Wisdom Deck logo (120x120px) in footer
  - Clean, professional layout with proper contrast
  - Interactive walkthrough system with React Joyride
  - Progressive hint system with random letter reveal and tonal accent guidance

### Latest UX Enhancements (December 2024 - January 2025)

- **✅ Comprehensive Purple Brand Theme:** Complete implementation across all modals and game states
  - **Modal Standardization:** All modals (HelpModal, StatisticsDisplay, ConfirmationModal, ToastNotification) now use consistent dark blue/purple theme
  - **Game State Colors:** Changed "present" color from yellow to purple (`bg-purple-500`, `border-purple-500`, `text-purple-400/300`)
  - **Brand Differentiation:** Unique green/purple/gray color scheme distinct from standard Wordle
  - **Professional Appearance:** Cohesive dark theme with purple accent color
  - **Visual Consistency:** All primary buttons use `bg-purple-600 hover:bg-purple-700`
  - **Secondary Buttons:** Consistent gray styling (`bg-gray-600 hover:bg-gray-700`)
- **✅ Mobile UX Optimization:** Complete modal structure redesign for mobile devices
  - **Fixed-Height Containers:** All modals use `max-h-[75vh]` mobile, `max-h-[80vh]` desktop
  - **Fixed Header/Footer:** Title and action buttons always visible
  - **Scrollable Content:** Main content with `overflow-y-auto` and iOS momentum scrolling
  - **Touch-Friendly:** Proper touch targets and smooth scrolling behavior
  - **Professional Feel:** Native mobile app-like experience
  - **Consistent Sizing:** All modals follow same height constraints
  - **No Hidden Buttons:** Action buttons always accessible on mobile
- **✅ Dynamic Grid Squares:** Complete implementation for 2-7 letter word support
  - GameBoard now dynamically adapts grid columns based on word length
  - Settings panel includes word length selection (2-7 letters)
  - Supabase queries filter by word_length with fallback logic
  - API route validates word length range (2-7)
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
  - "Reveal Word" tab: Enhanced reveal word functionality with better UX
  - "Restart Walkthrough" tab: New dedicated tab for walkthrough restart
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
  - Difficulty selector with Easy/Intermediate options (Advanced removed)
- **✅ Memory Leak Fixes:** Optimized modal event listeners to prevent accumulation
- **✅ Dependency Stability:** Fixed @nodelib package version conflicts
- **✅ Cache Management:** Added development scripts for cache clearing
- **✅ Difficulty Categorization System:** Complete manual control system
  - Database migration adding `difficulty_level` column to both dictionary tables
  - Manual difficulty assignment with SQL templates for user control
  - Strict filtering by difficulty level (no NULL fallback)
  - Easy/Intermediate difficulty options (Advanced removed)
  - Default difficulty set to 'easy' for new users
- **✅ Interactive Walkthrough System:** React Joyride implementation
  - Statistics as step 4, Settings as step 5
  - Completion modal with replay options
  - Help & Hints modal integration for walkthrough restart
  - Mobile-optimized with purple brand theme
  - Client-side rendering to prevent hydration errors
- **✅ Progressive Hint System:** Enhanced user guidance
  - Random letter reveal modal after incorrect guesses (once per game)
  - Tonal accent guidance modal for accent mismatches
  - Enhanced dictionary validation messaging
  - Blue highlighting and pulse animation for revealed letters
- **✅ Multiple Spellings Support:** Robust system for linguistic accuracy
  - `parseWordVariants()` function to extract multiple spellings from database
  - Game logic accepts any valid variant as correct
  - UI displays all accepted spellings in game end modal
  - API routes include variants in responses
  - TypeScript interfaces updated to support variants array
- **✅ Default Hints for New Users:** Improved onboarding
  - English Translation and Part of Speech hints enabled by default
  - Tonal Accents remain off by default
  - Backward compatibility for existing users via localStorage
- **✅ Keyboard Size Improvements:** Enhanced mobile touch experience
  - Increased key dimensions (`h-12 sm:h-16`)
  - Larger text size (`text-sm sm:text-xl`)
  - Better spacing (`p-1 sm:p-2`, `gap-1 sm:gap-1.5`, `mb-1 sm:mb-3`)
  - Touch target compliance (48px height achieved)
- **✅ Word Filtering System:** Clean gameplay experience
  - Excludes words with hyphens and spaces from game selection
  - `isValidGameWord()` helper function for validation
  - Retry logic with up to 10 attempts
  - Console logging for debugging filtered words
- **✅ Dynamic Help Text:** Real-time word length display
  - Help modal dynamically shows correct word length (2-7 letters)
  - Template literals replace hardcoded text
  - Real-time updates when word length changes
- **✅ Case-Insensitive URL Routing:** Comprehensive middleware
  - Handles URL variations like `/Yoruba-word-master`, `/YORUBA-WORD-MASTER`
  - Uses 307 Temporary Redirects for SEO friendliness
  - Ensures users reach the game regardless of URL case

### Difficulty Settings Update (June 2024)

- The SettingsPanel now uses radio buttons for three difficulty levels: Easy, Intermediate, and Advanced.
  - Easy and Intermediate are fully selectable.
  - Advanced is visually present but locked/greyed out, with a "Coming Soon" badge.
- The default difficulty is Easy for all new users and for any invalid or "advanced" value.
- Migration logic ensures that any existing user with "advanced" as their saved difficulty is automatically set to "easy".
- The backend (API and Supabase logic) only allows "easy" or "intermediate" as valid values; any other value defaults to "easy".
- All API, migration, TypeScript, and UI logic have been tested and confirmed to work as expected.
- The Advanced level is visually present for future expansion but is not selectable.
- All tests (API, migration, TypeScript, UI) have passed for this feature.

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
- **Multiple Spellings:** Support for multiple accepted spellings for the same Yorùbá word concept
- **Difficulty Categorization:** Manual difficulty assignment system with Easy/Intermediate options

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
- **✅ Difficulty Categorization System:** Complete manual control system with Easy/Intermediate options
- **✅ Interactive Walkthrough:** React Joyride implementation with Statistics step 4, Settings step 5
- **✅ Progressive Hint System:** Random letter reveal and tonal accent guidance
- **✅ Multiple Spellings Support:** Robust system for linguistic accuracy
- **✅ Default Hints for New Users:** Improved onboarding with enabled hints by default
- **✅ Keyboard Size Improvements:** Enhanced mobile touch experience with larger keys
- **✅ Word Filtering System:** Clean gameplay experience excluding problematic words
- **✅ Dynamic Help Text:** Real-time word length display in help modal
- **✅ Case-Insensitive URL Routing:** Comprehensive middleware implementation

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
- **✅ COMPLETED:** Dynamic grid squares for 2-7 letter word support
- **✅ COMPLETED:** Development workflow improvements with dev:force script
- **✅ COMPLETED:** Comprehensive purple brand theme implementation
- **✅ COMPLETED:** Mobile UX optimization with consistent modal structure
- **✅ COMPLETED:** Difficulty categorization system with manual control
- **✅ COMPLETED:** Interactive walkthrough system with React Joyride
- **✅ COMPLETED:** Progressive hint system with random letter reveal and tonal guidance
- **✅ COMPLETED:** Multiple spellings support for linguistic accuracy
- **✅ COMPLETED:** Default hints for new users with improved onboarding
- **✅ COMPLETED:** Keyboard size improvements for enhanced mobile touch experience
- **✅ COMPLETED:** Word filtering system for clean gameplay
- **✅ COMPLETED:** Dynamic help text with real-time word length display
- **✅ COMPLETED:** Case-insensitive URL routing with comprehensive middleware

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
- ✅ **Dynamic Grid:** Grid adapts to 2-7 letter words correctly
- ✅ **Word Length Selection:** Settings panel word length selection works
- ✅ **Dev Force Script:** Successfully kills processes and starts on port 3000
- ✅ **Purple Brand Theme:** All modals and game states use consistent purple theme
- ✅ **Mobile UX:** All modals fit properly on mobile with visible action buttons
- ✅ **Difficulty System:** Easy/Intermediate difficulty options working correctly
- ✅ **Walkthrough System:** Interactive walkthrough with proper step order
- ✅ **Progressive Hints:** Random letter reveal and tonal accent guidance working
- ✅ **Multiple Spellings:** Support for multiple accepted spellings working correctly
- ✅ **Word Length Support:** 2-7 letter words with dynamic grid adaptation
- ✅ **Word Filtering:** Clean gameplay excluding problematic words

**Key Files:**

- `lib/supabase.ts` - Core database integration, word validation, and multiple spellings support
- `components/YorubaWordMaster.tsx` - Main game component (✅ COMPLETED: renamed from YorubaWordle.tsx)
- `hooks/useWordMaster.ts` - Main game logic hook (✅ COMPLETED: renamed from useWordle.ts)
- `app/yoruba-word-master/page.tsx` - Game page (✅ COMPLETED: renamed from yoruba-wordle)
- `app/api/word-master/` - Game API routes (✅ COMPLETED: renamed from wordle)
- `app/api/stripe/` - Payment API routes
- `components/layout/Footer.tsx` - Footer with Wisdom Deck logo
- `components/layout/Navbar.tsx` - Clean navigation bar
- `components/wordle/HelpModal.tsx` - Enhanced help modal with tabbed interface, mobile optimization, and walkthrough restart
- `components/word-master/ConfirmationModal.tsx` - Reusable confirmation modal with mobile optimization
- `components/word-master/ToastNotification.tsx` - Toast notification component with purple theme
- `components/wordle/GameBoard.tsx` - Dynamic grid component with word length support and purple theme
- `components/word-master/SettingsPanel.tsx` - Settings panel with word length selection, difficulty options, and mobile optimization
- `components/wordle/Keyboard.tsx` - Keyboard component with purple theme and enhanced mobile touch experience
- `components/wordle/GameEndModal.tsx` - Game end modal with multiple spellings display and proper overlay
- `components/wordle/LetterRevealModal.tsx` - Modal for random letter reveal hint system
- `components/wordle/AccentGuidanceModal.tsx` - Modal for tonal accent guidance
- `components/walkthrough/GameWalkthrough.tsx` - React Joyride component with purple theme and mobile optimization
- `components/walkthrough/WalkthroughCompletionModal.tsx` - Completion modal with replay options
- `components/layout/ConditionalNavbar.tsx` - Conditional navigation based on current page
- `database/migrations/add_difficulty_levels.sql` - Database migration for difficulty levels
- `database/reset_difficulty_levels.sql` - SQL script for resetting difficulty levels
- `scripts/categorize-words.ts` - Node.js script for batch word categorization
- `hooks/usePreferences.ts` - User preferences management with localStorage
- `types/wordle.ts` - TypeScript interfaces for game data including multiple spellings support
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
14. **✅ COMPLETED:** Dynamic grid squares for 2-7 letter word support
15. **✅ COMPLETED:** Development workflow improvements with dev:force script
16. **✅ COMPLETED:** Comprehensive purple brand theme implementation
17. **✅ COMPLETED:** Mobile UX optimization with consistent modal structure
18. **✅ COMPLETED:** Difficulty categorization system with manual control
19. **✅ COMPLETED:** Interactive walkthrough system with React Joyride
20. **✅ COMPLETED:** Progressive hint system with random letter reveal and tonal guidance
21. **✅ COMPLETED:** Multiple spellings support for linguistic accuracy
22. **✅ COMPLETED:** Default hints for new users with improved onboarding
23. **✅ COMPLETED:** Keyboard size improvements for enhanced mobile touch experience
24. **✅ COMPLETED:** Word filtering system for clean gameplay
25. **✅ COMPLETED:** Dynamic help text with real-time word length display
26. **✅ COMPLETED:** Case-insensitive URL routing with comprehensive middleware

The project is now fully functional and deployed with professional branding throughout. All Phase 1 & 2 changes have been completed successfully, including comprehensive testing. Any new development should maintain the high quality standards and comprehensive testing approach that has been established.

---

## Latest Changes (December 2024 - January 2025)

- **Comprehensive Purple Brand Theme:**
  - **Modal Standardization:** All modals (HelpModal, StatisticsDisplay, ConfirmationModal, ToastNotification) now use consistent dark blue/purple theme
  - **Game State Colors:** Changed "present" color from yellow to purple (`bg-purple-500`, `border-purple-500`, `text-purple-400/300`)
  - **Brand Differentiation:** Unique green/purple/gray color scheme distinct from standard Wordle
  - **Professional Appearance:** Cohesive dark theme with purple accent color
  - **Visual Consistency:** All primary buttons use `bg-purple-600 hover:bg-purple-700`
  - **Secondary Buttons:** Consistent gray styling (`bg-gray-600 hover:bg-gray-700`)
- **Mobile UX Optimization:**
  - **Fixed-Height Containers:** All modals use `max-h-[75vh]` mobile, `max-h-[80vh]` desktop
  - **Fixed Header/Footer:** Non-scrollable areas with scrollable content middle
  - **iOS Momentum Scrolling:** `WebkitOverflowScrolling: 'touch'` for smooth mobile scrolling
  - **Touch-Friendly Design:** Proper touch targets and spacing for mobile interaction
  - **Responsive Typography:** Optimized text sizes for mobile readability
- **Difficulty Categorization System:** Complete manual control system
  - **Database Migration:** Added `difficulty_level` column to both dictionary tables
  - **Manual Assignment:** SQL templates for user control of difficulty levels
  - **Strict Filtering:** Only fetch words where `difficulty_level` is explicitly set
  - **Easy/Intermediate Options:** Advanced level removed, default to 'easy' for new users
  - **Settings Integration:** Difficulty selector in settings panel
- **Interactive Walkthrough System:** React Joyride implementation
  - **Step Order:** Statistics as step 4, Settings as step 5
  - **Completion Modal:** Custom modal with replay and start options
  - **Help Integration:** Restart walkthrough from Help & Hints modal
  - **Mobile Optimization:** Purple theme and mobile-friendly design
  - **Client-Side Rendering:** Prevents hydration errors
- **Progressive Hint System:** Enhanced user guidance
  - **Random Letter Reveal:** Modal appears after incorrect guesses (once per game)
  - **Tonal Accent Guidance:** Modal for accent mismatches with helpful tips
  - **Enhanced Messaging:** "Word not found in dictionary - it doesn't exist" for non-Yorùbá words
  - **Visual Feedback:** Blue highlighting and pulse animation for revealed letters
- **Multiple Spellings Support:** Robust system for linguistic accuracy
  - **Parsing Function:** `parseWordVariants()` extracts multiple spellings from database
  - **Game Logic:** Accepts any valid variant as correct
  - **UI Display:** Shows all accepted spellings in game end modal
  - **API Integration:** Includes variants in API responses
  - **Type Safety:** Updated TypeScript interfaces for variants array
- **Word Filtering System:** Clean gameplay experience
  - **Clean Game Experience:** Filter out words with hyphens (-) and spaces from word selection pool
  - **Helper Function:** Added `isValidGameWord()` to validate word format
  - **Retry Mechanism:** Up to 10 attempts to find valid words with automatic retry logic
  - **Console Logging:** Debug information for filtered words
  - **Professional Gameplay:** Eliminates confusing multi-word entries and hyphenated words
- **Keyboard Size Improvements:** Enhanced mobile touch experience with larger keys
  - **Mobile Touch Enhancement:** Increased key height from `h-8 sm:h-14` to `h-12 sm:h-16` (50% larger on mobile, 14% larger on desktop)
  - **Text Size Upgrade:** Enhanced from `text-xs sm:text-lg` to `text-sm sm:text-xl` for better readability
  - **Padding Enhancement:** Improved from `p-0.5 sm:p-1` to `p-1 sm:p-2` for better touch targets
  - **Spacing Improvements:** Better row spacing (`mb-1 sm:mb-3`) and key spacing (`gap-1 sm:gap-1.5`)
  - **Variant Popup Scaling:** Scaled up from `w-12 h-12 text-2xl` to `w-14 h-14 text-3xl` for consistency
  - **Touch Target Compliance:** Meets minimum 44px touch target requirements (48px achieved)
- **Case-Insensitive URL Routing:** Comprehensive middleware implementation
  - **Middleware Implementation:** Added `middleware.ts` for comprehensive case-insensitive routing
  - **URL Variations:** `/Yoruba-word-master`, `/YORUBA-WORD-MASTER`, `/Yoruba-Wordle` all redirect to `/yoruba-word-master`
  - **SEO Friendly:** Uses 307 Temporary Redirects to maintain search engine rankings
  - **User Experience:** Users reach the game regardless of URL case variations
- **Dynamic Help Text:** Real-time word length display in help modal
  - **Word Length Integration:** Help modal now dynamically displays correct word length (2-7 letters) based on player settings
  - **Template Literals:** Replaced hardcoded "5-letter" with `${wordLength}-letter` dynamic text
  - **Prop Integration:** Added `wordLength` prop to HelpModal component interface
  - **Real-time Updates:** Text updates immediately when player changes word length setting
  - **Grammar Consistency:** Maintains correct grammar for all supported word lengths
- **Default Hints for New Users:** Improved onboarding
  - **Default Settings Change:** New users start with English Translation and Part of Speech hints enabled by default
  - **Tonal Accents:** Remain off by default to maintain challenge
  - **Persistence:** Existing users keep their preferences via localStorage
  - **Onboarding Benefits:** Makes the game more educational and accessible for beginners
- **Word Length Support Expansion:** Extended from 3-7 to 2-7 letters
  - **2-Letter Support:** Added support for 2-letter words with dynamic grid adaptation
  - **Settings Panel:** Updated word length selector to include 2-letter option
  - **API Validation:** Updated to accept 2-7 letter range
  - **Grid Adaptation:** GameBoard dynamically adjusts columns for 2-letter words
- **React Hooks Error Fixes:** Resolved "Rendered more hooks than during the previous render" errors
  - **GameEndModal:** Moved all hooks to top level before early returns
  - **Component Structure:** Ensured hooks are called unconditionally
  - **State Management:** Proper hook ordering and dependency arrays
- **Modal Overlay Improvements:** Enhanced visual presentation
  - **Full-Screen Backdrop:** Proper dark overlay with blur effect
  - **Centering:** Modal properly centered on all screen sizes
  - **Z-Index Management:** Proper layering to prevent overlap with keyboard
  - **Mobile Responsiveness:** Optimized for mobile devices
- **Dictionary Validation Enhancements:** Improved user feedback
  - **Accent Mismatch Detection:** Distinguishes between accent errors and non-existent words
  - **Specific Messaging:** "Word not found in dictionary - it doesn't exist" for non-Yorùbá words
  - **Tonal Guidance:** Helpful tips for accent-related errors
  - **Error Duration:** Messages display for 2 seconds then disappear

This section should be kept up to date as further changes are made.

## Difficulty Categorization System (2024-06)

### Features

- **Manual Control System**: Complete manual assignment of difficulty levels to database words.
- **Database Migration**: Added `difficulty_level` column to both `dictionary_ai` and `dictionary_jz` tables.
- **Difficulty Options**: Easy and Intermediate levels (Advanced removed for better user experience).
- **Strict Filtering**: Only fetch words where `difficulty_level` is explicitly set (no NULL fallback).
- **Default Settings**: New users default to 'easy' difficulty, existing users preserve preferences.
- **Settings Integration**: Difficulty selector in settings panel with descriptive labels.

### Technical Implementation

- **Database Scripts**: SQL templates for manual difficulty assignment.
- **Word Fetching Logic**: Updated `getRandomWordMasterWord()` to filter by difficulty level.
- **API Integration**: Updated `/api/word-master/random-word` to accept difficulty parameter.
- **Settings Panel**: Updated difficulty selector with Easy/Intermediate options.
- **Fallback Logic**: Implemented fallback if no words found for specific difficulty/length combination.
- **Error Handling**: Comprehensive error handling for empty word sets.

### User Experience

- Users can select Easy or Intermediate difficulty in settings.
- Easy focuses on everyday vocabulary and basic concepts.
- Intermediate includes cultural terms and moderate complexity.
- Settings are preserved across sessions via localStorage.
- Game immediately reflects difficulty changes.

## Multiple Spellings Support (2024-06)

### Features

- **Linguistic Accuracy**: Support for multiple accepted spellings for the same Yorùbá word concept.
- **Database Parsing**: Extracts variants from comma-separated database entries (e.g., "Ehin, Eyin").
- **Game Logic**: Accepts any valid variant as correct for win condition.
- **UI Display**: Shows all accepted spellings in game end modal.
- **API Integration**: Includes variants array in API responses.

### Technical Implementation

- **Parsing Function**: `parseWordVariants()` extracts multiple spellings from database strings.
- **Word Selection**: Updated `getRandomWordMasterWord()` to return all valid variants.
- **Validation Logic**: Updated `validateWordleGuess()` to check against all variants.
- **Game State**: Added `solutionVariants` state to track all accepted spellings.
- **Type Safety**: Updated `WordleWord` interface to include `variants` array.
- **UI Components**: Updated `GameEndModal` to display "Also accepted" variants.

### User Experience

- Players can win by guessing any accepted spelling variant.
- Game end modal shows all accepted spellings for educational value.
- Maintains linguistic accuracy while improving user experience.
- Supports complex Yorùbá word variations and regional differences.

## Default Hints for New Users (2024-06)

- **Default Settings Change:**
  - New users now start with English Translation and Part of Speech hints enabled by default.
  - Tonal Accents remain off by default.
  - These settings are stored in localStorage, so existing users keep their preferences.
- **Onboarding & Accessibility:**
  - Improves onboarding for new users and makes the game more educational and accessible.
  - Users can still toggle hints on/off in the settings panel.
- **Persistence:**
  - If a user has previously saved preferences, those are respected.
  - Only first-time users (no localStorage) get the new defaults.
- **Deployment Note:**
  - If users experience loading issues after deployment, clearing site data (localStorage, cookies, cache) resolves most problems.

## Yoruba Word Master Walkthrough (2024-06)

### Key Features

- **Interactive Walkthrough**: Guides users through all major game features using React Joyride.
- **Step Order**: Statistics is step 4, Settings is step 5, as per latest UX requirements.
- **Replay/Restart Options**:
  - **Completion Modal**: After walkthrough, users see a modal with "Take Walkthrough Again" and "Start Playing" options.
  - **Help & Hints Modal**: Users can restart the walkthrough from the Help modal at any time.
- **Mobile-First Design**: All walkthrough and modal elements are mobile-optimised and use the purple brand theme.

### Technical Details

- **GameWalkthrough**: Externally controlled Joyride, correct step order, purple theme.
- **WalkthroughCompletionModal**: Custom modal for replay/start.
- **HelpModal**: Accepts `onRestartWalkthrough` prop, renders a restart button in the rules section.
- **Game Page**: Manages walkthrough state, shows/hides modal, passes restart function to HelpModal, and cleans up the walkthrough URL parameter.
- **Linter Error**: TypeScript may warn that `useSearchParams()` is possibly null, but in Next.js App Router it is always defined. The code uses `searchParams!` or disables the warning.

### User Flow

- "How to Play" on the landing page triggers the walkthrough.
- Walkthrough auto-starts, correct step order.
- Completion modal appears at the end, offering replay or start.
- Help modal allows restarting the walkthrough at any time.
- All flows are mobile-optimised and visually consistent.
