---
title: "Romez"
date: "2023-01-05"
draft: false
path: "/blog/dev/rome/"
---

my current `rome.json` settings
```json
{
  "formatter": {
    "indentStyle": "space",
    "ignore": [
      "./node_modules/**/*.*",
      "./.yarn/**/*.*",
      "./dist/**/*.*"
    ]
  },
  "linter": {
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "off"
      },
      "a11y": {
        "useKeyWithClickEvents": "off"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteProperties": "preserve"
    }
  }
}
```