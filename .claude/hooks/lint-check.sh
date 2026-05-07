#!/bin/bash
set -uo pipefail

f=$(jq -r '.tool_input.file_path // .tool_response.filePath')

if [[ "$f" != *.ts && "$f" != *.tsx && "$f" != *.js && "$f" != *.jsx ]]; then
  exit 0
fi

if [[ ! -f "$f" ]]; then
  exit 0
fi

# Run ESLint with the project config and capture output
output=$(bunx eslint "$f" 2>&1) || true

# Filter out empty/no-error output
if [[ -z "$output" ]] || [[ "$output" == *"0 errors"* ]] || [[ "$output" == *"No files matching"* ]]; then
  exit 0
fi

# Show all lint errors (not just deprecation)
echo "⚠️  LINT ERRORS DETECTED:" >&2
echo "" >&2
echo "$output" >&2
echo "" >&2
echo "Tip: Run 'bun lint' to auto-fix where possible." >&2
