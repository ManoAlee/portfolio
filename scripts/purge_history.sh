#!/usr/bin/env bash
set -euo pipefail
# Purge sensitive binary files from git history.
# Usage: run this locally in a clone of the repo (not in CI). Read the comments first.

# Files/paths to remove (edit if you want to change)
TARGETS=(
  "docs/Relatorio Bellacor.pdf"
  "docs/Projeto Dashboard.pbix"
  "docs/CARTA DE AUTORIZAÇÃO.pdf"
  "backup_20251003"
)

echo "This script will permanently remove the following paths from git history:"
for p in "${TARGETS[@]}"; do echo " - $p"; done

echo
read -p "Do you want to continue? Type 'yes' to proceed: " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "Aborted by user."; exit 1
fi

# 1) Create a backup branch (safe copy of current history)
git branch -f backup-before-purge HEAD
echo "Created/updated branch 'backup-before-purge' as backup of current HEAD."

# 2) Preferred: git-filter-repo (fast, safe)
if command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo found. Using it to remove paths..."
  # Build --path arguments
  ARGS=()
  for p in "${TARGETS[@]}"; do ARGS+=(--path "$p"); done
  # invert-paths removes these paths from history
  git filter-repo --invert-paths "${ARGS[@]}"
  echo "git-filter-repo finished."
  echo "Run 'git push --force --all' and 'git push --force --tags' to update remotes."
  exit 0
fi

# 3) Alternative: BFG Repo-Cleaner (requires Java, lean on local machine)
if command -v java >/dev/null 2>&1; then
  echo "Java available. If you prefer BFG, download BFG jar and run it like this (instructions):"
  echo "  java -jar bfg.jar --delete-files 'docs/Relatorio Bellacor.pdf' --delete-files 'docs/Projeto Dashboard.pbix' --delete-files 'docs/CARTA DE AUTORIZAÇÃO.pdf'"
  echo "  # then run: git reflog expire --expire=now --all && git gc --prune=now --aggressive"
  echo "  # and finally force-push."
  echo
fi

# 4) Fallback: git filter-branch (slow, built-in). This is destructive and slow for large repos.
read -p "git-filter-repo not found. Do you want to run fallback git filter-branch here? Type 'yes' to proceed: " FB
if [ "$FB" != "yes" ]; then
  echo "Skipped filter-branch. You can run git-filter-repo locally or use the BFG alternative. Exiting."; exit 0
fi

# Build an index-filter that removes the paths. Use proper quoting.
INDEX_CMDS=()
for p in "${TARGETS[@]}"; do
  # Use printf %q to escape paths for safe shell eval
  ESCAPED=$(printf "%q" "$p")
  INDEX_CMDS+=("git rm -r --cached --ignore-unmatch $ESCAPED || true")
done

INDEX_FILTER=""
for c in "${INDEX_CMDS[@]}"; do INDEX_FILTER+="$c; "; done

echo "Running git filter-branch (this may take a long time)."
# Run filter-branch
# Note: tree-filter can also be used but is much slower.
git filter-branch --force --index-filter "$INDEX_FILTER" --prune-empty --tag-name-filter cat -- --all

# Clean up backup refs left by filter-branch
rm -rf .git/refs/original/ || true
git reflog expire --expire=now --all || true
git gc --prune=now --aggressive || true

echo "Filter-branch completed. Now force-push updates to remote (YOU must verify):"
echo "  git push origin --force --all"
echo "  git push origin --force --tags"

echo "DONE."
