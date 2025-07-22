# Project Tasks: Wisdom Deck Website

## Phase 1: Initial Website Development (Completed)

1.  **[x] Core Page Structure:**
    - [x] Set up Next.js project.
    - [x] Created `Navbar`, `HeroSection`, `FeaturedProductsSection`, and `Footer` components.
    - [x] Assembled the main page layout.
2.  **[x] Content Integration:**
    - [x] Added `Yoruba Proverbs` PDF for download.
    - [x] Replaced PDF download with a book cover image.
    - [x] Updated headings and text content.
3.  **[x] Local Environment:**
    - [x] Set up and ran the local development server.
    - [x] Created `dev:force` script to ensure a clean server restart.

---

## Phase 2: "Yoruba Proverbs" Book Page

4.  **[x] Create the Product Page (`/yoruba-proverbs`):**
    - [x] Create directory: `wisdom-deck-app/app/yoruba-proverbs/`
    - [x] Create page file: `wisdom-deck-app/app/yoruba-proverbs/page.tsx`
5.  **[x] Link from Homepage:**
    - [x] Make the book image/card on the homepage clickable, linking to the new page.
6.  **[x] Build the Page Layout:**
    - [x] Add the book cover image.
    - [x] Add a detailed description of the book.
    - [x] Create and style a "Buy Now" button.
7.  **[x] Display Proverbs Content:**
    - [x] Parse the `yoruba_proverbs.md` file to extract proverbs data.
    - [x] Render the list of proverbs, translations, and meanings on the page.
8.  **[x] Add Audio Placeholders:**
    - [x] For each proverb, add a UI placeholder for a future audio player.
9.  **[x] Stripe Integration:**
    - [x] **(User Task)** In Stripe, create a product and a "Payment Link".
    - [x] Connect the "Buy Now" button to the Stripe Payment Link.

---

## Phase 3: Vercel Deployment

10. **[x] Git Setup:**
    - [x] Initialize Git repository: `git init`
    - [x] Create or review `.gitignore` file.
    - [x] Make initial commit.
11. **[x] Vercel Account & CLI:**
    - [x] Sign up or log in at vercel.com.
    - [ ] (Optional) Install and login via Vercel CLI.
12. **[x] Push to Remote Git Repository:**
    - [x] Create a new repository on GitHub.
    - [x] Add the remote to your local repository.
    - [x] Push your local branch.
13. **[x] Deploy Project to Vercel:**
    - [x] Import Git repository from the Vercel Dashboard.
    - [x] Configure and deploy.
14. **[x] Verify Vercel Deployment:**
    - [x] Access and test the site using the Vercel-provided URL.

---

## Phase 4: Cloudflare Integration & Custom Domain

15. **Add Your Domain to Cloudflare:**
    - [x] Sign up or log in at cloudflare.com.
    - [x] Add your custom domain.
16. **Update Nameservers at Your Registrar:**
    - [x] Replace your current nameservers with the ones provided by Cloudflare.
17. **Configure DNS Records:**
    - [x] Add your custom domain to your Vercel project.
    - [x] Add the required `A` and `CNAME` records in Cloudflare.
18. **Verify and Finalize:**
    - [x] Verify the domain in Vercel. (In Progress)
    - [x] Set SSL/TLS mode to **"Full (strict)"** in Cloudflare.

---

## Phase 5: Ongoing Maintenance & Enhancements

19. **SEO Optimization:**
    - [ ] Add meta descriptions, structured data, `sitemap.xml`, and `robots.txt`.
20. **Analytics:**
    - [ ] Integrate Vercel Analytics and/or Google Analytics.
21. **Performance and Security:**
    - [ ] Monitor site performance.
    - [ ] Configure basic security rules in Cloudflare.
22. **Maintenance:**
    - [ ] Keep dependencies updated.
    - [ ] Regularly review analytics and performance metrics.

---

## Phase 6: Yoruba Wordle Game ("Odè Ọrọ" - Word Hunter)

23. **Game Design & Asset Creation:**

    - [ ] Finalize the game's name and branding.
    - [x] Curate and create a comprehensive list of 5-letter Yoruba words.
    - [ ] Design the UI/UX for the game page, including the grid, keyboard, and modals.

24. **Backend Setup (using Serverless Functions):**

    - [x] Create a `words.json` file in the project containing the list of all valid guessable words.
    - [x] Create a `yoruba-dictionary.json` file with all valid words for guess checking.
    - [x] Create a serverless function (`/api/wordle/daily-word`) that selects a secret word for the day. This prevents users from easily finding the answer in the frontend code.
    - [x] Create a serverless function (`/api/wordle/validate-guess`) that checks if a submitted word exists in the `words.json` list.

25. **Frontend Development (in Next.js):**

    - [x] Create the new game page route at `/yoruba-wordle`.
    - [x] Build the `GameBoard` component (a 6x5 grid to display guesses).
    - [x] Build the interactive `Keyboard` component.
    - [x] Implement client-side state management to handle current guesses, guess history, and letter status (correct, present, absent).
    - [x] Handle user input from both physical and on-screen keyboards.
    - [x] Connect the frontend to the backend APIs for word validation and fetching the daily word.
    - [x] Implement the logic to color the `GameBoard` cells and `Keyboard` keys based on guess feedback.
    - [x] Create modals or toasts for notifications (e.g., "You Won!", "Not in word list", "You Lost!").

26. **Integration & Final Touches:**
    - [x] Add a prominent link to the game from the main website navigation or homepage.
    - [x] Implement a "Share" feature that allows users to copy their results to the clipboard.
    - [x] Add a simple "How to Play" instructions modal.
    - [ ] Conduct thorough testing across different devices and browsers.

_This task list provides a focused guide for the current project goals._

---

## Yoruba Wordle Game Enhancements

27. **[x] Data Source Integration:**

    - [x] Implement a script or function to parse the `public/yoruba_words.md` file.
    - [x] Extract "Yoruba Word", "Part of Speech", "English Translation", and "Additional Information" from the Markdown file.
    - [x] Refactor the game logic to use this new data source for selecting the secret word, replacing the existing `json` file-based logic.

28. **[x] Core Gameplay Update:**

    - [x] Ensure the game correctly selects a word and its associated data from the parsed Markdown content.
    - [x] Verify that the word-guessing and validation logic functions as expected with the new word set.

29. **[x] UI - Enhanced Visuals:**

    - [x] Confirm that all Yoruba diacritics (accents above and below letters) are rendered correctly and clearly by default in all relevant UI components (game board, keyboard, etc.).
    - [x] Update CSS or font families if necessary to ensure proper character display.

30. **[x] UI - Hint System Implementation:**

    - [x] Design and add UI controls (e.g., toggle switches or buttons) to the game interface.
    - [x] Create three distinct toggles for "Part of Speech," "English Translation," and "Additional Information."
    - [x] Style these controls to be intuitive and accessible.

31. **[x] Hint System Functionality:**

    - [x] Implement state management for the visibility of each hint.
    - [x] By default, all hints should be hidden.
    - [x] Connect the UI toggles to display the corresponding information for the current secret word when activated by the user.

32. **[x] Code Cleanup:**
    - [x] Remove any now-unused code related to fetching words from `yoruba-words.json` or `yoruba-dictionary.json`.
    - [x] Delete the old JSON word-list files from the `public` directory if they are no longer needed for any other purpose.

- community yoruba wordle where the word is the same across the world for beginner, medium, and advanced
- private yoruba wordle where you can keep trying different words
- beginner, medium, and advanced yoruba worlde
  add home page logo button to yoruba worlde page - top left
- on wisdomdeck.online - make the nav bar cream or slightly different colour and format the nav bar better

---

## Tonal Accent Hint System

33. **[x] UI - Add New Hint Toggle:**

    - [x] In `components/wordle/HintSystem.tsx`, add a new toggle switch labeled "Show tonal accents".

34. **[x] State Management:**

    - [x] In `app/yoruba-wordle/page.tsx`, create and manage a new state variable (`showTonalAccents`).
    - [x] Pass the new state and its setter function down to the `HintSystem` component.

35. **[x] Accent Rendering Logic:**

    - [x] Create a new helper function to extract a diacritical mark from a character (e.g., `'ù'` -> `'̀'`).
    - [x] Pass the `solution` word and the `showTonalAccents` state down to the `GameBoard.tsx` component.
    - [x] In `GameBoard.tsx`, conditionally render the correct accent mark above each tile based on the `showTonalAccents` prop.

36. **[x] Styling:**
    - [x] Apply CSS (likely absolute positioning) to ensure the accent marks are styled and positioned correctly above the game board tiles.
