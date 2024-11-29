import { LayoutSelector } from '@/components/layout-selector';
import { PreviewToggle } from '@/components/preview-toggle';
import { EditorContainer } from '@/components/editor-container';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Landing Page Builder</h1>
          <div className="flex items-center gap-4">
            <LayoutSelector />
            <PreviewToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <EditorContainer />
      </div>
    </main>
  );
}
