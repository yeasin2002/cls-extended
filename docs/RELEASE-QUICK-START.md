# Release Quick Start Guide

## 🚀 Tag-Based Releases with release-it

### Simple 2-Step Process

**Step 1: Commit and push your changes**

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

**Step 2: Create and push a version tag**

```bash
git tag v1.0.1
git push origin v1.0.1
```

✅ Automatic version bump  
✅ Auto-generated release notes with emojis  
✅ Published to npm  
✅ GitHub release created

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

---

## 📚 Full Documentation

- [Complete Release Guide](./RELEASE-IT-GUIDE.md)
- [Release Process Guide](./RELEASE-PROCESS.md)
- [Setup Instructions](./RELEASE-SETUP.md)

---

## 🎯 Quick Examples

### Patch Release (Bug Fix)

```bash
git commit -m "fix: resolve parsing error"
git push origin main
git tag v1.0.1
git push origin v1.0.1
# → v1.0.1
```

### Minor Release (New Feature)

```bash
git commit -m "feat: add hover variant support"
git push origin main
git tag v1.1.0
git push origin v1.1.0
# → v1.1.0
```

### Major Release (Breaking Change)

```bash
git commit -m "feat: redesign API

BREAKING CHANGE: Configuration format changed"
git push origin main
git tag v2.0.0
git push origin v2.0.0
# → v2.0.0
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

**Need help?** Check the [full documentation](./RELEASE-IT-GUIDE.md) or open an issue.
