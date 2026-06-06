#!/usr/bin/env bash
set -euo pipefail

SPECS=()
for arg in "$@"; do
  if [[ ! "$arg" =~ ^(core|web)@.+$ ]]; then
    echo "Invalid spec \"$arg\". Expected: core@<version> or web@<version>" >&2
    exit 1
  fi
  SPECS+=("@jsfns/$arg")
done

if [ ${#SPECS[@]} -gt 0 ]; then
  pnpm add "${SPECS[@]}"
else
  pnpm --config.prefer-online=true update @jsfns/core @jsfns/web --latest
fi

pnpm exec svelte-kit sync
pnpm run build-data
pnpm exec vite build

git checkout HEAD -- package.json pnpm-lock.yaml
pnpm install
