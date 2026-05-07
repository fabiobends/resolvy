---
name: agent-hook
description: Create or register a hook in settings.json. Covers all hook types (command, prompt, agent, http, mcp_tool) and events.
---

# Create or Register Hook

Use this skill when the user asks to create, add, or register any hook in a Claude Code project.

## Hook Types

Claude Code supports five hook handler types:

| Type       | Description                               | Best For                               |
| ---------- | ----------------------------------------- | -------------------------------------- |
| `command`  | Shell script or binary                    | Linting, blocking, formatting, logging |
| `prompt`   | Single-turn LLM evaluation (returns `ok`) | Semantic judgment, quality gates       |
| `agent`    | Spawn a subagent with tool access         | Complex verification, file inspection  |
| `http`     | POST JSON to an external endpoint         | External services, audit, webhooks     |
| `mcp_tool` | Call a tool on an already-connected MCP   | Security scans, external validations   |

## Hook Events

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

## Settings Entry Examples

### Command Hook

```json
{
  "matcher": "Write|Edit",
  "hooks": [
    {
      "type": "command",
      "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/type-check.sh",
      "statusMessage": "Running type check"
    }
  ]
}
```

### Prompt Hook

```json
{
  "hooks": [
    {
      "type": "prompt",
      "prompt": "Evaluate if all tasks are complete. If not, respond with {\"ok\": false, \"reason\": \"what remains\"}.",
      "timeout": 30
    }
  ]
}
```

### Agent Hook

```json
{
  "hooks": [
    {
      "type": "agent",
      "prompt": "Verify that all unit tests pass. Run the test suite. $ARGUMENTS",
      "timeout": 120
    }
  ]
}
```

### HTTP Hook

```json
{
  "hooks": [
    {
      "type": "http",
      "url": "https://hooks.example.com/audit",
      "headers": { "Authorization": "Bearer $HOOK_TOKEN" }
    }
  ]
}
```

### MCP Tool Hook

```json
{
  "hooks": [
    {
      "type": "mcp_tool",
      "server": "my_server",
      "tool": "security_scan",
      "input": { "file_path": "${tool_input.file_path}" }
    }
  ]
}
```

## Rules

- **Command hooks**: use `jq` to extract file path from stdin JSON. Filter by extension or matcher. Prefer `bunx` over global binaries. Make script executable with `chmod +x`.
- **Prompt/Agent hooks**: return `{"ok": true/false, "reason": "..."}` via stdout.
- **HTTP hooks**: Claude POSTs the event JSON to the URL. Response can return decisions in the same format as command hooks.
- **MCP hooks**: the server must already be connected via MCP.
- **Status message**: max 4 words, ends with `...` (command hooks only).
- **Async**: only command hooks support `"async": true`.
- **Filtering**: use `"matcher"` for tool name filtering and `"if"` for argument-level filtering (e.g. `"if": "Bash(rm *)"`).

## Command Hook Example

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
      "statusMessage": "Running type check"
    }
  ]
}
```
