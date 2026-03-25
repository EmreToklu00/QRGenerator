# 🧠 Claude-Specific Guide

> Optimized workflow guide for Claude AI when working with this QR Code Generator project

---

## 📚 Documentation Structure

**All documentation is in-file.** Use `fsRead` tool to read file headers for context.

### Quick Reference

Every file starts with a JSDoc comment block:

```typescript
/**
 * @fileoverview Brief description
 * @description Detailed explanation
 * @module path/to/module
 * @category Component/Service/Hook/Page
 * @features
 * - Feature list
 * @dependencies
 * - dependency: purpose
 */
```

---

## 🎯 Workflow for Common Tasks

### 1. Understanding a Component

**Steps:**
1. Read the file header with `fsRead`
2. Check `@features` for capabilities
3. Check `@dependencies` for related files
4. Look at Props interface for API
5. Read the implementation

**Example:**
```bash
# Read QrPreview component
fsRead(['src/components/canvas/QrPreview.tsx'])

# Check dependencies mentioned in header
fsRead(['src/hooks/useQrGenerator.ts'])
```

### 2. Adding a New Feature

**Steps:**
1. Identify affected files from architecture
2. Read relevant file headers
3. Follow existing patterns
4. Update JSDoc comments
5. Add translations if needed

**Example: Adding a new QR type**
```bash
# Read existing QR type definitions
fsRead(['src/constants/qrTypes.ts'])

# Read a similar form component
fsRead(['src/components/forms/UrlForm.tsx'])

# Read validator to understand validation pattern
fsRead(['src/services/validator.ts'])

# Read type builder to understand string format
fsRead(['src/services/types.ts'])
```

### 3. Fixing a Bug

**Steps:**
1. Identify the component/service with the bug
2. Read file header for context
3. Check related files in `@dependencies`
4. Locate the bug
5. Fix and test
6. Update comments if logic changed

### 4. Refactoring Code

**Steps:**
1. Read all affected files
2. Understand current architecture
3. Plan refactoring
4. Update code
5. Update JSDoc comments
6. Ensure no breaking changes

---

## 🔍 Finding Information

### Component Props
**Location:** Props interface in component file
**How to find:**
```typescript
// Look for interface Props or component props
interface QrPreviewProps {
  dataUrl: string | null;
  isGenerating: boolean;
  error: string | null;
}
```

### Function API
**Location:** Function signature and JSDoc
**How to find:**
```typescript
/**
 * Generates QR code as data URL
 * @param options - QR generation options
 * @returns Promise resolving to base64 data URL
 */
export async function generateQrDataUrl(options: QrRenderOptions): Promise<string>
```

### Related Files
**Location:** `@dependencies` section in file header
**How to find:**
```typescript
/**
 * @dependencies
 * - @/services/qr: QR generation
 * - @/constants/templatePresets: Style types
 */
```

### Translation Keys
**Location:** `src/locales/en.json` and `src/locales/tr.json`
**How to find:**
```bash
# Read translation files
fsRead(['src/locales/en.json', 'src/locales/tr.json'])

# Search for specific key
grep -r "hero.title" src/locales/
```

---

## 📂 File Organization

### By Category

**Pages** (App Router)
- `src/app/[locale]/layout.tsx` - Root layout
- `src/app/[locale]/page.tsx` - Home page
- `src/app/[locale]/create/[type]/page.tsx` - QR creation

**Components**
- `src/components/canvas/` - QR preview and controls
- `src/components/forms/` - 9 QR type forms
- `src/components/layout/` - Header, Footer, switchers
- `src/components/pwa/` - PWA install prompts
- `src/components/ui/` - Reusable UI (Input, Toast)

**Hooks**
- `src/hooks/useQrGenerator.ts` - Main QR generation hook
- `src/hooks/useHistory.ts` - History management
- `src/hooks/useTheme.ts` - Theme system
- `src/hooks/useClipboard.ts` - Clipboard operations
- `src/hooks/useShare.ts` - Native share
- `src/hooks/useBatch.ts` - Batch generation

**Services**
- `src/services/qr.ts` - QR generation engine
- `src/services/validator.ts` - Form validation
- `src/services/types.ts` - QR string builders
- `src/services/download.ts` - Download utilities
- `src/services/print.ts` - Print functionality
- `src/services/templates.ts` - Template management

**Constants**
- `src/constants/qrTypes.ts` - QR type definitions
- `src/constants/templatePresets.ts` - Style templates

**Configuration**
- `src/i18n.ts` - i18n configuration
- `src/proxy.ts` - Locale routing
- `next.config.ts` - Next.js config

---

## 🛠️ Common Patterns

### Reading Multiple Related Files

```bash
# Read all form components at once
fsRead([
  'src/components/forms/UrlForm.tsx',
  'src/components/forms/WifiForm.tsx',
  'src/components/forms/VCardForm.tsx'
])

# Read all services
fsRead([
  'src/services/qr.ts',
  'src/services/validator.ts',
  'src/services/types.ts'
])

# Read all hooks
fsRead([
  'src/hooks/useQrGenerator.ts',
  'src/hooks/useHistory.ts',
  'src/hooks/useTheme.ts'
])
```

### Searching for Specific Code

```bash
# Find all usages of a function
grep -r "generateQrDataUrl" src/

# Find all translation keys
grep -r "useTranslations" src/

# Find all client components
grep -r "'use client'" src/
```

### Checking Dependencies

```bash
# Read package.json
fsRead(['package.json'])

# Check specific dependency version
grep "next-intl" package.json
```

---

## 📝 When Making Changes

### Checklist

1. **Read file header** - Understand purpose and context
2. **Check dependencies** - Identify related files
3. **Follow patterns** - Match existing code style
4. **Update JSDoc** - Keep comments in sync
5. **Add translations** - For user-facing text
6. **Test changes** - Verify functionality
7. **Check types** - Ensure TypeScript compliance

### Updating JSDoc Comments

**When to update:**
- Function signature changes
- New features added
- Dependencies change
- Purpose changes

**What to update:**
```typescript
/**
 * @fileoverview [Update if purpose changed]
 * @description [Update if functionality changed]
 * @features [Add new features]
 * @dependencies [Add/remove dependencies]
 */
```

### Adding Translations

**Steps:**
1. Add key to `src/locales/en.json`
2. Add same key to `src/locales/tr.json`
3. Use in component with `useTranslations`

**Example:**
```json
// en.json
{
  "create": {
    "newFeature": "New Feature Text"
  }
}

// tr.json
{
  "create": {
    "newFeature": "Yeni Özellik Metni"
  }
}
```

```typescript
// Component
const t = useTranslations('create');
<span>{t('newFeature')}</span>
```

---

## 🚀 Performance Considerations

### When Reading Files

- **Batch reads** - Read multiple files in one `fsRead` call
- **Read only needed** - Don't read entire codebase
- **Use file headers** - Get context without reading full file

### When Writing Code

- **Memoize components** - Use `React.memo` for expensive renders
- **Debounce inputs** - Use debouncing for real-time updates
- **Lazy load** - Use dynamic imports for heavy components
- **Optimize images** - Use Next.js Image component

---

## 🐛 Debugging Tips

### Build Errors

**Type errors:**
```bash
# Check TypeScript config
fsRead(['tsconfig.json'])

# Check interface definitions
fsRead(['src/services/qr.ts'])
```

**Import errors:**
```bash
# Check file exists
ls src/components/canvas/QrPreview.tsx

# Check import path
grep -r "QrPreview" src/
```

### Runtime Errors

**Hydration errors:**
- Check for `'use client'` directive
- Avoid `window` in SSR context
- Use `useEffect` for client-only code

**localStorage errors:**
- Use `useEffect` for localStorage access
- Check for SSR context

---

## 📊 Project Statistics

- **Total Files:** 50+ TypeScript/TSX files
- **Components:** 30+ React components
- **Hooks:** 6 custom hooks
- **Services:** 7 service modules
- **QR Types:** 9 types
- **Templates:** 12 style templates
- **Languages:** 2 (TR, EN)

---

## 🎓 Learning Resources

### Next.js 16
- App Router architecture
- Server/Client components
- Metadata API
- Image optimization

### React 19
- Hooks (useState, useEffect, useCallback, useMemo)
- Memoization (React.memo)
- Context API
- Suspense

### TypeScript
- Interfaces vs Types
- Generics
- Utility types
- Strict mode

### Tailwind CSS v4
- Utility classes
- Dark mode (`dark:`)
- Responsive design (`sm:`, `md:`, `lg:`)
- Custom colors

---

## 💡 Pro Tips

1. **Start with file headers** - They contain all the context you need
2. **Batch file reads** - More efficient than multiple single reads
3. **Follow the patterns** - Existing code shows the way
4. **Check translations** - Don't forget i18n for new features
5. **Test dark mode** - Always check both themes
6. **Mobile first** - Test responsive design
7. **Use TypeScript** - Let types guide you
8. **Read README.md** - High-level overview
9. **Read AGENTS.md** - Detailed patterns and examples
10. **Keep comments updated** - Documentation is code

---

## 🔄 Typical Workflows

### Adding a New QR Type (Full Workflow)

```bash
# 1. Read existing type definitions
fsRead(['src/constants/qrTypes.ts'])

# 2. Read a similar form component
fsRead(['src/components/forms/UrlForm.tsx'])

# 3. Read validator
fsRead(['src/services/validator.ts'])

# 4. Read type builder
fsRead(['src/services/types.ts'])

# 5. Read translations
fsRead(['src/locales/en.json', 'src/locales/tr.json'])

# 6. Make changes (add type, form, validator, builder, translations)

# 7. Test build
npm run build
```

### Fixing a Styling Issue

```bash
# 1. Identify component
fsRead(['src/components/canvas/QrPreview.tsx'])

# 2. Check Tailwind classes
# Look for className attributes

# 3. Fix styling
# Update Tailwind classes

# 4. Test in both themes
# Check light and dark mode
```

### Adding a Translation

```bash
# 1. Read translation files
fsRead(['src/locales/en.json', 'src/locales/tr.json'])

# 2. Add key to both files
# Ensure same structure

# 3. Use in component
# useTranslations('namespace')
```

---

<div align="center">

**Efficient Coding with Claude! 🚀**

</div>
