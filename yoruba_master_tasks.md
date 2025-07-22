```json
{
  "project": "Yorùbá Word Master - Complete Task List",
  "note_for_cursor": "I'll be working with Claude AI alongside Cursor. I'll be copying tasks, code snippets, and updates between both tools. Claude has full context of this Next.js/TypeScript/Supabase project and will be providing guidance and code solutions.",
  "project_context": {
    "tech_stack": "Next.js 15, TypeScript, Tailwind CSS v4, Supabase, Stripe",
    "current_status": "Production-ready Yoruba Wordle game that needs rebranding and feature enhancements",
    "main_changes": "Rename to 'Yorùbá Word Master', add difficulty levels, variable word lengths (3-7 letters), continuous gameplay"
  },
  "phases": [
    {
      "phase": 1,
      "title": "Quick Wins & Visual Improvements",
      "priority": "High",
      "effort": "Low",
      "timeline": "1-2 hours",
      "tasks": [
        {
          "id": "1.1.1",
          "title": "Remove broken logo from navbar/header",
          "description": "Locate and remove the logo implementation that's not loading properly",
          "files_to_check": ["components/Navbar.tsx", "components/Header.tsx"],
          "status": "pending"
        },
        {
          "id": "1.1.2",
          "title": "Add Wisdom Deck logo to footer",
          "description": "Update Footer component with logo and proper styling",
          "files_to_modify": ["components/Footer.tsx"],
          "status": "pending"
        },
        {
          "id": "1.1.3",
          "title": "Test logo display across devices",
          "description": "Verify responsive behavior and proper rendering",
          "status": "pending"
        },
        {
          "id": "1.2.1",
          "title": "Update page titles to 'Yorùbá Word Master'",
          "description": "Change all game references from 'Yoruba Wordle' to 'Yorùbá Word Master'",
          "files_to_modify": [
            "app/yoruba-wordle/page.tsx",
            "components/YorubaWordle.tsx"
          ],
          "status": "pending"
        },
        {
          "id": "1.2.2",
          "title": "Update 'How to Play' modal content",
          "description": "Change modal text to reflect new game name",
          "files_to_modify": ["components/wordle/HowToPlayModal.tsx"],
          "status": "pending"
        },
        {
          "id": "1.2.3",
          "title": "Update meta tags and SEO content",
          "description": "Update metadata, titles, descriptions with new game name",
          "files_to_modify": ["app/yoruba-wordle/page.tsx", "app/layout.tsx"],
          "status": "pending"
        }
      ]
    },
    {
      "phase": 2,
      "title": "Route & File Structure Updates",
      "priority": "Medium",
      "effort": "Medium",
      "timeline": "2-3 hours",
      "dependencies": ["Phase 1"],
      "tasks": [
        {
          "id": "2.1.1",
          "title": "Rename route directory",
          "description": "Rename /app/yoruba-wordle/ → /app/yoruba-word-master/",
          "action": "file_rename",
          "status": "pending"
        },
        {
          "id": "2.1.2",
          "title": "Update internal route references",
          "description": "Find and replace all route references in codebase",
          "search_pattern": "/yoruba-wordle",
          "replace_with": "/yoruba-word-master",
          "status": "pending"
        },
        {
          "id": "2.1.3",
          "title": "Update navigation links",
          "description": "Update navbar and homepage links to new route",
          "files_to_modify": ["components/Navbar.tsx", "app/page.tsx"],
          "status": "pending"
        },
        {
          "id": "2.2.1",
          "title": "Rename main component file",
          "description": "Rename components/YorubaWordle.tsx → components/YorubaWordMaster.tsx",
          "action": "file_rename",
          "status": "pending"
        },
        {
          "id": "2.2.2",
          "title": "Rename hook file",
          "description": "Rename hooks/useWordle.ts → hooks/useWordMaster.ts",
          "action": "file_rename",
          "status": "pending"
        },
        {
          "id": "2.2.3",
          "title": "Update all imports and references",
          "description": "Update import statements for renamed components and hooks",
          "search_patterns": ["useWordle", "YorubaWordle"],
          "status": "pending"
        },
        {
          "id": "2.3.1",
          "title": "Rename API route directory",
          "description": "Rename /api/wordle/ → /api/word-master/",
          "action": "file_rename",
          "status": "pending"
        },
        {
          "id": "2.3.2",
          "title": "Update API endpoint calls",
          "description": "Update fetch calls in components to use new API routes",
          "search_pattern": "/api/wordle/",
          "replace_with": "/api/word-master/",
          "status": "pending"
        }
      ]
    },
    {
      "phase": 3,
      "title": "Gameplay Model Transformation",
      "priority": "High",
      "effort": "Medium",
      "timeline": "3-4 hours",
      "dependencies": ["Phase 2"],
      "tasks": [
        {
          "id": "3.1.1",
          "title": "Remove date-based word selection",
          "description": "Remove daily word logic from API and components",
          "files_to_modify": [
            "api/word-master/daily-word.ts",
            "hooks/useWordMaster.ts"
          ],
          "status": "pending"
        },
        {
          "id": "3.1.2",
          "title": "Implement random word selection",
          "description": "Change to random word selection per game instead of daily",
          "files_to_modify": ["lib/supabase.ts"],
          "status": "pending"
        },
        {
          "id": "3.1.3",
          "title": "Remove 'daily' terminology from UI",
          "description": "Update UI text to remove daily word references",
          "status": "pending"
        },
        {
          "id": "3.2.1",
          "title": "Add 'New Game' button",
          "description": "Create and integrate New Game button in game interface",
          "files_to_create": ["components/word-master/NewGameButton.tsx"],
          "status": "pending"
        },
        {
          "id": "3.2.2",
          "title": "Implement game reset functionality",
          "description": "Add reset game state logic to hook",
          "files_to_modify": ["hooks/useWordMaster.ts"],
          "status": "pending"
        },
        {
          "id": "3.2.3",
          "title": "Update win/lose screens",
          "description": "Add 'Play Again' options to game end screens",
          "files_to_modify": ["components/word-master/GameEndModal.tsx"],
          "status": "pending"
        },
        {
          "id": "3.3.1",
          "title": "Create settings panel structure",
          "description": "Create base settings component for future enhancements",
          "files_to_create": ["components/word-master/SettingsPanel.tsx"],
          "status": "pending"
        },
        {
          "id": "3.3.2",
          "title": "Implement localStorage for preferences",
          "description": "Add user preference storage system",
          "files_to_modify": ["hooks/useWordMaster.ts"],
          "status": "pending"
        }
      ]
    },
    {
      "phase": 4,
      "title": "Variable Word Length Implementation",
      "priority": "High",
      "effort": "High",
      "timeline": "5-7 hours",
      "dependencies": ["Phase 3"],
      "tasks": [
        {
          "id": "4.1.1",
          "title": "Verify word_length column accuracy",
          "description": "Check database word_length values across both tables",
          "sql_commands": [
            "SELECT word_length, COUNT(*) FROM dictionary_ai GROUP BY word_length;"
          ],
          "status": "pending"
        },
        {
          "id": "4.1.2",
          "title": "Add database indexes for performance",
          "description": "Create indexes for word_length queries",
          "sql_commands": [
            "CREATE INDEX idx_word_length ON dictionary_ai(word_length);"
          ],
          "status": "pending"
        },
        {
          "id": "4.1.3",
          "title": "Analyze word distribution by length",
          "description": "Ensure sufficient words for each length (3-7 letters)",
          "status": "pending"
        },
        {
          "id": "4.2.1",
          "title": "Create flexible grid component",
          "description": "Build dynamic game board for 3-7 letter words",
          "files_to_create": ["components/word-master/DynamicGameBoard.tsx"],
          "status": "pending"
        },
        {
          "id": "4.2.2",
          "title": "Implement responsive tile sizing",
          "description": "CSS for tiles that adapt to word length",
          "files_to_modify": ["styles/game-board.css"],
          "status": "pending"
        },
        {
          "id": "4.2.3",
          "title": "Update CSS Grid layout",
          "description": "Make grid columns dynamic based on word length",
          "status": "pending"
        },
        {
          "id": "4.2.4",
          "title": "Test mobile compatibility",
          "description": "Ensure all word lengths work on mobile devices",
          "status": "pending"
        },
        {
          "id": "4.3.1",
          "title": "Update useWordMaster for dynamic lengths",
          "description": "Modify hook to handle variable word lengths",
          "files_to_modify": ["hooks/useWordMaster.ts"],
          "status": "pending"
        },
        {
          "id": "4.3.2",
          "title": "Modify guess validation",
          "description": "Update validation logic for different word lengths",
          "status": "pending"
        },
        {
          "id": "4.3.3",
          "title": "Update keyboard input handling",
          "description": "Ensure keyboard works with variable length words",
          "files_to_modify": ["components/word-master/Keyboard.tsx"],
          "status": "pending"
        },
        {
          "id": "4.4.1",
          "title": "Create word length selector",
          "description": "UI component for selecting word length (3-7)",
          "files_to_create": ["components/word-master/WordLengthSelector.tsx"],
          "status": "pending"
        },
        {
          "id": "4.4.2",
          "title": "Integrate with settings panel",
          "description": "Add word length selector to settings",
          "files_to_modify": ["components/word-master/SettingsPanel.tsx"],
          "status": "pending"
        },
        {
          "id": "4.4.3",
          "title": "Update API calls for word length",
          "description": "Pass word length parameter to API endpoints",
          "files_to_modify": ["api/word-master/daily-word.ts"],
          "status": "pending"
        }
      ]
    },
    {
      "phase": 5,
      "title": "Difficulty Level System",
      "priority": "High",
      "effort": "High",
      "timeline": "6-8 hours",
      "dependencies": ["Phase 4"],
      "tasks": [
        {
          "id": "5.1.1",
          "title": "Add difficulty_level column to database",
          "description": "Add column to both dictionary tables",
          "sql_commands": [
            "ALTER TABLE dictionary_ai ADD COLUMN difficulty_level VARCHAR(20) DEFAULT 'intermediate';",
            "ALTER TABLE dictionary_jz ADD COLUMN difficulty_level VARCHAR(20) DEFAULT 'intermediate';"
          ],
          "status": "pending"
        },
        {
          "id": "5.1.2",
          "title": "Create automated categorization script",
          "description": "Script to categorize words based on defined criteria",
          "files_to_create": ["scripts/categorize-words.js"],
          "status": "pending"
        },
        {
          "id": "5.1.3",
          "title": "Run categorization algorithm",
          "description": "Execute categorization based on word complexity",
          "status": "pending"
        },
        {
          "id": "5.1.4",
          "title": "Manual review of word categories",
          "description": "Review and adjust borderline word classifications",
          "status": "pending"
        },
        {
          "id": "5.2.1",
          "title": "Update getRandomWordleWord for difficulty",
          "description": "Modify Supabase function to filter by difficulty",
          "files_to_modify": ["lib/supabase.ts"],
          "status": "pending"
        },
        {
          "id": "5.2.2",
          "title": "Update API routes for difficulty",
          "description": "Add difficulty parameter to word selection APIs",
          "files_to_modify": ["api/word-master/daily-word.ts"],
          "status": "pending"
        },
        {
          "id": "5.2.3",
          "title": "Validate word availability",
          "description": "Ensure sufficient words for all difficulty/length combinations",
          "status": "pending"
        },
        {
          "id": "5.3.1",
          "title": "Create difficulty selector component",
          "description": "UI for selecting Beginner/Intermediate/Advanced",
          "files_to_create": ["components/word-master/DifficultySelector.tsx"],
          "status": "pending"
        },
        {
          "id": "5.3.2",
          "title": "Add visual indicators for difficulty levels",
          "description": "Icons and descriptions for each difficulty",
          "status": "pending"
        },
        {
          "id": "5.3.3",
          "title": "Integrate with settings panel",
          "description": "Add difficulty selector to settings",
          "files_to_modify": ["components/word-master/SettingsPanel.tsx"],
          "status": "pending"
        },
        {
          "id": "5.4.1",
          "title": "Implement automated categorization",
          "description": "Run automated script for clear-cut word categories",
          "status": "pending"
        },
        {
          "id": "5.4.2",
          "title": "Generate manual review lists",
          "description": "Create lists of words needing human review",
          "status": "pending"
        },
        {
          "id": "5.4.3",
          "title": "Execute manual word review",
          "description": "Human review of borderline/cultural words",
          "status": "pending"
        },
        {
          "id": "5.4.4",
          "title": "Validate word distribution",
          "description": "Ensure balanced distribution across difficulties",
          "status": "pending"
        }
      ]
    },
    {
      "phase": 6,
      "title": "Enhanced Statistics & User Experience",
      "priority": "Medium",
      "effort": "Medium",
      "timeline": "3-4 hours",
      "dependencies": ["Phase 5"],
      "tasks": [
        {
          "id": "6.1.1",
          "title": "Design statistics schema",
          "description": "Create structure for difficulty × word length stats tracking",
          "files_to_create": ["types/statistics.ts"],
          "status": "pending"
        },
        {
          "id": "6.1.2",
          "title": "Implement separate tracking per configuration",
          "description": "Track stats for each difficulty/length combination",
          "files_to_modify": ["hooks/useWordMaster.ts"],
          "status": "pending"
        },
        {
          "id": "6.1.3",
          "title": "Create statistics display component",
          "description": "UI component to show user statistics",
          "files_to_create": ["components/word-master/StatisticsDisplay.tsx"],
          "status": "pending"
        },
        {
          "id": "6.1.4",
          "title": "Add progress visualization",
          "description": "Charts/graphs for learning progress",
          "status": "pending"
        },
        {
          "id": "6.2.1",
          "title": "Complete settings panel",
          "description": "Finalize settings with all difficulty/length options",
          "files_to_modify": ["components/word-master/SettingsPanel.tsx"],
          "status": "pending"
        },
        {
          "id": "6.2.2",
          "title": "Implement preference persistence",
          "description": "Save user settings to localStorage",
          "status": "pending"
        },
        {
          "id": "6.2.3",
          "title": "Add reset statistics functionality",
          "description": "Allow users to clear their statistics",
          "status": "pending"
        },
        {
          "id": "6.3.1",
          "title": "Update share functionality",
          "description": "Include difficulty/length in shareable results",
          "files_to_modify": ["components/word-master/ShareResults.tsx"],
          "status": "pending"
        },
        {
          "id": "6.3.2",
          "title": "Create shareable result format",
          "description": "Design result format showing game configuration",
          "status": "pending"
        }
      ]
    },
    {
      "phase": 7,
      "title": "Testing & Quality Assurance",
      "priority": "High",
      "effort": "Medium",
      "timeline": "3-4 hours",
      "dependencies": ["All previous phases"],
      "tasks": [
        {
          "id": "7.1.1",
          "title": "Update E2E tests for new routes",
          "description": "Update Playwright tests for renamed routes and features",
          "files_to_modify": ["tests/example.spec.ts"],
          "status": "pending"
        },
        {
          "id": "7.1.2",
          "title": "Test all difficulty/length combinations",
          "description": "Ensure all game configurations work properly",
          "status": "pending"
        },
        {
          "id": "7.1.3",
          "title": "Update unit tests",
          "description": "Update tests for renamed components and hooks",
          "files_to_modify": ["__tests__/"],
          "status": "pending"
        },
        {
          "id": "7.1.4",
          "title": "Test statistics tracking accuracy",
          "description": "Verify statistics are recorded correctly",
          "status": "pending"
        },
        {
          "id": "7.2.1",
          "title": "Test dynamic grid performance",
          "description": "Performance testing across devices and word lengths",
          "status": "pending"
        },
        {
          "id": "7.2.2",
          "title": "Run accessibility audits",
          "description": "Use jest-axe and @axe-core/playwright on new components",
          "status": "pending"
        },
        {
          "id": "7.2.3",
          "title": "Validate mobile responsiveness",
          "description": "Test all configurations on mobile devices",
          "status": "pending"
        },
        {
          "id": "7.3.1",
          "title": "Verify word selection randomization",
          "description": "Ensure proper randomization across difficulties/lengths",
          "status": "pending"
        },
        {
          "id": "7.3.2",
          "title": "Test API performance",
          "description": "Performance testing with new filtering parameters",
          "status": "pending"
        },
        {
          "id": "7.3.3",
          "title": "Validate word categorization accuracy",
          "description": "Spot-check word difficulty assignments",
          "status": "pending"
        }
      ]
    },
    {
      "phase": 8,
      "title": "Documentation & Deployment",
      "priority": "Low",
      "effort": "Low",
      "timeline": "1-2 hours",
      "dependencies": ["Phase 7"],
      "tasks": [
        {
          "id": "8.1.1",
          "title": "Update README.md",
          "description": "Document new features and game mechanics",
          "files_to_modify": ["README.md"],
          "status": "pending"
        },
        {
          "id": "8.1.2",
          "title": "Update TASKS.MD",
          "description": "Mark completed items and add new features",
          "files_to_modify": ["TASKS.MD"],
          "status": "pending"
        },
        {
          "id": "8.1.3",
          "title": "Document difficulty criteria",
          "description": "Create documentation for word categorization",
          "files_to_create": ["docs/difficulty-criteria.md"],
          "status": "pending"
        },
        {
          "id": "8.2.1",
          "title": "Deploy to Vercel",
          "description": "Deploy all changes to production",
          "status": "pending"
        },
        {
          "id": "8.2.2",
          "title": "Test production environment",
          "description": "Verify all features work in production",
          "status": "pending"
        },
        {
          "id": "8.2.3",
          "title": "Monitor for issues",
          "description": "Monitor deployment and user feedback",
          "status": "pending"
        }
      ]
    }
  ],
  "recommended_starting_approach": {
    "first_tasks": [
      "1.1.1 - Remove broken logo from navbar",
      "1.1.2 - Add logo to footer",
      "1.2.1 - Update page titles to 'Yorùbá Word Master'"
    ],
    "rationale": "These are quick wins that provide immediate visual improvement and build confidence before tackling more complex changes",
    "estimated_time": "30-60 minutes for first 3 tasks"
  },
  "critical_path": "Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 7",
  "total_estimated_effort": "24-34 hours",
  "key_files_to_understand": [
    "app/yoruba-wordle/page.tsx",
    "components/YorubaWordle.tsx",
    "hooks/useWordle.ts",
    "lib/supabase.ts",
    "api/wordle/daily-word.ts",
    "api/wordle/validate-guess.ts"
  ]
}
```
