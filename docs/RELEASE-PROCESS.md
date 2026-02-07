# Release Process Documentation

This document explains how releases are automated for cls-extended using semantic-release.

## Overview

cls-extended uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate the entire package release workflow, including:

- Determining the next version number based on commit messages
- Generating release notes and changelog
- Publishing to npm
- Creating GitHub releases
- Updating package.json and CHANGELOG.md

## Commit Message Format

We follow the [Angular Commit Message Conventions](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit). This format is crucial as it determines the version bump.

### Commit Message Structure

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types and Version Bumps

| Commit Type | Description | Version Bump | Example |
|------------|-------------|--------------|---------|
| `fix:` | Bug fixes | Patch (0.0.x) | `fix: resolve parsing error in JSX` |
| `feat:` | New features | Minor (0.x.0) | `feat: add support for custom breakpoints` |
| `BREAKING CHANGE:` | Breaking changes | Major (x.0.0) | `feat: redesign API\n\nBREAKING CHANGE: removed old tw() function` |
| `docs:` | Documentation only | No release | `docs: update README examples` |
| `style:` | Code style changes | Patch (0.0.x) | `style: format code with prettier` |
| `refactor:` | Code refactoring | Patch (0.0.x) | `refactor: simplify parser logic` |
| `perf:` | Performance improvements | Patch (0.0.x) | `perf: optimize AST traversal` |
| `test:` | Adding tests | No release | `test: add edge case tests` |
| `chore:` | Maintenance tasks | No release | `chore: update dependencies` |
| `ci:` | CI configuration | No release | `ci: add release workflow` |

### Examples

**Patch Release (0.0.x)**
```bash
git commit -m "fix: handle empty className attributes correctly"
```

**Minor Release (0.x.0)**
```bash
git commit -m "feat: add support for arbitrary values in responsive classes"
```

**Major Release (x.0.0)**
```bash
git commit -m "feat: redesign plugin API

BREAKING CHANGE: The plugin now requires unplugin v3.0 or higher.
The old configuration format is no longer supported."
```

**Multiple Changes**
```bash
git commit -m "feat: add hover variant support

- Implement hover: prefix transformation
- Add tests for hover variants
- Update documentation

Closes #42"
```

## Release Workflow

### Automatic Releases

Releases happen automatically when commits are pushed to the `main` branch:

1. **Developer pushes to main** (or merges a PR)
2. **CI runs tests** - Lint, type check, build, and test
3. **Semantic-release analyzes commits** - Determines version bump
4. **Version is updated** - package.json and CHANGELOG.md
5. **Package is built** - Production build created
6. **Published to npm** - Package available on npm registry
7. **GitHub release created** - Release notes generated
8. **Git tag created** - Version tag pushed to repository

### Manual Release (Emergency)

If you need to trigger a release manually:

```bash
# Ensure you're on main branch
git checkout main
git pull origin main

# Navigate to the package
cd packages/cls-extended

# Run semantic-release
npx semantic-release@25
```

**Note**: You'll need `GITHUB_TOKEN` and `NPM_TOKEN` environment variables set.

## First Release (v0.1.0)

To trigger the first release, you need at least one commit with a feature or fix:

```bash
# Make sure all changes are committed
git add .
git commit -m "feat: initial release of cls-extended

- Universal build plugin for Tailwind CSS
- Support for Vite, Webpack, Rollup, and more
- Zero runtime overhead with build-time transformation
- Full TypeScript support"

# Push to main
git push origin main
```

This will trigger the release workflow and publish v0.1.0 (or the appropriate version based on commits).

## Configuration

### Package Configuration

The package is configured in `packages/cls-extended/package.json`:

```json
{
  "name": "cls-extended",
  "version": "0.0.0-development",
  "publishConfig": {
    "access": "public"
  }
}
```

**Note**: The version is set to `0.0.0-development` because semantic-release manages it automatically.

### Semantic-Release Configuration

Located in `packages/cls-extended/.releaserc.json`:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

### GitHub Actions Workflow

Located in `.github/workflows/release.yml`:

- Triggers on push to `main` branch
- Runs tests before releasing
- Requires `GITHUB_TOKEN` and `NPM_TOKEN` secrets

## Required Secrets

### NPM_TOKEN

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Login to your account
3. Click on your profile → Access Tokens
4. Generate New Token → Classic Token
5. Select "Automation" type
6. Copy the token
7. Add to GitHub: Repository Settings → Secrets and variables → Actions → New repository secret
   - Name: `NPM_TOKEN`
   - Value: (paste your token)

### GITHUB_TOKEN

This is automatically provided by GitHub Actions. No manual setup needed.

**Permissions Required** (already configured in workflow):
- `contents: write` - Create releases and tags
- `issues: write` - Comment on issues
- `pull-requests: write` - Comment on PRs

## Release Branches

Currently configured for single-branch releases:

- **main** - Production releases (latest)

### Future: Multiple Release Channels

You can configure additional branches for pre-releases:

```json
{
  "branches": [
    "main",
    { "name": "next", "prerelease": true },
    { "name": "beta", "prerelease": true }
  ]
}
```

## Troubleshooting

### Release Not Triggering

**Problem**: Pushed to main but no release happened.

**Solutions**:
1. Check commit messages follow conventional format
2. Verify CI workflow passed all tests
3. Check GitHub Actions logs for errors
4. Ensure commits since last release warrant a version bump

### NPM Publish Failed

**Problem**: Release created but npm publish failed.

**Solutions**:
1. Verify `NPM_TOKEN` is valid and not expired
2. Check package name is available on npm
3. Ensure you have publish rights to the package
4. Verify package.json has correct `publishConfig`

### Version Conflict

**Problem**: Version already exists on npm.

**Solutions**:
1. This shouldn't happen with semantic-release
2. Check if someone manually published
3. May need to manually bump version and re-release

### Build Failures

**Problem**: Release fails during build step.

**Solutions**:
1. Run `pnpm build` locally to reproduce
2. Fix build errors
3. Commit fixes with appropriate message
4. Push to trigger new release

## Best Practices

### Commit Messages

✅ **Good Examples**:
```bash
feat: add dark mode variant support
fix: resolve memory leak in parser
docs: add migration guide for v2
perf: optimize bundle size by 20%
```

❌ **Bad Examples**:
```bash
update stuff
fixed bug
WIP
changes
```

### Pull Requests

1. Use conventional commit format in PR title
2. Squash commits when merging
3. PR title becomes the commit message
4. Include breaking changes in PR description

### Testing Before Release

Always ensure:
- [ ] All tests pass locally
- [ ] Build succeeds
- [ ] Documentation is updated
- [ ] Examples work with changes

## Monitoring Releases

### GitHub Releases

View all releases: https://github.com/yeasin2002/cls-extended-protoype/releases

Each release includes:
- Version number and tag
- Release notes (auto-generated)
- Commit history
- Distribution files

### npm Package

View on npm: https://www.npmjs.com/package/cls-extended

Check:
- Latest version published
- Download statistics
- Package size

### Changelog

View `packages/cls-extended/CHANGELOG.md` for complete version history.

## Version Strategy

### Pre-1.0.0 (Current)

- Breaking changes increment minor version (0.x.0)
- Features increment minor version (0.x.0)
- Fixes increment patch version (0.0.x)

### Post-1.0.0 (Future)

- Breaking changes increment major version (x.0.0)
- Features increment minor version (0.x.0)
- Fixes increment patch version (0.0.x)

## Emergency Procedures

### Unpublish a Release

If a critical bug is found immediately after release:

```bash
# Unpublish from npm (within 72 hours)
npm unpublish cls-extended@<version>

# Delete GitHub release
# Go to Releases → Edit → Delete release

# Delete Git tag
git tag -d v<version>
git push origin :refs/tags/v<version>
```

**Note**: Unpublishing is discouraged. Prefer publishing a patch release.

### Hotfix Release

For critical bugs in production:

1. Create fix on main branch
2. Commit with `fix:` prefix
3. Push to main
4. Automatic patch release will be created

## Resources

- [Semantic Release Documentation](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)

## Support

For questions about the release process:
- Open an issue on GitHub
- Check GitHub Actions logs
- Review semantic-release documentation
