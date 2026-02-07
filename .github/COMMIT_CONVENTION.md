# Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated releases.

## Quick Reference

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description | Release |
|------|-------------|---------|
| `feat` | New feature | Minor (0.x.0) |
| `fix` | Bug fix | Patch (0.0.x) |
| `docs` | Documentation only | None |
| `style` | Code style/formatting | Patch (0.0.x) |
| `refactor` | Code refactoring | Patch (0.0.x) |
| `perf` | Performance improvement | Patch (0.0.x) |
| `test` | Adding tests | None |
| `chore` | Maintenance | None |
| `ci` | CI configuration | None |

### Breaking Changes

Add `BREAKING CHANGE:` in the footer for major releases:

```
feat: redesign plugin API

BREAKING CHANGE: The configuration format has changed.
Old format is no longer supported.
```

## Examples

### Patch Release (0.0.x)

```bash
fix: resolve parsing error in nested JSX components
```

```bash
fix(parser): handle empty className attributes

Previously, empty className attributes would cause a parsing error.
This fix adds proper handling for empty strings.

Closes #123
```

### Minor Release (0.x.0)

```bash
feat: add support for custom breakpoints
```

```bash
feat(config): add custom breakpoint configuration

Users can now define custom breakpoints in the plugin options:

```js
clsExtended({
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  }
})
```

Closes #45
```

### Major Release (x.0.0)

```bash
feat: redesign plugin API

BREAKING CHANGE: The plugin configuration has been redesigned.
The old `options` parameter is now `config`. Update your configuration:

Before:
```js
clsExtended({ options: { ... } })
```

After:
```js
clsExtended({ config: { ... } })
```
```

### No Release

```bash
docs: update README with new examples
```

```bash
chore: update dependencies to latest versions
```

```bash
test: add edge case tests for parser
```

## Scopes (Optional)

Common scopes for this project:

- `parser` - AST parsing logic
- `transform` - Code transformation
- `config` - Configuration handling
- `api` - Runtime API
- `vite` - Vite adapter
- `webpack` - Webpack adapter
- `docs` - Documentation
- `ci` - CI/CD

Example:
```bash
feat(parser): improve JSX parsing performance
fix(webpack): resolve compatibility issue with webpack 5
docs(api): add examples for cls() function
```

## Multi-line Commits

For detailed commits:

```bash
git commit -m "feat: add hover variant support" -m "
This adds support for hover: prefix in responsive classes.

Features:
- Hover variant transformation
- Tests for hover variants
- Documentation updates

Closes #42
"
```

Or use an editor:
```bash
git commit
```

Then write:
```
feat: add hover variant support

This adds support for hover: prefix in responsive classes.

Features:
- Hover variant transformation
- Tests for hover variants
- Documentation updates

Closes #42
```

## Tools

### Commitizen

Install commitizen for interactive commits:

```bash
npm install -g commitizen cz-conventional-changelog

# Configure
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc

# Use
git cz
```

### Commitlint

Install commitlint to validate commits:

```bash
npm install -D @commitlint/cli @commitlint/config-conventional

# Configure
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# Add to husky
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## Tips

### Good Commits

✅ Clear and concise
```bash
feat: add dark mode support
fix: resolve memory leak in parser
docs: add migration guide
```

✅ Descriptive body
```bash
feat: add custom breakpoint support

Users can now define their own breakpoints in the configuration.
This provides more flexibility for different design systems.
```

✅ Reference issues
```bash
fix: handle edge case in JSX parsing

Closes #123
Fixes #124
```

### Bad Commits

❌ Vague messages
```bash
update stuff
fix bug
changes
WIP
```

❌ Missing type
```bash
added new feature
fixed the parser
```

❌ Wrong type
```bash
feat: fix typo in README  # Should be docs:
fix: add new feature      # Should be feat:
```

## Commit Message Template

Create `.gitmessage` in your home directory:

```
# <type>(<scope>): <subject>
# |<----  Using a Maximum Of 50 Characters  ---->|

# Explain why this change is being made
# |<----   Try To Limit Each Line to a Maximum Of 72 Characters   ---->|

# Provide links or keys to any relevant tickets, articles or other resources
# Example: Closes #23

# --- COMMIT END ---
# Type can be
#    feat     (new feature)
#    fix      (bug fix)
#    refactor (refactoring code)
#    style    (formatting, missing semi colons, etc; no code change)
#    docs     (changes to documentation)
#    test     (adding or refactoring tests; no production code change)
#    chore    (updating grunt tasks etc; no production code change)
# --------------------
# Remember to
#    Capitalize the subject line
#    Use the imperative mood in the subject line
#    Do not end the subject line with a period
#    Separate subject from body with a blank line
#    Use the body to explain what and why vs. how
#    Can use multiple lines with "-" for bullet points in body
# --------------------
```

Configure git to use it:
```bash
git config --global commit.template ~/.gitmessage
```

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
