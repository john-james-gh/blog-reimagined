## Project Structure

This is an Nx monorepo where apps are nested.

When running commands:

- Use `nx build blog` (Nx is installed globally)
- Or use `pnpm --filter blog <command>` from the root
- Avoid using `cd` in terminal commands since the terminal persists state between runs

## File Naming

- React component files: kebab-case (e.g., `prompt-card.tsx`, not `PromptCard.tsx`)
- Component exports: still PascalCase (e.g., `export function PromptCard`)

## Code Style

- Prefer function declarations over arrow functions (e.g., `function handleClick() {}` not `const handleClick = () => {}`)
- Always use `import type` for type imports (e.g., `import type { User } from './types'`)

## Commit Messages

- Use lowercase (e.g., `add user profile page`)
- Never use conventional commit prefixes (`feat:`, `fix:`, etc.)
- Keep them concise

## Framework Notes

This project uses Next.js v16:

- `middleware.ts` was renamed to `proxy.ts` in v16
- `headers()` and `cookies()` are async since v15 - always use `await headers()` and `await cookies()`
- `params` prop on pages is async since v15 - always `await params`
- Both `next build` and `next dev` use Turbopack by default in v16 - webpack is no longer used
