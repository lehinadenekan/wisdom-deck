# Claude Pro Context Setup

This folder contains the essential files needed to give Claude Pro context about the Yoruba Wordle project.

## How to Use These Files

1. Start a new conversation with Claude Pro
2. Share these files in this order:
   - First: `MEMORY.md` - Project overview
   - Second: `wordle.ts` - Core types
   - Third: `TASKS.MD` - Current tasks and status
   - As needed: `supabase.ts` and `useWordle.ts` based on what you're working on

## Initial Message Template

```
I'm working on a Yoruba Wordle game. Let me share the project context with you.

First, here's our project overview (MEMORY.md):
[paste MEMORY.md content]

Here are our core types (wordle.ts):
[paste wordle.ts content]

And here's our current task list (TASKS.MD):
[paste relevant section from TASKS.MD]

I'm currently working on: [describe your current task]

Would you like to see any additional files to better assist with this task?
```

## Additional Files

Share these files when:

- Working on database/validation: `supabase.ts`
- Working on game logic: `useWordle.ts`
- Working on specific components: Share relevant component files
- Working on API routes: Share relevant API route files

## Best Practices

1. Always specify file paths when sharing code
2. Use markdown code blocks with language specification
3. Include context lines around code changes
4. When debugging, include relevant error messages and logs
5. Keep track of Claude Pro's context and refresh when needed

## Maintaining Context

When starting a new conversation about an ongoing task:

1. Briefly remind Claude Pro of the project context
2. Reference relevant previous discussions
3. Specify if you're continuing work or starting something new
