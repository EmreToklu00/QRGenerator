# 🎨 QR Code Generator

> Modern, feature-rich, and fully customizable QR code generator built with Next.js 16

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![AI Powered](https://img.shields.io/badge/AI--Powered-FF9900?style=flat-square)]()

## ✨ Features

### 🎯 QR Code Types (9 Types)
- **URL** - Website links with automatic protocol detection
- **Wi-Fi** - Network credentials (SSID, password, encryption)
- **vCard** - Digital business cards (name, phone, email, company, address)
- **Email** - Email addresses with subject and body
- **Phone** - Phone numbers for direct calls
- **SMS** - SMS messages with recipient and text
- **Location** - GPS coordinates (latitude, longitude)
- **App Store** - iOS and Android app links
- **Text** - Plain text content

### 🎨 Customization
- **Colors** - Custom dark/light colors with color picker
- **Gradients** - Vertical, horizontal, diagonal gradients
- **Patterns** - Background patterns (dots, grid, waves)
- **Dot Styles** - Square, rounded, dot, line
- **Corner Styles** - Square, rounded
- **Logo Upload** - Embed logos with padding and radius controls
- **Frame Text** - Add text below QR code
- **Templates** - 12 pre-made style templates

### 🌍 Internationalization
- **Languages** - Turkish (TR) and English (EN)
- **Default** - English
- **Easy Switch** - Dropdown language selector in header

### 🌓 Theme System
- **Light Mode** - Default theme
- **Dark Mode** - Full dark mode support
- **Persistent** - Saves preference to localStorage
- **Smooth Transitions** - 300ms theme transitions

### 📱 Progressive Web App (PWA)
- **Installable** - Install as desktop/mobile app
- **Offline Ready** - Works without internet
- **Manifest** - Full PWA manifest configuration
- **Install Prompts** - Smart install prompts for desktop and mobile

### 📊 Advanced Features
- **History** - Last 10 generated QR codes with prefill
- **Batch Generation** - Generate multiple QR codes at once
- **Export Formats** - PNG, SVG
- **High Resolution** - Up to 1024x1024px
- **Transparent Background** - Support for transparent PNG
- **Print** - Direct print functionality
- **Share** - Native share API support
- **Clipboard** - Copy QR to clipboard
- **ZIP Download** - Download multiple QR codes as ZIP

### 🚀 Performance
- **Debounced Generation** - 150ms debounce for smooth UX
- **Memoized Components** - React.memo for optimal rendering
- **Lazy Loading** - Images and components lazy loaded
- **Canvas Rendering** - Manual canvas rendering for full control

### 📱 Responsive Design
- **Mobile First** - Optimized for mobile devices
- **Touch Gestures** - Swipe navigation on mobile
- **Safe Area** - iOS safe area support
- **44px Touch Targets** - Accessibility compliant

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 22+ (required)
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/EmreToklu00/QRGenerator
cd QRGenerator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Analyze Bundle Size

```bash
# Generate bundle analysis
ANALYZE=true npm run build
```

---

## 📚 Documentation

This project uses **in-file documentation**. Each file contains detailed JSDoc comments explaining:
- Purpose and functionality
- API and parameters
- Dependencies and relationships
- Performance considerations

### 📂 Key Files to Explore

#### 🔧 Core Services
- [`src/services/qr.ts`](src/services/qr.ts) - QR generation engine with canvas rendering
- [`src/services/validator.ts`](src/services/validator.ts) - Input validation for all QR types
- [`src/services/types.ts`](src/services/types.ts) - QR string builders (WiFi, vCard, etc.)
- [`src/services/download.ts`](src/services/download.ts) - Download utilities (PNG, SVG, ZIP)
- [`src/services/print.ts`](src/services/print.ts) - Print functionality
- [`src/services/templates.ts`](src/services/templates.ts) - Template management

#### 🪝 Main Hooks
- [`src/hooks/useQrGenerator.ts`](src/hooks/useQrGenerator.ts) - QR generation state management
- [`src/hooks/useHistory.ts`](src/hooks/useHistory.ts) - History management with localStorage
- [`src/hooks/useTheme.ts`](src/hooks/useTheme.ts) - Theme system (light/dark)
- [`src/hooks/useClipboard.ts`](src/hooks/useClipboard.ts) - Clipboard copy functionality
- [`src/hooks/useShare.ts`](src/hooks/useShare.ts) - Native share API

#### 📄 Pages
- [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx) - Root layout with i18n
- [`src/app/[locale]/page.tsx`](src/app/[locale]/page.tsx) - Home page with hero and QR types
- [`src/app/[locale]/create/[type]/page.tsx`](src/app/[locale]/create/[type]/page.tsx) - QR creation wizard

#### 🧩 Components
- [`src/components/canvas/QrPreview.tsx`](src/components/canvas/QrPreview.tsx) - QR preview with loading states
- [`src/components/forms/`](src/components/forms/) - Form components for 9 QR types
- [`src/components/layout/`](src/components/layout/) - Header, Footer, Language/Theme switchers
- [`src/components/pwa/`](src/components/pwa/) - PWA install prompts

#### ⚙️ Configuration
- [`src/i18n.ts`](src/i18n.ts) - Internationalization configuration
- [`next.config.ts`](next.config.ts) - Next.js configuration
- [`src/constants/qrTypes.ts`](src/constants/qrTypes.ts) - QR type definitions
- [`src/constants/templatePresets.ts`](src/constants/templatePresets.ts) - Style templates

---

## 🏗️ Project Structure

```
qr-generator/
├── public/
│   ├── icons/              # PWA icons
│   └── manifest.json       # PWA manifest
├── src/
│   ├── app/
│   │   └── [locale]/       # Internationalized routes
│   │       ├── layout.tsx  # Root layout
│   │       ├── page.tsx    # Home page
│   │       └── create/
│   │           └── [type]/ # QR creation wizard
│   ├── components/
│   │   ├── canvas/         # QR preview and controls
│   │   ├── forms/          # 9 QR type forms
│   │   ├── layout/         # Header, Footer, switchers
│   │   ├── pwa/            # PWA install prompts
│   │   └── ui/             # UI components (Input, Toast)
│   ├── constants/
│   │   ├── qrTypes.ts      # QR type definitions
│   │   └── templatePresets.ts # Style templates
│   ├── hooks/              # Custom React hooks
│   ├── locales/            # Translation files (tr.json, en.json)
│   ├── services/           # Core business logic
│   └── i18n.ts             # i18n configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## 🛠️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS

### Libraries
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization
- **[qrcode](https://www.npmjs.com/package/qrcode)** - QR code generation
- **[lucide-react](https://lucide.dev/)** - Icon library
- **[react-swipeable](https://www.npmjs.com/package/react-swipeable)** - Touch gestures
- **[jszip](https://stuk.github.io/jszip/)** - ZIP file generation

### Development
- **[ESLint](https://eslint.org/)** - Code linting
- **[@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Bundle analysis

---

## 🎯 Usage Examples

### Basic QR Code Generation

1. Visit the home page
2. Select a QR type (e.g., URL)
3. Enter your data
4. Customize style (optional)
5. Download or share

### Using Templates

1. Go to Step 2 (Style)
2. Click on a template card
3. Template style is applied instantly
4. Further customize if needed

### Adding a Logo

1. Go to Step 2 (Style)
2. Scroll to "Logo Upload"
3. Click "Upload Logo"
4. Adjust padding, color, and radius
5. Logo is embedded in QR code

### Batch Generation

1. Create a QR code
2. Save to history
3. Repeat for multiple QR codes
4. Use batch download feature (if implemented)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/example-feature`)
3. Commit your changes (`git commit -m 'Add example feature'`)
4. Push to the branch (`git push origin feature/example-feature`)
5. Open a Pull Request

### Code Style
- Follow existing TypeScript patterns
- Add JSDoc comments to new files
- Use Tailwind CSS for styling
- Keep components small and focused
- Write meaningful commit messages

### Reporting Issues

Found a bug or have a feature request?

1. **Check existing issues** - Search [existing issues](https://github.com/EmreToklu00/QRGenerator/issues) first
2. **Create a new issue** - If not found, [open a new issue](https://github.com/EmreToklu00/QRGenerator/issues/new)
3. **Provide details** - Include:
   - Clear description of the problem
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser/OS information

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Emre Toklu**

- GitHub: [@EmreToklu00](https://github.com/EmreToklu00)
- Project: [QRGenerator](https://github.com/EmreToklu00/QRGenerator)

### 🤖 AI-Assisted Development

This project was developed with the assistance of AI-powered coding tools that helped with:
- Architecture design and best practices
- Code generation and optimization
- Documentation and in-file comments
- TypeScript type safety
- Performance improvements

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - Amazing React framework
- [Vercel](https://vercel.com/) - Hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) - Beautiful utility-first CSS
- [Lucide](https://lucide.dev/) - Clean and consistent icons
- [qrcode](https://www.npmjs.com/package/qrcode) - QR code generation library

---

## 📊 Project Stats

- **9 QR Types** - URL, WiFi, vCard, Email, Phone, SMS, Location, App Store, Text
- **12 Templates** - Pre-made style templates
- **2 Languages** - Turkish and English
- **30+ Components** - Modular and reusable
- **6 Custom Hooks** - Clean state management
- **7 Services** - Business logic separation

---

## 🔮 Future Enhancements

- [ ] More QR types (Calendar, Crypto, etc.)
- [ ] Advanced batch generation UI
- [ ] QR code analytics
- [ ] More languages
- [ ] QR code scanner
- [ ] Cloud storage integration
- [ ] API endpoints for programmatic access

---

<div align="center">

**Made with ❤️ using Next.js 16**

[⬆ Back to Top](#-qr-code-generator)

</div>
