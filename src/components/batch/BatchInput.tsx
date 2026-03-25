/**
 * @fileoverview Batch Input Component
 * @description Textarea input for bulk QR code generation
 * 
 * @module components/batch/BatchInput
 * @category Batch Components
 * 
 * @features
 * - Multi-line textarea (4 rows)
 * - One URL per line format
 * - Placeholder example
 * - Submit button with loading state
 * - Monospace font for better readability
 * - Trim and filter empty lines
 * 
 * @dependencies
 * - next-intl: Translations
 */

'use client';

import { useTranslations } from 'next-intl';

interface BatchInputProps {
  onGenerate: (inputs: string[]) => void;
  isGenerating: boolean;
}

export default function BatchInput({ onGenerate, isGenerating }: BatchInputProps) {
  const t = useTranslations('batch');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = (form.elements.namedItem('batch') as HTMLTextAreaElement).value;
    const inputs = value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    if (inputs.length) onGenerate(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('title')}
        <span className="ml-1 text-xs text-gray-400">{t('subtitle')}</span>
      </label>
      <textarea
        name="batch"
        rows={4}
        placeholder={t('placeholder')}
        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono"
      />
      <button
        type="submit"
        disabled={isGenerating}
        className="self-start px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
      >
        {isGenerating ? t('generating') : t('generate')}
      </button>
    </form>
  );
}
