---
name: create-hook
description: Create a new hook script and register it in settings.json. Follows the project's bash script pattern with concise status messages.
---

# Create Hook

Use this skill when user asks to create a new hook that runs on file changes or tool use.

## Pattern

1. Bash script in `$CLAUDE_PROJECT_DIR/.claude/hooks/<name>.sh`
2. Entry in `.claude/settings.json` under one of the hook categories
3. Concise `statusMessage`

## Hook Categories

| Category              | When it fires                                                               | Use for                                   |
| --------------------- | --------------------------------------------------------------------------- | ----------------------------------------- |
| `SessionStart`        | When a session begins or resumes                                            | Inject context, setup environment         |
| `Setup`               | When starting with `--init-only` or `--init` / `--maintenance` in `-p` mode | CI preparation, one-time setup            |
| `UserPromptSubmit`    | When you submit a prompt, before Claude processes it                        | Validation, injecting context, blocking   |
| `UserPromptExpansion` | When a user-typed command expands into a prompt                             | Block expansion, modify prompt            |
| `PreToolUse`          | Before a tool call executes                                                 | Blocking checks, validation, confirmation |
| `PermissionRequest`   | When a permission dialog appears                                            | Auto-approve specific prompts             |
| `PermissionDenied`    | When a tool call is denied by auto mode                                     | Retry logic, escalation                   |
| `PostToolUse`         | After a tool call succeeds                                                  | Lint, format, type-check, update state    |
| `PostToolUseFailure`  | After a tool call fails                                                     | Error recovery, logging, notifications    |
| `PostToolBatch`       | After a full batch of parallel tool calls resolves                          | Batch-level validation                    |
| `Notification`        | When Claude Code sends a notification                                       | Desktop alerts, external pings            |
| `SubagentStart`       | When a subagent is spawned                                                  | Track agent usage, inject context         |
| `SubagentStop`        | When a subagent finishes                                                    | Collect results, cleanup                  |
| `TaskCreated`         | When a task is being created via `TaskCreate`                               | Audit, validation                         |
| `TaskCompleted`       | When a task is being marked as completed                                    | Audit, trigger next steps                 |
| `Stop`                | When Claude finishes responding                                             | Verify tasks complete, summaries          |
| `StopFailure`         | When the turn ends due to an API error                                      | Alert on outages (output ignored)         |
| `TeammateIdle`        | When an agent team teammate is about to go idle                             | Reassign work, inject context             |
| `InstructionsLoaded`  | When CLAUDE.md or rules are loaded                                          | Audit, inject additional context          |
| `ConfigChange`        | When a configuration file changes during a session                          | Audit, block unauthorized changes         |
| `CwdChanged`          | When the working directory changes                                          | Reload environment (e.g. direnv)          |
| `FileChanged`         | When a watched file changes on disk                                         | React to external file edits              |
| `WorktreeCreate`      | When a worktree is being created                                            | Custom git behavior                       |
| `WorktreeRemove`      | When a worktree is being removed                                            | Cleanup                                   |
| `PreCompact`          | Before context compaction                                                   | Save critical context                     |
| `PostCompact`         | After context compaction completes                                          | Re-inject lost context                    |
| `Elicitation`         | When an MCP server requests user input                                      | Intercept, modify elicitation             |
| `ElicitationResult`   | After user responds to MCP elicitation                                      | Process result before sending             |
| `SessionEnd`          | When a session terminates                                                   | Cleanup, logging                          |

## Settings Entry

```json
{
  "type": "command",
  "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/<name>.sh",
  "statusMessage": "<short message>..."
}
```

## Rules

- Use `jq` to extract file path from stdin JSON.
- Filter by extension or matcher. Don't run on every file.
- Prefer `bunx` over global binaries.
- Status message max 4 words, ends with `...`.
- Make script executable with `chmod +x`.

## Example

**type-check.sh**

```bash
#!/bin/bash
set -euo pipefail

f=$(jq -r '.tool_input.file_path // .tool_response.filePath')

if [[ "$f" == *.ts || "$f" == *.tsx ]]; then
  tmpfile="tsconfig.typecheck.$$.$RANDOM.json"
  trap 'rm -f "$tmpfile"' EXIT
  cat > "$tmpfile" <<EOF
{
  "extends": "./tsconfig.json",
  "include": ["$f"]
}
EOF
  bunx tsc --noEmit --project "$tmpfile"
fi
```

**settings.json entry**

```json
{
  "matcher": "Write|Edit",
  "hooks": [
    {
      "type": "command",
      "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/type-check.sh",
      "statusMessage": "Running type check..."
    }
  ]
}
```
