#!/bin/bash
set -uo pipefail

f=$(jq -r '.tool_input.file_path // .tool_response.filePath')

if [[ "$f" != *.ts && "$f" != *.tsx ]]; then
  exit 0
fi

# Run ESLint with the project config and capture output
output=$(bunx eslint "$f" 2>/dev/null || true)

# Filter for actual deprecation errors
deprecation_errors=$(echo "$output" | grep -E 'no-deprecated' || true)

if [[ -n "$deprecation_errors" ]]; then
  echo "⚠️  DEPRECATED API USAGE DETECTED:" >&2
  echo "$deprecation_errors" >&2
  echo "" >&2
  echo "Tip: Update the code to use the recommended replacement." >&2
fi
