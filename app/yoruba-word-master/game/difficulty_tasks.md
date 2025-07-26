# Yorùbá Word Master - Difficulty Categorization System Tasks

## Phase 1: Database Migration

- [ ] Add `difficulty_level` column (VARCHAR, default 'intermediate') to `dictionary_ai` and `dictionary_jz` tables in Supabase
- [ ] Create indexes on `difficulty_level` for both tables
- [ ] Add constraints/validation as needed
- [ ] Migration file: `database/migrations/add_difficulty_levels.sql`

## Phase 2: Categorization Script

- [ ] Create `scripts/categorize-words.ts` for batch processing
- [ ] Fetch all words from both tables
- [ ] Apply YorubaWordCategorizer algorithm to each word
- [ ] Generate SQL UPDATE statements for bulk assignment
- [ ] Output categorization stats and CSV for manual review
- [ ] Integrate with `lib/supabase.ts` for DB access
- [ ] Handle Unicode normalization and grapheme counting

## Phase 3: Settings UI

- [ ] Update `components/word-master/SettingsPanel.tsx`
- [ ] Add difficulty selector (radio group or dropdown): Easy, Intermediate, Advanced
- [ ] Default selection: Intermediate
- [ ] Save user choice to localStorage and usePreferences hook
- [ ] Ensure mobile-responsive, purple theme

## Phase 4: Game Logic Integration

- [ ] Update `lib/supabase.ts` to filter by `difficulty_level` in `getRandomWordleWord()`
- [ ] Update `hooks/useWordMaster.ts` to manage difficulty state
- [ ] Pass difficulty setting from game page to word fetch logic
- [ ] Ensure validation and word filtering work for all levels

## Phase 5: Manual Review & QA

- [ ] Review CSV output for edge cases and miscategorized words
- [ ] Allow for manual overrides in DB if needed
- [ ] Test game for each difficulty level (Easy, Intermediate, Advanced)
- [ ] Confirm settings persist and game logic respects user choice

---

**After completing these tasks, the game will support difficulty-based word filtering and improved educational value.**
