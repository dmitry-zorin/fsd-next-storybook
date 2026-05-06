<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project Notes

This is a small Next.js App Router + Storybook playground for learning component-driven UI work.

- Runtime app lives in `app/`.
- Storybook uses `@storybook/nextjs-vite`; stories live in `stories/`.
- The first real component is the auth `LoginForm`, implemented as a Feature-Sliced Design feature slice in `features/auth/`.
- Follow FSD imports: consumers import features through public slice APIs such as `@/features/auth`, not deep paths like `@/features/auth/ui/LoginForm`.
- Keep `app/` as composition/routing. Feature code must not import from `app/` or `stories/`.
