'use client';

import { useEditorStore } from '@/lib/store/editor-store';
import { LayoutOne } from './layouts/layout-one';
import { LayoutTwo } from './layouts/layout-two';
import { motion, AnimatePresence } from 'framer-motion';

export function EditorContainer() {
  const { currentLayout, isPreviewMode, updateSection } = useEditorStore();

  if (!currentLayout) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">
          Select a layout to begin editing
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentLayout.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        {currentLayout.id === 'layout-1' ? (
          <LayoutOne
            sections={currentLayout.sections}
            isPreview={isPreviewMode}
            onSectionUpdate={updateSection}
          />
        ) : (
          <LayoutTwo
            sections={currentLayout.sections}
            isPreview={isPreviewMode}
            onSectionUpdate={updateSection}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
