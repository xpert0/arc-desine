#!/usr/bin/env bash

INJECT='<script src="/static/badge.js" defer></script>'

echo "Injecting badge script into HTML files in $ROOT"

find ./ -type f -name "*.html" | while read -r file; do

  # Skip if already injected
  if grep -q "/static/badge.js" "$file"; then
    continue
  fi

  # Inject before </body>
  if grep -q "</body>" "$file"; then
    sed -i "s#</body>#$INJECT\n</body>#g" "$file"
    echo "✔ Injected: $file"
  fi

done

echo "✅ Injection complete"
