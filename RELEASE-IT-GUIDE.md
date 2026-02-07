# Release-it Guide

## Overview

Your project now uses **release-it** for automated releases. When you push a git tag, it automatically:

1. ✅ Publishes to npm
2. ✅ Creates GitHub release with changelog
3. ✅ Updates CHANGELOG.md

## How to Release

### Step 1: Make your changes and commit

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Step 2: Create and push a version tag

```bash
# For patch release (1.0.0 → 1.0.1)
git tag v1.0.1
git push origin v1.0.1

# For minor release (1.0.0 → 1.1.0)
git tag v1.1.0
git push origin v1.1.0

# For major release (1.0.0 → 2.0.0)
git tag v2.0.0
git push origin v2.0.0
```

### Step 3: Watch the workflow

Go to: https://github.com/yeasin2002/cls-extended-protoype/actions

The workflow will:
- Extract version from tag
- Update package.json version
- Build the package
- Run type checks
- Publish to npm
- Generate changelog
- Create GitHub release
- Update CHANGELOG.md

## Alternative: Use release-it locally (Optional)

You can also use release-it locally for interactive releases:

```bash
cd packages/cls-extended

# Interactive release (will prompt for version)
pnpm release

# Specific version
pnpm release -- --increment=patch
pnpm release -- --increment=minor
pnpm release -- --increment=major

# Dry run (test without publishing)
pnpm release -- --dry-run
```

**Note**: Local releases require `GITHUB_TOKEN` and `NPM_TOKEN` environment variables.

## What Gets Published

### npm Package
- **URL**: https://www.npmjs.com/package/cls-extended
- **Access**: Public
- **Provenance**: Enabled (shows GitHub Actions build)

### GitHub Release
- **URL**: https://github.com/yeasin2002/cls-extended-protoype/releases
- **Includes**: 
  - Release notes with emoji sections
  - Commit history
  - Breaking changes highlighted

### CHANGELOG.md
- **Location**: `packages/cls-extended/CHANGELOG.md`
- **Format**: Compact with emojis
- **Sections**: Features, Fixes, Performance, Docs, etc.

## Changelog Format

Your changelog will look like this:

```markdown
# Changelog

## v1.1.0 (2026-02-08)

✨ Feature: add custom breakpoints support
🐛 Fix: resolve parsing error in JSX
⚡ Performance: optimize AST traversal
📚 Docs: update README examples
```

## Version Naming Convention

Follow semantic versioning:

- **Patch** (1.0.x): Bug fixes, small updates
- **Minor** (1.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

## Example Release Flow

```bash
# 1. Develop feature
git checkout -b feature/custom-breakpoints
# ... make changes ...
git commit -m "feat: add custom breakpoint configuration"

# 2. Merge to main
git checkout main
git merge feature/custom-breakpoints
git push origin main

# 3. Create release tag
git tag v1.1.0
git push origin v1.1.0

# 4. Wait for GitHub Actions
# Check: https://github.com/yeasin2002/cls-extended-protoype/actions

# 5. Verify release
# npm: https://www.npmjs.com/package/cls-extended
# GitHub: https://github.com/yeasin2002/cls-extended-protoype/releases
```

## Troubleshooting

### Release workflow not running

**Check:**
- Tag format is `v*` (e.g., `v1.0.1`, not `1.0.1`)
- Tag was pushed: `git push origin v1.0.1`
- Workflow file exists: `.github/workflows/release.yml`

### npm publish failed

**Check:**
- `NPM_TOKEN` is set in GitHub secrets
- Token hasn't expired
- You have publish rights to `cls-extended`
- Package name is correct

### GitHub release failed

**Check:**
- `GITHUB_TOKEN` has correct permissions
- Repository settings allow GitHub Actions to create releases

### Version already exists

If you accidentally push the same version:

```bash
# Delete local tag
git tag -d v1.0.1

# Delete remote tag
git push origin :refs/tags/v1.0.1

# Create new tag with correct version
git tag v1.0.2
git push origin v1.0.2
```

## Configuration Files

### `.github/workflows/release.yml`
- Triggers on `v*` tags
- Builds, tests, and publishes
- Creates GitHub release

### `packages/cls-extended/.release-it.json`
- release-it configuration
- Changelog generation settings
- npm and GitHub publish settings

### `packages/cls-extended/.auto-changelog`
- Changelog format configuration
- Emoji mappings for commit types

## Testing Before Release

Before creating a tag, test locally:

```bash
# Build
pnpm --filter cls-extended build

# Type check
pnpm --filter cls-extended typecheck

# Test (when enabled)
pnpm --filter cls-extended test --run

# Dry run release
cd packages/cls-extended
pnpm release -- --dry-run
```

## Next Steps

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Test the workflow**:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

3. **Monitor the release**:
   - GitHub Actions: https://github.com/yeasin2002/cls-extended-protoype/actions
   - npm: https://www.npmjs.com/package/cls-extended
   - Releases: https://github.com/yeasin2002/cls-extended-protoype/releases

## Summary

✅ **Simple workflow**: Just push a tag  
✅ **Automatic publishing**: npm + GitHub releases  
✅ **Beautiful changelogs**: With emojis and sections  
✅ **No manual steps**: Everything automated  
✅ **Provenance**: npm shows GitHub Actions build  

Just commit, tag, and push. The rest happens automatically! 🚀
