# 🚀 Release System Features

## Overview

Your cls-extended project now has a **production-ready, multi-method release system** with enhanced release notes and automatic notifications.

## ✨ Key Features

### 1. Three Release Methods

#### 🔄 Automatic (Push to Main)
```bash
git commit -m "feat: add new feature"
git push origin main
```
- ✅ Automatic version detection
- ✅ Runs on every push to main
- ✅ Best for regular development

#### 🏷️ Tag-Based (Version Tags)
```bash
git tag v1.2.3
git push origin v1.2.3
```
- ✅ Specific version control
- ✅ Useful for hotfixes
- ✅ Manual version selection

#### 🎯 Manual (GitHub UI)
- ✅ Trigger via Actions tab
- ✅ Optional release type selection
- ✅ Perfect for emergencies

### 2. Enhanced Release Notes

Your releases include **beautiful, organized notes** with:

#### Emoji Sections
- ✨ **Features** - New functionality
- 🐛 **Bug Fixes** - Fixed issues
- ⚡ **Performance** - Speed improvements
- 📚 **Documentation** - Doc updates
- ♻️ **Refactoring** - Code improvements
- 💎 **Styles** - Formatting changes
- ✅ **Tests** - Test additions
- 🔨 **Build** - Build system changes
- 👷 **CI/CD** - CI configuration
- 🔧 **Chores** - Maintenance

#### Additional Information
- 🔗 **Commit links** - Direct links to each commit
- 🐛 **Issue references** - Links to closed issues
- 🔀 **PR references** - Links to merged PRs
- 👥 **Contributors** - List of contributors
- 🚨 **Breaking changes** - Highlighted at top

### 3. Automatic Notifications

#### Issue Comments
When an issue is resolved:
```
🎉 This issue has been resolved in version 1.2.0 🎉

The release is available on:
- npm package (@latest dist-tag)
- GitHub release

Your issue is now part of the published release! 🚀
```

#### PR Comments
When a PR is included:
```
🎉 This PR is included in version 1.2.0 🎉

The release is available on:
- npm package (@latest dist-tag)
- GitHub release

Your pull request is now part of the published release! 🚀
```

#### Automatic Labels
- `released` - Added to all issues/PRs in release

### 4. Complete Automation

Every release automatically:
1. ✅ Analyzes commits
2. ✅ Determines version bump
3. ✅ Generates release notes
4. ✅ Updates CHANGELOG.md
5. ✅ Updates package.json
6. ✅ Builds package
7. ✅ Publishes to npm
8. ✅ Creates GitHub release
9. ✅ Creates Git tag
10. ✅ Comments on issues/PRs
11. ✅ Adds labels

## 📖 Quick Start

### First Release

```bash
# Option 1: Automatic (Recommended)
git commit -m "feat: initial release"
git push origin main

# Option 2: Tag-Based
git tag v0.1.0
git push origin v0.1.0

# Option 3: Manual
# Go to Actions → Release → Run workflow
```

### Regular Releases

```bash
# Feature
git commit -m "feat: add hover support"
git push origin main
# → v0.2.0

# Bug Fix
git commit -m "fix: resolve parsing error"
git push origin main
# → v0.1.1

# Breaking Change
git commit -m "feat: redesign API

BREAKING CHANGE: Configuration changed"
git push origin main
# → v1.0.0
```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [Quick Start](./docs/RELEASE-QUICK-START.md) | One-page reference |
| [Complete Guide](./docs/RELEASE-WORKFLOWS.md) | Detailed workflows |
| [Configuration](./docs/RELEASE-CONFIGURATION-SUMMARY.md) | What was configured |
| [Process Guide](./docs/RELEASE-PROCESS.md) | Release process |
| [Setup Guide](./docs/RELEASE-SETUP.md) | Initial setup |
| [Commit Guide](./github/COMMIT_CONVENTION.md) | Commit format |
| [Checklist](./RELEASE-CHECKLIST.md) | Pre-release checklist |

## 🎯 Example Release Notes

```markdown
# [1.2.0](https://github.com/user/repo/compare/v1.1.0...v1.2.0) (2025-02-08)

## ✨ Features

* add support for custom breakpoints ([abc123](https://github.com/user/repo/commit/abc123)), closes [#42](https://github.com/user/repo/issues/42)
* implement hover variant transformation ([def456](https://github.com/user/repo/commit/def456))

## 🐛 Bug Fixes

* resolve parsing error in nested JSX ([ghi789](https://github.com/user/repo/commit/ghi789)), closes [#45](https://github.com/user/repo/issues/45)
* handle empty className attributes ([jkl012](https://github.com/user/repo/commit/jkl012))

## ⚡ Performance Improvements

* optimize AST traversal ([mno345](https://github.com/user/repo/commit/mno345))

## 📚 Documentation

* update README with new examples ([pqr678](https://github.com/user/repo/commit/pqr678))
* add migration guide ([stu901](https://github.com/user/repo/commit/stu901))
```

## 🔧 Configuration

### Workflow File
`.github/workflows/release.yml`

### Semantic Release Config
`packages/core/.releaserc.json`

### Required Secrets
- `GITHUB_TOKEN` - Automatic (provided by GitHub)
- `NPM_TOKEN` - Manual (add in repository settings)

## ✅ What's Included

- ✅ **3 release methods** (automatic, tag, manual)
- ✅ **Enhanced release notes** with emojis
- ✅ **Automatic comments** on issues/PRs
- ✅ **Automatic labels** on issues/PRs
- ✅ **CHANGELOG.md** auto-updated
- ✅ **npm publishing** with provenance
- ✅ **GitHub releases** with assets
- ✅ **Git tags** automatically created
- ✅ **Comprehensive docs** for all workflows
- ✅ **Production-ready** configuration

## 🎉 Ready to Use!

Everything is configured and ready. Just:

1. Add `NPM_TOKEN` to GitHub secrets
2. Push a commit with conventional format
3. Watch the magic happen! ✨

---

**Questions?** Check the [documentation](./docs/) or open an issue.
