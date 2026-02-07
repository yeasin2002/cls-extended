# Release Quick Start Guide

## 🚀 Three Ways to Release

### 1. Automatic (Recommended)

**Just push to main:**

```bash
git commit -m "feat: add new feature"
git push origin main
```

✅ Automatic version bump  
✅ Auto-generated release notes with emojis  
✅ Published to npm  
✅ GitHub release created

---

### 2. Tag-Based

**Push a version tag:**

```bash
git tag v1.2.3
git push origin v1.2.3
```

✅ Specific version control  
✅ Auto-generated release notes  
✅ Published to npm  
✅ GitHub release created

---

### 3. Manual

**Use GitHub Actions UI:**

1. Go to **Actions** → **Release**
2. Click **Run workflow**
3. Select release type (optional)
4. Click **Run workflow**

✅ Emergency releases  
✅ Testing  
✅ Override auto-detection

---

## 📝 Release Notes Features

Your releases will include:

- ✨ **Features** - New functionality
- 🐛 **Bug Fixes** - Fixed issues
- ⚡ **Performance** - Speed improvements
- 📚 **Documentation** - Doc updates
- ♻️ **Refactoring** - Code improvements
- 🔨 **Build** - Build system changes
- 👷 **CI/CD** - CI configuration
- 🔧 **Chores** - Maintenance

Plus:

- 🔗 Links to commits, issues, and PRs
- 👥 Contributor list
- 🚨 Breaking changes highlighted
- 💬 Automatic comments on issues/PRs

---

## 📚 Full Documentation

- [Complete Release Workflows](./RELEASE-WORKFLOWS.md)
- [Release Process Guide](./RELEASE-PROCESS.md)
- [Setup Instructions](./RELEASE-SETUP.md)
- [Commit Conventions](../.github/COMMIT_CONVENTION.md)

---

## 🎯 Quick Examples

### Feature Release

```bash
git commit -m "feat: add hover variant support"
git push origin main
# → v0.2.0
```

### Bug Fix

```bash
git commit -m "fix: resolve parsing error"
git push origin main
# → v0.1.1
```

### Breaking Change

```bash
git commit -m "feat: redesign API

BREAKING CHANGE: Configuration format changed"
git push origin main
# → v1.0.0
```

### Specific Version

```bash
git tag v2.0.0-beta.1
git push origin v2.0.0-beta.1
# → v2.0.0-beta.1
```

---

## ✅ Checklist

Before releasing:

- [ ] All tests pass
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] `NPM_TOKEN` configured in GitHub secrets

---

**Need help?** Check the [full documentation](./RELEASE-WORKFLOWS.md) or open an issue.
