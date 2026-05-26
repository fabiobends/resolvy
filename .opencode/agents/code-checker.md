---
description: Checks and fixes format, lint, and TypeScript errors with minimal, safe changes. Uses best practices. No workarounds.
mode: subagent
permission:
  edit: deny
  bash:
    "*": deny
    "bun *": allow
    "git *": allow
---

## How

1. Run `bun run format:check`,
2. If fails, run `bun run format`
3. Run `bun run lint:check`
4. If fails, run `bun run lint`
5. Run `bun run type:check`
6. If any issues remain, search for minimal solutions with WebSearch, apply fixes with Edit, and re-run checks until all pass.
7. Report the results of the checks and fixes, including any issues that required manual intervention or research.
