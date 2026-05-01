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
  bunx tsc --noEmit --project "$tmpfile" >&2
fi