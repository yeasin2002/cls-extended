# Release Workflows Guide

This document explains the different ways to trigger releases for cls-extended.

## Overview

The project supports three release workflows:

1. **Automatic Release** - Push to main branch
2. **Tag-Based Release** - Push a version tag
3. **Manual Release** - Trigger via GitHub Actions UI

## 1. Automatic Release (Recommended)

### How It Works

When you push commits to the `main` branch, semantic-release automatically:

- Analyzes commit messages
- Determines the next version
- Generates release notes
- Publishes to npm
- Creates GitHub release
- Updates CHANGELOG.md

### Usage

```bash
# Make changes and commit with conventional format
git add .
git commit -m "feat: add new feature"

# Push to main
git push origin main
```

### When to Use

- Regular development workflow
- Feature additions
- Bug fixes
- Documentation updates

## 2. Tag-Based Release

### How It Works

Push a version tag (e.g., `v1.2.3`) to trigger a release for that specific version.

### Usage

```bash
# Create and push a tag
git tag v1.2.3
git push origin v1.2.3
```

Or create a tag with annotation:

```bash
git tag -a v1.2.3 -m "Release version 1.2.3"
git push origin v1.2.3
```

### When to Use

- Creating a specific version
- Hotfix releases
- Re-releasing a version
- Manual version control

### Tag Format

Tags must follow the pattern: `v*` (e.g., `v1.0.0`, `v2.1.3`, `v0.1.0-beta.1`)

## 3. Manual Release (Workflow Dispatch)

### How It Works

Trigger a release manually from the GitHub Actions UI with optional release type selection.

### Usage

1. Go to **Actions** tab in GitHub
2. Select **Release** workflow
3. Click **Run workflow**
4. Select branch (usually `main`)
5. Choose release type (optional):
   - **Empty** - Auto-detect from commits
   - **patch** - Force patch release (0.0.x)
   - **minor** - Force minor release (0.x.0)
   - **major** - Force major release (x.0.0)
6. Click **Run workflow**

### When to Use

- Emergency releases
- Testing release process
- Overriding automatic version detection
- Releasing without new commits

## Release Notes Generation

### Automatic Release Notes

Semantic-release automatically generates comprehensive release notes with:

#### Sections

- ✨ **Features** - New features (`feat:` commits)
- 🐛 **Bug Fixes** - Bug fixes (`fix:` commits)
- ⚡ **Performance Improvements** - Performance updates (`perf:` commits)
- ⏪ **Reverts** - Reverted changes (`revert:` commits)
- 📚 **Documentation** - Documentation changes (`docs:` commits)
- 💎 **Styles** - Code style changes (`style:` commits)
- ♻️ **Code Refactoring** - Refactoring (`refactor:` commits)
- ✅ **Tests** - Test additions/changes (`test:` commits)
- 🔨 **Build System** - Build changes (`build:` commits)
- 👷 **CI/CD** - CI configuration (`ci:` commits)
- 🔧 **Chores** - Maintenance tasks (`chore:` commits)

#### Additional Information

- **Breaking Changes** - Highlighted at the top
- **Commit Links** - Links to individual commits
- **Issue References** - Links to closed issues
- **PR References** - Links to merged pull requests
- **Contributors** - List of contributors

### Example Release Notes

```markdown
# [1.2.0](https://github.com/user/repo/compare/v1.1.0...v1.2.0) (2025-02-08)

## ✨ Features

- add support for custom breakpoints ([abc123](https://github.com/user/repo/commit/abc123)), closes [#42](https://github.com/user/repo/issues/42)
- implement hover variant transformation ([def456](https://github.com/user/repo/commit/def456))

## 🐛 Bug Fixes

- resolve parsing error in nested JSX ([ghi789](https://github.com/user/repo/commit/ghi789)), closes [#45](https://github.com/user/repo/issues/45)

## 📚 Documentation

- update README with new examples ([jkl012](https://github.com/user/repo/commit/jkl012))
```

## Workflow Comparison

| Feature         | Automatic        | Tag-Based         | Manual            |
| --------------- | ---------------- | ----------------- | ----------------- |
| Trigger         | Push to main     | Push tag          | GitHub UI         |
| Version Control | Auto             | Manual            | Auto/Manual       |
| Commit Analysis | Yes              | No                | Yes               |
| Release Notes   | Auto-generated   | Auto-generated    | Auto-generated    |
| Best For        | Regular workflow | Specific versions | Emergency/Testing |

## Advanced Scenarios

### Hotfix Release

For urgent bug fixes:

```bash
# Option 1: Automatic (recommended)
git checkout main
git pull
git commit -m "fix: critical security patch"
git push origin main

# Option 2: Tag-based
git tag v1.2.4
git push origin v1.2.4

# Option 3: Manual
# Use GitHub Actions UI with "patch" type
```

### Pre-release Versions

For beta/alpha releases:

```bash
# Commit with pre-release identifier
git commit -m "feat: experimental feature

This is a beta release for testing."

# Tag with pre-release version
git tag v2.0.0-beta.1
git push origin v2.0.0-beta.1
```

### Skipping CI

To push without triggering a release:

```bash
git commit -m "chore: update dependencies [skip ci]"
git push origin main
```

## Release Notifications

### GitHub Comments

Semantic-release automatically comments on:

- **Issues** - When an issue is resolved in a release
- **Pull Requests** - When a PR is included in a release

Example comment:

```
🎉 This PR is included in version 1.2.0 🎉

The release is available on:
- npm package (@latest dist-tag)
- GitHub release

Your pull request is now part of the published release! 🚀
```

### Labels

Automatic labels added:

- `released` - Added to issues/PRs included in release
- `released-<channel>` - For multi-channel releases

## Troubleshooting

### Release Not Triggering

**Problem**: Pushed to main but no release happened.

**Solutions**:

1. Check commit messages follow conventional format
2. Verify CI workflow passed
3. Check if commits warrant a version bump
4. Review GitHub Actions logs

### Manual Release Failed

**Problem**: Manual release failed with error.

**Solutions**:

1. Check `NPM_TOKEN` is valid
2. Verify tests are passing
3. Ensure build succeeds
4. Check semantic-release logs

### Tag Release Not Working

**Problem**: Pushed tag but release didn't trigger.

**Solutions**:

1. Verify tag format: `v*` (e.g., `v1.0.0`)
2. Check tag was pushed: `git push origin v1.0.0`
3. Review GitHub Actions logs
4. Ensure workflow has correct permissions

## Best Practices

### Commit Messages

Always use conventional commit format:

```bash
# Good
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update README"

# Bad
git commit -m "updates"
git commit -m "fixed stuff"
git commit -m "WIP"
```

### Release Frequency

- **Automatic releases**: Use for regular development
- **Tag releases**: Use for specific version requirements
- **Manual releases**: Use sparingly for emergencies

### Version Strategy

- **Patch (0.0.x)**: Bug fixes, minor updates
- **Minor (0.x.0)**: New features, backward compatible
- **Major (x.0.0)**: Breaking changes

### Testing Before Release

Always ensure:

- [ ] All tests pass locally
- [ ] Build succeeds
- [ ] Documentation is updated
- [ ] Examples work correctly

## Monitoring Releases

### GitHub Releases

View all releases: https://github.com/yeasin2002/cls-extended-protoype/releases

### npm Package

View on npm: https://www.npmjs.com/package/cls-extended

### Changelog

View `packages/cls-extended/CHANGELOG.md` for complete history.

## Examples

### Example 1: Feature Release

```bash
# Develop feature
git checkout -b feature/custom-breakpoints
# ... make changes ...
git commit -m "feat: add custom breakpoint configuration"

# Merge to main
git checkout main
git merge feature/custom-breakpoints
git push origin main

# Automatic release triggered → v0.2.0
```

### Example 2: Hotfix Release

```bash
# Fix critical bug
git checkout main
git pull
git commit -m "fix: resolve security vulnerability"
git push origin main

# Automatic release triggered → v0.1.1
```

### Example 3: Manual Major Release

```bash
# Breaking change
git commit -m "feat: redesign plugin API

BREAKING CHANGE: Configuration format has changed"

# Trigger manual release via GitHub UI
# Select "major" type
# Release triggered → v1.0.0
```

## Resources

- [Semantic Release Documentation](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Release Process Guide](./RELEASE-PROCESS.md)
