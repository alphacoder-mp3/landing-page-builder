'use client';

import { useEditorStore } from '@/lib/store/editor-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { defaultLayouts } from '@/lib/constants/layouts';

export function LayoutSelector() {
  const { currentLayout, setCurrentLayout } = useEditorStore();

  return (
    <Select
      value={currentLayout?.id}
      onValueChange={layoutId => {
        const layout = defaultLayouts.find(l => l.id === layoutId);
        if (layout) {
          setCurrentLayout(layout);
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a layout" />
      </SelectTrigger>
      <SelectContent>
        {defaultLayouts.map(layout => (
          <SelectItem key={layout.id} value={layout.id}>
            {layout.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
