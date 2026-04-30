---
name: create-commit
description: Create conventional commits from files. Split into small, meaningful commits when changes span multiple concerns.
---

# Create Commit

Invoke when user asks to commit changes.

## Rules

1. Inspect repo state: `git status`, `git diff --cached --stat`, `git diff --stat`.
2. If no staged files, stop. Warn user.
3. Split changes into small, meaningful commits when they span multiple concerns.
   - Each commit must be self-contained. Never break behavior across commits.
   - Use `git add -p` or selective file staging to organize commits.
   - Prefer multiple focused commits over one big commit.
4. Pick conventional commit type per commit: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`.
5. Pick scope if obvious — component or service name.
6. Build title:
   - Format: `type(scope): description` or `type: description`
   - All lowercase EXCEPT component/service/vendor names (keep original casing)
   - No trailing period
   - Max 50 characters
7. Build body:
   - Summarize changes with more detail
   - Either ONE paragraph: only first letter capitalized, rest lowercase (except proper nouns)
   - OR bullet list: each bullet starts with capital letter, rest lowercase
   - Wrap lines at 72 characters
8. Run `git commit -m "$(cat <<'EOF'\ntitle\n\nbody\nEOF\n)"` — do NOT use `--no-verify`

## Example — Single Commit

```
feat(ThemedText): add typography scale

Added seven text types using fontSize and lineHeight tokens.
Types include caption, label, bodySmall, body, subtitle, title and display.
```

## Example — Split Commits

When theme constants and component changes are both present, prefer two commits:

```
feat(theme): add FontSizes and LineHeights tokens

- Add hardcoded fontSize values: 10, 12, 14, 16, 20, 24, 32
- Add matching lineHeight values: 14, 16, 20, 24, 28, 32, 40
```

Then:

```
feat(ThemedText): replace type system with typography scale

- Add seven text types: caption, label, bodySmall, body, subtitle, title, display
- Use FontSizes and LineHeights from theme constants
- Remove old default/title/small types
```
