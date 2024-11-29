import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Layout, Section } from '@/lib/types/editor';

interface EditorStore {
  currentLayout: Layout | null;
  layouts: Layout[];
  isPreviewMode: boolean;
  setCurrentLayout: (layout: Layout) => void;
  updateSection: (sectionId: string, content: Section['content']) => void;
  togglePreviewMode: () => void;
  loadLayout: (layoutId: string) => void;
  saveCurrentLayout: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      currentLayout: null,
      layouts: [],
      isPreviewMode: false,
      setCurrentLayout: layout => set({ currentLayout: layout }),
      updateSection: (sectionId, content) => {
        const currentLayout = get().currentLayout;
        if (!currentLayout) return;

        const updatedSections = currentLayout.sections.map(section =>
          section.id === sectionId ? { ...section, content } : section
        );

        set({
          currentLayout: {
            ...currentLayout,
            sections: updatedSections,
          },
        });
      },
      togglePreviewMode: () =>
        set(state => ({ isPreviewMode: !state.isPreviewMode })),
      loadLayout: layoutId => {
        const layout = get().layouts.find(l => l.id === layoutId);
        if (layout) {
          set({ currentLayout: layout });
        }
      },
      saveCurrentLayout: () => {
        const currentLayout = get().currentLayout;
        if (!currentLayout) return;

        set(state => ({
          layouts: state.layouts.map(l =>
            l.id === currentLayout.id ? currentLayout : l
          ),
        }));
      },
    }),
    {
      name: 'editor-storage',
    }
  )
);
