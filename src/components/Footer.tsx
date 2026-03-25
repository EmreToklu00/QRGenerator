/**
 * @fileoverview Simple Footer Component
 * @description Minimal footer with branding and GitHub link
 * 
 * @module components/Footer
 * @category Layout Components
 * 
 * @features
 * - QR Generator branding
 * - GitHub repository link
 * - Border top separator
 * - Dark mode support
 * - Hover effect on link
 */

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>QR Generator</span>
        <a
          href="https://github.com/EmreToklu00/QRGenerator"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          GitHub →
        </a>
      </div>
    </footer>
  );
}
