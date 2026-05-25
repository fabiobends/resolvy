---
name: plan
description: Create a structured implementation plan as a single self-contained HTML file with visual task board, requirements, architecture decisions, and descriptive test coverage.
---

# Plan Skill

## When to use

- Starting a new feature that spans multiple files or modules
- Breaking down a complex task into discrete, trackable steps
- Handing off work between sessions or agents
- Needing a visual summary for non-technical stakeholders

## Rules

1. Create one file only: `.claude/plans/<feature-kebab-case>/index.html`.

2. The folder name must be kebab-case and match the feature name.

3. `index.html` must be:
   - Self-contained (single file, no external assets)
   - Visually polished: task board with phases, colored columns, styled cards
   - Readable by someone who doesn't know code
   - Include a summary, entry & exit card, task list with visual checkboxes, architecture decisions, risk/blocker section, and descriptive test coverage
   - All tasks rendered as checkable items with phase grouping

4. Mention which skills should be loaded when executing the plan. Common mapping:
   - New screen with modules → **feature**, **form**
   - New reusable hook → **hook**
   - New reusable component → **component**
   - New feature module → **module**, **form** (if it has a form)

5. Update checkboxes as work progresses (markdown style or visual). Track completion state in the HTML.

6. Keep plans concise. A plan that doesn't fit on one screen is too detailed — break into sub-plans.

## What to include in the `index.html`

### Header

- Feature name
- Short (1-sentence) what this feature does
- Progress ring with % complete
- Skills to load as colored tags

### Summary card

- Plain-language description of the feature (what problem it solves, who benefits)

### Entry & Exit card

- **Land**: how user reaches this screen (route, deep link, prior screen)
- **Exit — success**: where user goes after completing the flow
- **Exit — cancel / back**: where user goes if they abort
- **Transitions**: any animation, modal, or push/pop behavior

### Architecture decisions

| Decision                         | Rationale                                        |
| -------------------------------- | ------------------------------------------------ |
| Example: reuse login composition | Consistency across auth screens, faster delivery |

### Task Board

- Group tasks by phase: Setup, Core, Polish, Tests, Storybook
- Each phase is a colored column with a count badge
- Each task is a card with:
  - status dot (done/wip/todo)
  - title with optional badge
  - short description of what it does
- All tasks use visual checkboxes; scrollable if needed

### Test Coverage — What & How to Test

Replace numeric percentages with a table that describes what is under test and how.

#### Unit Tests

| Under test   | What it validates                                    | How it approaches it                       |
| ------------ | ---------------------------------------------------- | ------------------------------------------ |
| `useFeature` | Returns data on success; handles error states        | Mocks API response; asserts state updates  |
| Zod schema   | Valid input passes; invalid fails with clear message | Feeds edge-case inputs; checks error shape |

#### Integration Tests

| Flow        | What it validates                               | How it approaches it                                              |
| ----------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| Submit form | Success navigates; network error shows retry UI | Renders full module; mocks API; asserts navigation + error banner |

#### E2E Tests

| Flow                    | What it validates                | How it approaches it                                     |
| ----------------------- | -------------------------------- | -------------------------------------------------------- |
| User completes checkout | Payment succeeds end-to-end      | Drives real navigation stack; checks screen transitions  |
| User completes checkout | Card declined shows inline error | Mocks payment provider; asserts error message visibility |

### Risks & Blockers

- List open questions, dependencies, or things that could block the plan
- Flag them with warning or critical styling

## Style system for the cards

Use the existing style system from `template.html`. The HTML is a single, self-contained document with dark-theme CSS. Phases are color-coded columns. Status is represented by colored dots (done = green, wip = yellow, todo = dim). Badges indicate priority or state.

## Example structure

```html
<!DOCTYPE html>
<html>
  <head>
    <style></style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Feature Name</h1>
        <p class="subtitle">One-line description.</p>
        <div class="progress-ring" style="--pct:20">20%</div>
        <div class="skills">
          <span class="tag">form</span><span class="tag">feature</span>
        </div>
      </header>

      <div class="card">
        <h2>Summary</h2>
        <p>Plain-english explanation.</p>
      </div>

      <div class="card">
        <h2>Entry & Exit</h2>
        <div class="info-grid"></div>
      </div>

      <div class="card">
        <h2>Architecture Decisions</h2>
        <div class="table-wrp"></div>
      </div>

      <div class="card">
        <h2>Task Board</h2>
        <div class="board">
          <div class="column" style="--col-accent:rgb(99,102,241)">
            <div class="col-header">Setup <span class="count">0/2</span></div>
            <div class="task" data-status="done">
              <div class="status"></div>
              <div class="body">
                <div class="title">Create schema</div>
                <div class="desc">Zod + types for 4 fields</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Test Coverage — What & How</h2>
        <div class="tier">
          <h3>Unit Tests</h3>
          <table>
            ...3 columns: Under test / What / How...
          </table>
        </div>
        <div class="tier">...</div>
      </div>

      <div class="card">
        <h2>Risks & Blockers</h2>
        ...
      </div>
    </div>
  </body>
</html>
```

## Template

Use `template.html` in the same directory as this SKILL.md file. It already implements the dark-themed visual board system with task cards, test coverage tables, and risk cards. Copy it and replace the example content.

## Entry & Exit

Include this section in every plan:

- **Land**: how the user reaches this feature (route, deep link, or prior screen)
- **Exit — success**: where the user goes after completing the flow
- **Exit — cancel / back**: where they go if they abort
- **Transitions**: any animation, modal, or push/pop behavior

## Storybook

- `index.html` should mention if Storybook stories are required
- List which components/flows need stories
- Indicate if knob controls are needed

## Test Coverage — What & How to Test

Replace numeric percentages with a table that describes what is under test and how.

### Unit Tests

| Under test   | What it validates                                    | How it approaches it                       |
| ------------ | ---------------------------------------------------- | ------------------------------------------ |
| `useFeature` | Returns data on success; handles error states        | Mocks API response; asserts state updates  |
| Zod schema   | Valid input passes; invalid fails with clear message | Feeds edge-case inputs; checks error shape |

### Integration Tests

| Flow        | What it validates                               | How it approaches it                                              |
| ----------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| Submit form | Success navigates; network error shows retry UI | Renders full module; mocks API; asserts navigation + error banner |

### E2E Tests

| Flow                    | What it validates                | How it approaches it                                     |
| ----------------------- | -------------------------------- | -------------------------------------------------------- |
| User completes checkout | Payment succeeds end-to-end      | Drives real navigation stack; checks screen transitions  |
| User completes checkout | Card declined shows inline error | Mocks payment provider; asserts error message visibility |

## Open Questions / Blockers

- [ ] Does API already expose `/signup` endpoint?
- [ ] Is name field required or optional?
