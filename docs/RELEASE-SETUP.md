# Semantic Release Setup Guide

Quick guide to set up automated releases for cls-extended.

## Prerequisites

- [x] GitHub repository created
- [x] npm account created
- [ ] npm token generated
- [ ] GitHub repository secrets configured

## Step-by-Step Setup

### 1. Create npm Account (if needed)

1. Go to [npmjs.com/signup](https://www.npmjs.com/signup)
2. Create an account
3. Verify your email

### 2. Generate npm Token

1. Login to [npmjs.com](https://www.npmjs.com/)
2. Click your profile picture → **Access Tokens**
3. Click **Generate New Token** → **Classic Token**
4. Select **Automation** type
5. Copy the token (starts with `npm_...`)

**Important**: Save this token securely. You won't be able to see it again.

### 3. Add npm Token to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

### 4. Configure GitHub Permissions

The workflow already has the correct permissions configured:

```yaml
permissions:
  contents: write # Create releases and tags
  issues: write # Comment on resolved issues
  pull-requests: write # Comment on merged PRs
  id-token: write # npm provenance
```

### 5. Verify Package Configuration

Check `packages/cls-extended/package.json`:

```json
{
  "name": "cls-extended",
  "version": "0.0.0-development",
  "publishConfig": {
    "access": "public"
  }
}
```

✅ Package name is correct
✅ Version is set to development
✅ Public access is configured

### 6. Test Locally (Optional)

Before pushing, you can test the release process locally:

```bash
# Install semantic-release globally (optional)
npm install -g semantic-release@25

# Navigate to package
cd packages/cls-extended

# Dry run (doesn't publish)
npx semantic-release --dry-run

# Check what would be released
npx semantic-release --dry-run --debug
```

### 7. Create First Release Commit

Create a commit that will trigger the first release:

```bash
# Ensure you're on main branch
git checkout main

# Create a feature commit
git add .
git commit -m "feat: initial release of cls-extended

This is the first public release of cls-extended, a universal
build plugin for transforming responsive Tailwind CSS syntax.

Features:
- Zero runtime overhead with build-time transformation
- Support for Vite, Webpack, Rollup, and more
- Full TypeScript support
- Comprehensive test coverage"

# Push to trigger release
git push origin main
```

### 8. Monitor Release

1. Go to **Actions** tab in GitHub
2. Watch the **Release** workflow
3. Check for any errors

Expected steps:

- ✅ Checkout code
- ✅ Setup Node.js and pnpm
- ✅ Install dependencies
- ✅ Build package
- ✅ Run tests
- ✅ Semantic release (analyze, publish, create release)

### 9. Verify Release

After successful release:

**On GitHub:**

- Check [Releases](https://github.com/yeasin2002/cls-extended-protoype/releases)
- Verify release notes are generated
- Confirm Git tag is created

**On npm:**

- Visit https://www.npmjs.com/package/cls-extended
- Verify version is published
- Check package contents

**In Repository:**

- Check `packages/cls-extended/package.json` - version updated
- Check `packages/cls-extended/CHANGELOG.md` - changelog generated
- Check Git tags: `git tag -l`

## Troubleshooting

### Release Workflow Not Running

**Check:**

- Workflow file exists: `.github/workflows/release.yml`
- Pushed to `main` branch (not a PR)
- Commit message follows conventional format

### npm Publish Failed

**Error**: `401 Unauthorized`

**Solution**:

- Verify `NPM_TOKEN` secret is set correctly
- Check token hasn't expired
- Ensure token has "Automation" type

**Error**: `403 Forbidden`

**Solution**:

- Package name might be taken
- You don't have publish rights
- Try a different package name

### No Version Bump

**Error**: `There are no relevant changes, so no new version is released`

**Solution**:

- Ensure commits follow conventional format
- Use `feat:` or `fix:` prefix
- Check commit messages since last release

### Build Failures

**Error**: Build or test failures

**Solution**:

1. Run locally: `pnpm build && pnpm test --run`
2. Fix any errors
3. Commit and push again

## Configuration Files

### `.releaserc.json`

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

### `release.yml`

Located in `.github/workflows/release.yml`:

- Triggers on push to `main`
- Runs tests before release
- Uses semantic-release v25

## Next Steps

After first release:

1. **Update README badges**

   ```markdown
   [![npm version](https://img.shields.io/npm/v/cls-extended.svg)](https://www.npmjs.com/package/cls-extended)
   [![npm downloads](https://img.shields.io/npm/dm/cls-extended.svg)](https://www.npmjs.com/package/cls-extended)
   ```

2. **Test installation**

   ```bash
   npm install -D cls-extended
   ```

3. **Monitor usage**
   - Check npm download stats
   - Watch for issues
   - Respond to feedback

4. **Plan next release**
   - Use conventional commits
   - Follow semantic versioning
   - Update documentation

## Commit Message Cheat Sheet

```bash
# Patch release (0.0.x)
git commit -m "fix: resolve parsing error"

# Minor release (0.x.0)
git commit -m "feat: add new feature"

# Major release (x.0.0) - after 1.0.0
git commit -m "feat: breaking change

BREAKING CHANGE: API redesigned"

# No release
git commit -m "docs: update README"
git commit -m "chore: update dependencies"
git commit -m "test: add more tests"
```

## Support

- [Semantic Release Docs](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## Checklist

Before first release:

- [ ] npm account created
- [ ] npm token generated
- [ ] `NPM_TOKEN` secret added to GitHub
- [ ] Package name available on npm
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Conventional commit created
- [ ] Pushed to main branch

After first release:

- [ ] Release appears on GitHub
- [ ] Package published to npm
- [ ] CHANGELOG.md updated
- [ ] Git tag created
- [ ] Installation tested
- [ ] README badges updated
