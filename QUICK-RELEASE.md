# Quick Release Guide

## ✅ Setup Complete!

Your project is now configured with **release-it** for tag-based releases.

## How to Release (Simple)

### 1. Commit your changes

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

### 2. Create and push a tag

```bash
# Example: Release v1.0.1
git tag v1.0.1
git push origin v1.0.1
```

### 3. Done! 🎉

GitHub Actions will automatically:

- ✅ Build the package
- ✅ Publish to npm
- ✅ Create GitHub release
- ✅ Update CHANGELOG.md

## Version Examples

```bash
# Patch (bug fixes): 1.0.0 → 1.0.1
git tag v1.0.1 && git push origin v1.0.1

# Minor (new features): 1.0.0 → 1.1.0
git tag v1.1.0 && git push origin v1.1.0

# Major (breaking changes): 1.0.0 → 2.0.0
git tag v2.0.0 && git push origin v2.0.0
```

## Check Your Release

- **npm**: https://www.npmjs.com/package/cls-extended
- **GitHub**: https://github.com/yeasin2002/cls-extended-protoype/releases
- **Actions**: https://github.com/yeasin2002/cls-extended-protoype/actions

## Files Changed

- ✅ `.github/workflows/release.yml` - Tag-based workflow
- ✅ `packages/cls-extended/.release-it.json` - release-it config
- ✅ `packages/cls-extended/.auto-changelog` - Changelog format
- ✅ `packages/cls-extended/package.json` - Added release-it deps
- ❌ Removed `.releaserc.json` - No more semantic-release

## Test It Now

```bash
# Test with a patch release
git tag v1.0.1
git push origin v1.0.1
```

Then watch: https://github.com/yeasin2002/cls-extended-protoype/actions

---

**For detailed docs, see**: `RELEASE-IT-GUIDE.md`
