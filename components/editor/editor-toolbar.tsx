'use client';

import { useSlate } from 'slate-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  Link,
  Image as ImageIcon,
} from 'lucide-react';
import { CustomEditor } from '@/lib/types/slate';
import { ColorPicker } from './color-picker';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  isFormatActive,
  toggleBlock,
  insertLink,
  insertImage,
} from '@/lib/editor/utils';

export function EditorToolbar() {
  const editor = useSlate() as CustomEditor;

  const toggleFormat = (format: 'bold' | 'italic' | 'underline' | 'color') => {
    const isActive = isFormatActive(editor, format);
    if (isActive) {
      editor.removeMark(format);
    } else {
      editor.addMark(format, true);
    }
  };

  const toggleColor = (color: string) => {
    editor.addMark('color', color);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 mb-2 border rounded-md bg-background sticky top-0 z-10">
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={isFormatActive(editor, 'bold')}
              onPressedChange={() => toggleFormat('bold')}
            >
              <Bold className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={isFormatActive(editor, 'italic')}
              onPressedChange={() => toggleFormat('italic')}
            >
              <Italic className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={isFormatActive(editor, 'underline')}
              onPressedChange={() => toggleFormat('underline')}
            >
              <Underline className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Underline</TooltipContent>
        </Tooltip>

        <div className="w-px h-4 bg-border mx-1" />

        <ColorPicker
          value={editor.marks?.color as string}
          onChange={toggleColor}
        />
      </div>

      <div className="w-px h-4 bg-border mx-1" />

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBlock(editor, 'heading-one')}
            >
              <Heading1 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading 1</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBlock(editor, 'heading-two')}
            >
              <Heading2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading 2</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBlock(editor, 'heading-three')}
            >
              <Heading3 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading 3</TooltipContent>
        </Tooltip>
      </div>

      <div className="w-px h-4 bg-border mx-1" />

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleBlock(editor, 'list-item')}
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>List</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertLink(editor)}
            >
              <Link className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Link</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertImage(editor)}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Image</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
