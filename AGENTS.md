# 🤖 AI Agents Guide

> Comprehensive guide for AI agents working with this QR Code Generator project

---

## 📖 Reading the Codebase

This project uses **in-file documentation**. Every file has a detailed JSDoc comment block at the top explaining:
- File purpose and functionality
- Module category
- Key features
- Dependencies
- Parameters and return types

### How to Navigate

1. **Start with README.md** - Get project overview and architecture
2. **Read file headers** - Every file starts with `@fileoverview` and `@description`
3. **Follow dependencies** - Check `@dependencies` section for related files
4. **Check interfaces** - TypeScript interfaces are well-documented

### Documentation Format

```typescript
/**
 * @fileoverview Brief one-line description
 * @description Detailed multi-line explanation
 * 
 * @module path/to/module
 * @category Component/Service/Hook/Page
 * 
 * @features
 * - Feature 1
 * - Feature 2
 * 
 * @dependencies
 * - dependency1: Purpose
 * - dependency2: Purpose
 */
```

---

## 🏗️ Architecture Overview

### Project Structure

```
src/
├── app/[locale]/          # Next.js App Router pages
├── components/            # React components
│   ├── canvas/           # QR preview and controls
│   ├── forms/            # 9 QR type forms
│   ├── layout/           # Header, Footer, switchers
│   ├── pwa/              # PWA install prompts
│   └── ui/               # Reusable UI components
├── constants/            # Type definitions and templates
├── hooks/                # Custom React hooks
├── locales/              # i18n translation files
├── services/             # Business logic
└── i18n.ts               # i18n configuration
```

### Key Patterns

#### 1. Component Pattern
See: `src/components/canvas/QrPreview.tsx`

```typescript
/**
 * @fileoverview Component description
 * @category Component Category
 * @features
 * - Feature list
 */

'use client'; // If client component

import { memo } from 'react';

interface Props {
  // Props definition
}

export default memo(function ComponentName({ props }: Props) {
  // Component logic
  return (/* JSX */);
});
```

#### 2. Hook Pattern
See: `src/hooks/useQrGenerator.ts`

```typescript
/**
 * @fileoverview Hook description
 * @category Core Hooks
 * @features
 * - State management
 * - Side effects
 */

'use client';

export function useHookName() {
  const [state, setState] = useState();
  
  const action = useCallback(() => {
    // Logic
  }, []);
  
  return { state, action };
}
```

#### 3. Service Pattern
See: `src/services/qr.ts`

```typescript
/**
 * @fileoverview Service description
 * @category Core Services
 * @features
 * - Business logic
 */

export async function serviceFunctionName(params: Type): Promise<ReturnType> {
  // Logic
  return result;
}
```

---

## 🔧 Common Tasks

### Adding a New QR Type

1. **Add to constants** - `src/constants/qrTypes.ts`
   ```typescript
   export type QrType = 'url' | 'wifi' | ... | 'newtype';
   
   export const QR_TYPES: QrTypeDefinition[] = [
     // ...existing types
     { id: 'newtype', label: 'New Type', icon: IconComponent },
   ];
   ```

2. **Create form component** - `src/components/forms/NewTypeForm.tsx`
   ```typescript
   /**
    * @fileoverview New Type Form Component
    * @category Form Components
    */
   
   export default function NewTypeForm({ data, onChange }: FormProps) {
     return (/* Form fields */);
   }
   ```

3. **Add validator** - `src/services/validator.ts`
   ```typescript
   export function validate(type: QrType, data: Record<string, string>): string | null {
     // ...existing validations
     if (type === 'newtype') {
       if (!data.field) return 'Field is required';
     }
     return null;
   }
   ```

4. **Add string builder** - `src/services/types.ts`
   ```typescript
   export function buildQrString(type: QrType, data: Record<string, string>): string {
     // ...existing builders
     if (type === 'newtype') {
       return `FORMAT:${data.field}`;
     }
     return '';
   }
   ```

5. **Add translations** - `src/locales/en.json` and `src/locales/tr.json`
   ```json
   {
     "types": {
       "newtype": {
         "label": "New Type",
         "desc": "Description",
         "fields": {
           "field": "Field Label"
         }
       }
     }
   }
   ```

6. **Register form** - `src/app/[locale]/create/[type]/page.tsx`
   ```typescript
   import NewTypeForm from '@/components/forms/NewTypeForm';
   
   const FORMS: Record<QrType, ComponentType<FormProps>> = {
     // ...existing forms
     newtype: NewTypeForm,
   };
   ```

### Adding a New Language

1. **Add locale** - `src/i18n.ts`
   ```typescript
   export const locales = ['tr', 'en', 'newlang'] as const;
   ```

2. **Create translation file** - `src/locales/newlang.json`
   ```json
   {
     "hero": { "title": "..." },
     "types": { ... },
     "create": { ... }
   }
   ```

3. **Update LanguageSwitcher** - `src/components/layout/LanguageSwitcher.tsx`
   ```typescript
   const languages = [
     { code: 'en', label: 'English', flag: '🇬🇧' },
     { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
     { code: 'newlang', label: 'New Language', flag: '🏳️' },
   ];
   ```

4. **Update proxy matcher** - `src/proxy.ts`
   ```typescript
   export const config = {
     matcher: ['/', '/(tr|en|newlang)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
   };
   ```

### Adding a New Template

1. **Add to templates** - `src/constants/templatePresets.ts`
   ```typescript
   export const TEMPLATES: Template[] = [
     // ...existing templates
     {
       id: 'newtemplate',
       label: 'New Template',
       style: {
         ...DEFAULT_STYLE,
         darkColor: '#000000',
         lightColor: '#ffffff',
         dotStyle: 'rounded',
         cornerStyle: 'rounded',
       },
     },
   ];
   ```

2. **Add translations** - `src/locales/en.json` and `src/locales/tr.json`
   ```json
   {
     "create": {
       "templates": {
         "newtemplate": "New Template"
       }
     }
   }
   ```

### Adding a New Component

1. **Create component file** with JSDoc header
2. **Define Props interface** with TypeScript
3. **Use memo** for performance if needed
4. **Add to parent component** imports
5. **Update translations** if component has text

---

## ⚠️ Important Notes

### Do's ✅
- Always add JSDoc comments to new files
- Use TypeScript strict mode
- Follow existing naming conventions
- Keep components small and focused
- Use Tailwind CSS for styling
- Memoize expensive computations
- Add translations for all user-facing text
- Test on mobile and desktop
- Check dark mode appearance

### Don'ts ❌
- Don't remove existing JSDoc comments
- Don't use inline styles (use Tailwind)
- Don't hardcode text (use i18n)
- Don't skip TypeScript types
- Don't create large monolithic components
- Don't forget to update translations
- Don't ignore ESLint warnings
- Don't commit console.logs

---

## 🔍 Code Conventions

### Naming
- **Components**: PascalCase (`QrPreview.tsx`)
- **Hooks**: camelCase with `use` prefix (`useQrGenerator.ts`)
- **Services**: camelCase (`validator.ts`)
- **Constants**: UPPER_SNAKE_CASE (`QR_TYPES`)
- **Types**: PascalCase (`QrType`, `QrStyle`)

### File Organization
- One component per file
- Export default for main component
- Export named for utilities
- Group related files in folders

### TypeScript
- Use interfaces for props
- Use types for unions
- Avoid `any` type
- Use strict mode
- Define return types

### React
- Use functional components
- Use hooks for state
- Memoize with `React.memo`
- Use `useCallback` for functions
- Use `useMemo` for expensive computations

### Styling
- Use Tailwind CSS classes
- Follow mobile-first approach
- Use dark mode variants (`dark:`)
- Use responsive breakpoints (`sm:`, `md:`, `lg:`)
- Keep class names readable

---

## 🐛 Troubleshooting

### Build Errors

**Error: Module not found**
- Check import paths
- Ensure file exists
- Check TypeScript aliases (`@/`)

**Error: Type errors**
- Check interface definitions
- Ensure all props are passed
- Check return types

### Runtime Errors

**Error: Hydration mismatch**
- Check for client-only code
- Use `'use client'` directive
- Avoid `window` in SSR

**Error: localStorage not defined**
- Use `useEffect` for localStorage access
- Check for SSR context

### i18n Issues

**Missing translations**
- Check locale JSON files
- Ensure key exists in all languages
- Check namespace usage

**Wrong language displayed**
- Check URL locale parameter
- Check proxy configuration
- Clear browser cache

---

## 📊 Performance Tips

1. **Memoization** - Use `React.memo` for expensive components
2. **Debouncing** - Debounce QR generation (150ms)
3. **Lazy Loading** - Lazy load images and heavy components
4. **Code Splitting** - Use dynamic imports for large modules
5. **Bundle Analysis** - Run `ANALYZE=true npm run build`

---

## 🧪 Testing Checklist

- [ ] All QR types generate correctly
- [ ] Form validation works
- [ ] Templates apply correctly
- [ ] Logo upload works
- [ ] Download PNG/SVG works
- [ ] Print works
- [ ] Share works (mobile)
- [ ] Clipboard copy works
- [ ] History saves and loads
- [ ] Language switch works
- [ ] Theme switch works
- [ ] PWA install works
- [ ] Responsive on mobile
- [ ] Dark mode looks good
- [ ] Swipe gestures work (mobile)

---

## 📚 Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

<div align="center">

**Happy Coding! 🚀**

</div>
