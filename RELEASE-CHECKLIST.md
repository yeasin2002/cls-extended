# 🚀 Release Checklist for cls-extended v0.1.0

Use this checklist to complete your first release to npm and GitHub.

## Pre-Release Checklist

### 1. npm Account Setup

- [ ] Create npm account at https://www.npmjs.com/signup (if needed)
- [ ] Verify email address
- [ ] Login to npm

### 2. Generate npm Token

- [ ] Go to https://www.npmjs.com/settings/[username]/tokens
- [ ] Click "Generate New Token" → "Classic Token"
- [ ] Select "Automation" type
- [ ] Copy token (starts with `npm_...`)
- [ ] Save token securely (you won't see it again)

### 3. Configure GitHub Secrets

- [ ] Go to https://github.com/yeasin2002/cls-extended-protoype/settings/secrets/actions
- [ ] Click "New repository secret"
- [ ] Name: `NPM_TOKEN`
- [ ] Value: Paste your npm token
- [ ] Click "Add secret"

### 4. Verify Package Name

- [ ] Check if `cls-extended` is available on npm
- [ ] Search at https://www.npmjs.com/package/cls-extended
- [ ] If taken, choose a different name and update `packages/core/package.json`

### 5. Final Code Review

- [ ] All tests passing: `pnpm test`
- [ ] Build succeeds: `pnpm build`
- [ ] Linting passes: `pnpm lint`
- [ ] Type checking passes: `pnpm typecheck`
- [ ] Documentation is complete
- [ ] Examples work correctly

### 6. Update Package Metadata (if needed)

- [ ] Check `packages/core/package.json`:
  - [ ] Name: `cls-extended`
  - [ ] Description is accurate
  - [ ] Keywords are relevant
  - [ ] Repository URL is correct
  - [ ] Author information is correct
  - [ ] License is correct (MIT)

## Release Process

### 7. Create Release Commit

**Choose your release method:**

**Option A: Automatic Release (Recommended)**
```bash
# Ensure you're on main branch
git checkout main
git pull origin main

# Stage all changes
git add .

# Create conventional commit for first release
git commit -m "feat: initial release of cls-extended

This is the first public release of cls-extended, a universal
build plugin for transforming responsive Tailwind CSS syntax.

Features:
- Zero runtime overhead with build-time transformation
- Support for Vite, Webpack, Rollup, Rolldown, esbuild, Rspack, and Farm
- Full TypeScript support with strict mode
- Comprehensive test suite with 100% coverage
- Runtime fallback for environments without plugin support
- Complete documentation and examples"

# Push to trigger automatic release
git push origin main
```

**Option B: Tag-Based Release**
```bash
# Create and push a version tag
git tag v0.1.0
git push origin v0.1.0
```

**Option C: Manual Release**
1. Go to Actions → Release workflow
2. Click "Run workflow"
3. Select "main" branch
4. Leave release type empty (auto-detect)
5. Click "Run workflow"

- [ ] Release method chosen
- [ ] Commit/tag created

### 8. Push to Trigger Release

```bash
git push origin main
```

- [ ] Pushed to main branch
- [ ] GitHub Actions workflow triggered

### 9. Monitor Release Workflow

- [ ] Go to https://github.com/yeasin2002/cls-extended-protoype/actions
- [ ] Click on the "Release" workflow
- [ ] Watch the progress:
  - [ ] Checkout ✓
  - [ ] Setup Node.js and pnpm ✓
  - [ ] Install dependencies ✓
  - [ ] Build package ✓
  - [ ] Run tests ✓
  - [ ] Semantic release ✓

### 10. Verify Release on GitHub

- [ ] Go to https://github.com/yeasin2002/cls-extended-protoype/releases
- [ ] Verify release v0.1.0 is created
- [ ] Check release notes are generated
- [ ] Verify Git tag is created
- [ ] Check distribution files are attached

### 11. Verify Release on npm

- [ ] Go to https://www.npmjs.com/package/cls-extended
- [ ] Verify version 0.1.0 is published
- [ ] Check package contents
- [ ] Verify package size
- [ ] Check that all exports are available

### 12. Test Installation

```bash
# Create a test directory
mkdir test-cls-extended
cd test-cls-extended

# Initialize a new project
npm init -y

# Install the package
npm install -D cls-extended

# Verify installation
npm list cls-extended
```

- [ ] Package installs successfully
- [ ] No installation errors
- [ ] Correct version installed

### 13. Test Package Usage

Create a test file:

```bash
# Create test file
cat > test.js << 'EOF'
import clsExtended from 'cls-extended/adapters/vite';
import { cls } from 'cls-extended/api';

console.log('Plugin:', typeof clsExtended);
console.log('API:', typeof cls);
console.log('Test:', cls('p-4', { md: 'p-6' }));
EOF

# Run test (Node.js with ESM)
node test.js
```

- [ ] Imports work correctly
- [ ] No runtime errors
- [ ] Functions are accessible

## Post-Release Tasks

### 14. Update Repository

- [ ] Pull latest changes: `git pull origin main`
- [ ] Verify `package.json` version updated
- [ ] Verify `CHANGELOG.md` created/updated
- [ ] Verify release commit is present

### 15. Update Documentation

- [ ] Add installation badge to README
- [ ] Update version references in docs
- [ ] Add migration guide (if needed)
- [ ] Update examples with new version

### 16. Announce Release

- [ ] Create announcement on GitHub Discussions
- [ ] Tweet about the release (if applicable)
- [ ] Post on relevant communities
- [ ] Update project website (if applicable)

### 17. Monitor for Issues

- [ ] Watch GitHub issues
- [ ] Monitor npm download stats
- [ ] Check for installation problems
- [ ] Respond to community feedback

## Troubleshooting

### If Release Fails

**Check GitHub Actions logs:**

```
https://github.com/yeasin2002/cls-extended-protoype/actions
```

**Common issues:**

1. **npm publish failed (401 Unauthorized)**
   - Verify NPM_TOKEN is set correctly
   - Check token hasn't expired
   - Regenerate token if needed

2. **npm publish failed (403 Forbidden)**
   - Package name might be taken
   - Check if you have publish rights
   - Try a different package name

3. **Tests failed**
   - Run tests locally: `pnpm test --run`
   - Fix failing tests
   - Commit and push again

4. **Build failed**
   - Run build locally: `pnpm build`
   - Fix build errors
   - Commit and push again

5. **No version bump**
   - Check commit message format
   - Ensure using `feat:` or `fix:` prefix
   - Verify commits since last release

### Manual Release (Emergency)

If automated release fails, you can release manually:

```bash
cd packages/core

# Set npm token
export NPM_TOKEN=your_token_here

# Run semantic-release
npx semantic-release@25
```

## Success Criteria

Release is successful when:

- ✅ GitHub release created with v0.1.0
- ✅ Git tag v0.1.0 exists
- ✅ Package published to npm
- ✅ CHANGELOG.md updated
- ✅ package.json version updated
- ✅ Installation works
- ✅ Package is usable

## Next Release

For future releases, simply:

1. Make changes
2. Commit with conventional format
3. Push to main
4. Automated release happens

Example commits:

```bash
# Patch release (0.1.0 → 0.1.1)
git commit -m "fix: resolve parsing error in JSX"

# Minor release (0.1.0 → 0.2.0)
git commit -m "feat: add support for custom breakpoints"

# Major release (0.1.0 → 1.0.0) - after 1.0.0
git commit -m "feat: redesign plugin API

BREAKING CHANGE: Configuration format has changed"
```

## Resources

- [Release Process Guide](./docs/RELEASE-PROCESS.md)
- [Setup Guide](./docs/RELEASE-SETUP.md)
- [Semantic Release Docs](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Support

Need help?

- Check documentation in `docs/` folder
- Review GitHub Actions logs
- Open an issue on GitHub
- Check semantic-release documentation

---

**Good luck with your first release! 🎉**
