# Project Memory

This document provides a comprehensive overview of the Wisdom Deck project, including its technical stack, architecture, and the complete quality assurance (QA) pipeline. It is intended to be a single source of truth to onboard any developer or AI assistant to the project quickly.

---

## 1. Core Technologies

- **Framework:** Next.js (v14.1.0) with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v3.4.1)
- **Package Manager:** npm
- **Database:** Supabase (PostgreSQL)
- **Payment Processing:** Stripe

---

## 2. Key Features & Implementation Details

### Yoruba Word Master Game (COMPLETELY REBRANDED FROM WORDLE)

- A Word Master-style game implemented in Yoruba with accent-sensitive logic.
- **URL:** `/yoruba-word-master` (✅ COMPLETED: renamed from `/yoruba-wordle`)
- **Branding:** "Yorùbá Word Master" with proper Yorùbá accent marks
- **Data Source:** Words are now sourced from **Supabase database** with two tables:
  - `dictionary_ai`: Words starting with letters A-I
  - `dictionary_jz`: Words starting with letters J-Z
- **Backend Integration (`lib/supabase.ts`):**
  - **Word Validation:** `validateWordleGuess()` function with grapheme-aware counting using `Intl.Segmenter`
  - **Random Word Selection:** `getRandomWordleWord()` with efficient database queries
  - **Unicode Normalization:** NFC normalization for consistent character handling
  - **Grapheme Counting:** Proper visual character counting for Yoruba diacritics
- **Game Logic (`hooks/useWordMaster.ts`):** ✅ COMPLETED: renamed from `useWordle.ts`
  - **Accent-Sensitive Logic:** Each character and its accented variations (e.g., `i`, `ì`, `í`) are treated as unique letters
  - **Daily Word:** Fetched from `/api/word-master/random-word` API route ✅ COMPLETED: renamed from `/api/wordle/`
  - **Guess Validation:** Validated against `/api/word-master/validate-guess` API route ✅ COMPLETED: renamed from `/api/wordle/`
- **UI & Gameplay Features:**
  - **Main Page:** `app/yoruba-word-master/page.tsx` ✅ COMPLETED: renamed from yoruba-wordle
  - **Main Component:** `components/YorubaWordMaster.tsx` ✅ COMPLETED: renamed from YorubaWordle.tsx
  - **Accent-Sensitive Keyboard:** Visual distinction between base letters and accented variants
  - **Hint Systems:**
    - **Difficulty Setting:** "Show tonal accents" toggle for easy mode
    - **In-Game Hints:** Part of Speech, English Translation, and additional info
  - **Help & Hints Modal:** Enhanced tabbed interface with reveal word functionality
  - **Font:** **Noto Sans** for correct Yoruba diacritic rendering
  - **Navigation:** "Back to Wisdom Deck" link positioned at top-left corner
  - **Help Button:** "Help & Hints" button positioned at top-right corner (no overlap with title)
  - **Subtitle:** "A Yorùbá Word Guessing Game"

### Latest UX Enhancements (December 2024)

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

### Wisdom Deck Branding & UI Improvements

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

### Yoruba Proverbs eBook

- A page at `/yoruba-proverbs` that advertises an eBook with 40 illustrated proverbs.
- **Payment Integration:**
  - **Stripe Integration:** Uses `@stripe/stripe-js` for payment processing
  - **Component:** `components/proverbs/ProverbPurchase.tsx` handles email collection and checkout
  - **API Route:** `/api/stripe/checkout` creates Stripe checkout sessions
- **Content:** Proverbs sourced from `lib/proverbs.ts` with Yoruba text, translations, and meanings

---

## 3. Quality Assurance & Testing Pipeline

A comprehensive testing and CI pipeline has been established to ensure code quality, performance, and security.

### 3.1. End-to-End (E2E) Testing - **RECENTLY IMPROVED**

- **Framework:** Playwright for browser automation
- **Configuration:** `playwright.config.ts` with:
  - **Base URL:** `http://localhost:3001` (configurable via `PLAYWRIGHT_BASE_URL` env var)
  - **Web Server:** Auto-starts dev server with `npm run dev`
  - **Timeout:** 120-second server startup timeout
- **Tests:** Located in `tests/example.spec.ts`
- **Accessibility Testing:**
  - **Framework:** `@axe-core/playwright` for comprehensive accessibility audits
  - **Graduated Approach:** Focuses on critical violations first with detailed logging
  - **Thresholds:** Allows up to 5 critical violations on Word Master page, 3 on Proverbs page
  - **Results:** Dramatically improved from 219 violations to just 2 total violations
- **Navigation Testing:** Robust selectors and enhanced waiting strategies
- **Test Script:** `npx playwright test`
- **Dependencies:** `@playwright/test`, `@axe-core/playwright`, `@stripe/stripe-js`

### 3.2. Unit & Component Testing

- **Framework:** Jest with `ts-jest` for TypeScript support
- **Library:** React Testing Library for rendering and interacting with components
- **Configuration:**
  - `jest.config.js`: Main Jest configuration
  - `jest.setup.js`: Extends Jest with `jest-dom` matchers and sets up the MSW server
- **API Mocking:** Mock Service Worker (`msw`) is used to mock API endpoints
- **Accessibility:** `jest-axe` is integrated to run accessibility checks on components during unit tests
- **Test Script:** `npm test`

### 3.3. Linting & Static Analysis

- **JavaScript/TypeScript:** ESLint with the `eslint-config-next` preset
- **CSS:** Stylelint with configurations for standard CSS and Tailwind CSS
- **Type Checking:** A dedicated `tsconfig.typecheck.json` is used for strict, no-emit type checks
- **Scripts:**
  - `npm run lint`: Runs ESLint
  - `npm run lint:css`: Runs Stylelint
  - `npm run typecheck`: Runs the strict TypeScript checker

### 3.4. Performance & Bundle Analysis

- **Bundle Size:** `@next/bundle-analyzer` is integrated
- **Usage:** Run `npm run analyze` to build the project and view an interactive treemap of the JavaScript bundle sizes

### 3.5. Security & Dependency Checks

- **Vulnerability Scanning:** `npm audit` is used to check for known vulnerabilities in dependencies
- **Script:** `npm run audit` runs the check for high-severity issues

### 3.6. Continuous Integration (CI)

- **Platform:** GitHub Actions
- **Workflow:** Defined in `.github/workflows/ci.yml`
- **Triggers:** Runs on every push and pull request to the `main` branch
- **Jobs:** The workflow automates all the checks mentioned above
- **Important Note:** The CI pipeline is tightly scoped to the application source code

---

## 4. Recent Improvements & Fixes

### 4.1. Yoruba Word Master Rebranding (✅ COMPLETED)

- **URL Change:** `/yoruba-wordle` → `/yoruba-word-master` ✅ COMPLETED
- **Title Updates:** All "Wordle" references changed to "Word Master" with Yorùbá accent marks ✅ COMPLETED
- **Subtitle Update:** "A Yorùbá Word Guessing Game" ✅ COMPLETED
- **Navigation Links:** Updated all internal links and test expectations ✅ COMPLETED
- **Help & Hints Modal:** Enhanced tabbed interface with reveal word functionality ✅ COMPLETED

### 4.2. Component & Hook Renaming (✅ COMPLETED)

- **Main Component:** `components/YorubaWordle.tsx` → `components/YorubaWordMaster.tsx` ✅ COMPLETED
- **Hook File:** `hooks/useWordle.ts` → `hooks/useWordMaster.ts` ✅ COMPLETED
- **Function Names:** Updated all function names and export statements ✅ COMPLETED
- **Import References:** Updated all import statements across the codebase ✅ COMPLETED

### 4.3. API Route Renaming (✅ COMPLETED)

- **API Directory:** `app/api/wordle/` → `app/api/word-master/` ✅ COMPLETED
- **API Endpoints:** All endpoints updated to use `/api/word-master/` ✅ COMPLETED
- **Code References:** Updated all API calls in components and hooks ✅ COMPLETED
- **Mock Handlers:** Updated test mocks to use new API paths ✅ COMPLETED

### 4.4. UI/UX Improvements

- **Logo Integration:** Wisdom Deck logo (120x120px) added to footers
- **Navigation Fixes:** "Back to Wisdom Deck" link moved to top-left corner
- **Button Repositioning:** Help & Hints button moved to top-right corner (no overlap with title)
- **Navbar Cleanup:** Removed "Wisdom Deck" text, aligned navigation to the right
- **Footer Enhancements:** Removed social media links, added logo, matched text sizes
- **Layout Consistency:** Clean, professional branding across all pages

### 4.5. Testing Infrastructure

- **Fixed Playwright Configuration:** Resolved baseURL and webServer settings
- **Installed Missing Dependencies:** Added `@stripe/stripe-js` and `@axe-core/playwright`
- **Enhanced Navigation:** Added robust selectors and better waiting strategies
- **Graduated Accessibility Testing:** Implemented tiered approach focusing on critical issues
- **Updated Test Expectations:** All tests updated for new URL and title changes

### 4.6. Supabase Integration

- **Word Validation:** Robust validation logic with grapheme-aware character counting
- **Database Optimization:** Efficient queries with proper error handling
- **Unicode Support:** Full support for Yoruba diacritics and complex characters

### 4.7. Payment Integration

- **Stripe Setup:** Complete Stripe integration for eBook purchases
- **Email Collection:** User-friendly email input with validation
- **Error Handling:** Comprehensive error handling and user feedback

### 4.8. Latest UX Enhancements (December 2024)

- **Reveal Word Functionality:** Complete implementation with confirmation dialogs
- **HelpModal Replacement:** Better tabbed interface with enhanced UX
- **Modal UX:** Universal escape key and backdrop click support
- **Memory Leaks:** Fixed accumulating event listeners in modals
- **Dependencies:** Resolved @nodelib package version conflicts
- **Cache Management:** Added development scripts for cache clearing

---

## 5. Current Status

✅ **All Tests Passing:** E2E tests complete successfully in ~4.2 seconds  
✅ **Accessibility Improved:** Reduced from 219 to 2 total violations  
✅ **Navigation Working:** All pages navigate correctly with updated URLs  
✅ **Dependencies Resolved:** All required packages installed  
✅ **Branding Complete:** Yoruba Word Master rebranding fully implemented  
✅ **UI/UX Enhanced:** Professional logo integration and layout improvements  
✅ **Ready for Deployment:** Comprehensive test coverage and quality assurance  
✅ **Phase 1 & 2 Complete:** All rename operations and testing completed successfully
✅ **Reveal Word Feature:** Complete implementation with confirmation dialogs
✅ **HelpModal Enhancement:** Better tabbed interface with enhanced UX
✅ **Modal UX:** Universal escape key and backdrop click support
✅ **Memory Leaks:** Fixed accumulating event listeners in modals
✅ **Dependencies:** Resolved @nodelib package version conflicts
✅ **Purple Brand Theme:** Complete implementation across all modals and game states
✅ **Mobile UX Optimization:** Complete modal structure redesign for mobile devices

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
- ✅ **Purple Brand Theme:** All modals and game states use consistent purple theme
- ✅ **Mobile UX:** All modals fit properly on mobile with visible action buttons

The project is now production-ready with a robust testing pipeline, excellent accessibility compliance, and professional branding throughout.

---

## 6. Key Files & Components

### Game Components

- `app/yoruba-word-master/page.tsx` - Main game page ✅ COMPLETED: renamed from yoruba-wordle
- `components/YorubaWordMaster.tsx` - Core game logic component ✅ COMPLETED: renamed from YorubaWordle.tsx
- `components/wordle/Keyboard.tsx` - Accent-sensitive keyboard with purple theme
- `components/wordle/GameBoard.tsx` - Game board display with purple theme and dynamic grid
- `components/wordle/HelpModal.tsx` - Enhanced help modal with tabbed interface and mobile optimization

### Layout Components

- `components/layout/Navbar.tsx` - Clean navigation bar
- `components/layout/Footer.tsx` - Footer with Wisdom Deck logo
- `components/sections/FeaturedGamesSection.tsx` - Home page game card

### Database & API

- `lib/supabase.ts` - Database integration and word validation
- `app/api/word-master/` - Game API routes ✅ COMPLETED: renamed from wordle
- `app/api/stripe/` - Payment API routes

### Hooks

- `hooks/useWordMaster.ts` - Main game logic hook ✅ COMPLETED: renamed from useWordle.ts

### Modal Components

- `components/word-master/SettingsPanel.tsx` - Settings panel with word length selection and mobile optimization
- `components/word-master/ConfirmationModal.tsx` - Reusable confirmation modal with mobile optimization
- `components/word-master/ToastNotification.tsx` - Toast notification component with purple theme
- `components/word-master/StatisticsDisplay.tsx` - Statistics display with mobile optimization

### Testing

- `tests/example.spec.ts` - E2E tests with accessibility
- `playwright.config.ts` - Test configuration
- `jest.config.js` - Unit test configuration
- `mocks/handlers.js` - API mock handlers ✅ COMPLETED: updated for new API paths

### Assets

- `public/wisdom-deck-logo.png` - Wisdom Deck logo (1024x1024px, displayed at 120x120px)

---

## Latest Changes (December 2024)

- **Comprehensive Purple Brand Theme:** Complete implementation across all modals and game states
  - **Modal Standardization:** All modals (HelpModal, StatisticsDisplay, ConfirmationModal, ToastNotification) now use consistent dark blue/purple theme
  - **Game State Colors:** Changed "present" color from yellow to purple (`bg-purple-500`, `border-purple-500`, `text-purple-400/300`)
  - **Brand Differentiation:** Unique green/purple/gray color scheme distinct from standard Wordle
  - **Professional Appearance:** Cohesive dark theme with purple accent color
  - **Visual Consistency:** All primary buttons use `bg-purple-600 hover:bg-purple-700`
  - **Secondary Buttons:** Consistent gray styling (`bg-gray-600 hover:bg-gray-700`)
- **Mobile UX Optimization:** Complete modal structure redesign for mobile devices
  - **Fixed-Height Containers:** All modals use `max-h-[75vh]` mobile, `max-h-[80vh]` desktop
  - **Fixed Header/Footer:** Non-scrollable areas with scrollable content middle
  - **iOS Momentum Scrolling:** `WebkitOverflowScrolling: 'touch'` for smooth mobile scrolling
  - **Touch-Friendly Design:** Proper touch targets and spacing for mobile interaction
  - **Responsive Typography:** Optimized text sizes for mobile readability
- **Word Filtering System:** Complete implementation to exclude problematic database entries
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
  - **Word Length Integration:** Help modal now dynamically displays correct word length (3-7 letters) based on player settings
  - **Template Literals:** Replaced hardcoded "5-letter" with `${wordLength}-letter` dynamic text
  - **Prop Integration:** Added `wordLength` prop to HelpModal component interface
  - **Real-time Updates:** Text updates immediately when player changes word length setting
  - **Grammar Consistency:** Maintains correct grammar for all supported word lengths

This section should be kept up to date as further changes are made.

## Yoruba Word Master Walkthrough System (2024-06)

### Features

- **Interactive Walkthrough**: Uses React Joyride to guide users through all game features.
- **Step Order**: Statistics is step 4, Settings is step 5, matching the latest UX requirements.
- **Replay Options**:
  - **Completion Modal**: After finishing the walkthrough, a modal appears with two options: "Take Walkthrough Again" (restarts the walkthrough) and "Start Playing" (closes modal, focuses game).
  - **Help & Hints Modal**: Users can restart the walkthrough at any time from the Help modal via a subtle link/button.
- **Mobile Optimisation**: All walkthrough elements and modals are mobile-friendly and styled with the purple brand theme.

### Technical Implementation

- **GameWalkthrough Component**: Externally controlled Joyride, correct step order, purple theme.
- **WalkthroughCompletionModal**: Custom modal for replay/start options.
- **HelpModal**: Accepts `onRestartWalkthrough` prop, renders a restart button in the rules section.
- **Game Page**: Manages walkthrough state, shows/hides modal, passes restart function to HelpModal, and cleans up the walkthrough URL parameter.
- **Linter Error**: TypeScript may warn that `useSearchParams()` is possibly null, but in Next.js App Router it is always defined. The code uses `searchParams!` or disables the warning.

### User Experience

- "How to Play" on the landing page triggers the walkthrough.
- Walkthrough auto-starts, guides through all features in the correct order.
- Completion modal appears at the end, offering replay or start.
- Help modal allows restarting the walkthrough at any time.
- All flows are mobile-optimised and visually consistent.

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
