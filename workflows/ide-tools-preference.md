---
description: Always prefer IDE tools over terminal commands for file searching and reading
---

# IDE Tools Preference

When searching for or reading files, prefer IDE tools over terminal equivalents:

- Use `grep_search` instead of `grep` or `findstr`
- Use `find_by_name` instead of `find` or `dir`
- Use `view_file` and `view_file_outline` instead of `cat` or `type`
- Use `view_code_item` to inspect specific functions/classes

This ensures consistent, cross-platform behaviour and avoids encoding or path issues on Windows.
