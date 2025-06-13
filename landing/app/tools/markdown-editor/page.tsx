import type { Metadata } from 'next';
import { MarkdownEditor } from './MarkdownEditor';

export const metadata: Metadata = {
  title: 'Markdown Editor | Web Utils',
  description: 'Edit and preview Markdown text in real-time. Load and save .md files directly in your browser.',
  openGraph: {
    title: 'Markdown Editor | Web Utils',
    description: 'Edit and preview Markdown text in real-time. Load and save .md files directly in your browser.',
    type: 'website',
    url: '/tools/markdown-editor', // Replace with actual URL when deployed
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Editor | Web Utils',
    description: 'Edit and preview Markdown text in real-time. Load and save .md files directly in your browser.',
    // Replace with actual image URL when available
    // image: '/images/tools/markdown-editor-og.png',
  },
};

export default function MarkdownEditorPage() {
  return <MarkdownEditor />;
}
