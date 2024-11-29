'use client';

import { useEditorStore } from '@/lib/store/editor-store';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export function PreviewToggle() {
  const { isPreviewMode, togglePreviewMode } = useEditorStore();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={togglePreviewMode}
      className="gap-2"
    >
      {isPreviewMode ? (
        <>
          <EyeOff className="h-4 w-4" />
          Exit Preview
        </>
      ) : (
        <>
          <Eye className="h-4 w-4" />
          Preview
        </>
      )}
    </Button>
  );
}
