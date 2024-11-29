'use client';

import { useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { EditorToolbar } from './editor-toolbar';
import { cn } from '@/lib/utils';
import { RenderElementProps, RenderLeafProps } from '@/lib/types/slate';
import { withImages } from '@/lib/editor/utils';
import Image from 'next/image';

interface TextEditorProps {
  initialValue: Descendant[];
  onChange: (value: Descendant[]) => void;
  className?: string;
  readOnly?: boolean;
}

export function TextEditor({
  initialValue,
  onChange,
  className,
  readOnly = false,
}: TextEditorProps) {
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );

  const renderElement = useCallback(
    ({ attributes, children, element }: RenderElementProps) => {
      switch (element.type) {
        case 'heading-one':
          return (
            <h1 className="text-4xl font-bold mb-4" {...attributes}>
              {children}
            </h1>
          );
        case 'heading-two':
          return (
            <h2 className="text-3xl font-bold mb-3" {...attributes}>
              {children}
            </h2>
          );
        case 'heading-three':
          return (
            <h3 className="text-2xl font-bold mb-2" {...attributes}>
              {children}
            </h3>
          );
        case 'list-item':
          return (
            <li className="ml-4" {...attributes}>
              {children}
            </li>
          );
        case 'link':
          return (
            <a
              href={element.url}
              className="text-primary underline hover:text-primary/80"
              {...attributes}
            >
              {children}
            </a>
          );
        case 'image':
          return (
            <div {...attributes} contentEditable={false} className="my-4">
              <Image
                src={element.url}
                alt=""
                className="rounded-lg max-w-full"
                height={400}
                width={400}
              />
              {children}
            </div>
          );
        default:
          return (
            <p className="mb-4" {...attributes}>
              {children}
            </p>
          );
      }
    },
    []
  );

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      let styledChildren = children;

      if (leaf.bold) {
        styledChildren = <strong>{styledChildren}</strong>;
      }
      if (leaf.italic) {
        styledChildren = <em>{styledChildren}</em>;
      }
      if (leaf.underline) {
        styledChildren = <u>{styledChildren}</u>;
      }
      if (leaf.color) {
        styledChildren = (
          <span style={{ color: leaf.color }}>{styledChildren}</span>
        );
      }

      return <span {...attributes}>{styledChildren}</span>;
    },
    []
  );

  return (
    <div className={cn('w-full', className)}>
      <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
        {!readOnly && <EditorToolbar />}
        <Editable
          className={cn(
            'min-h-[100px] p-4 rounded-md',
            readOnly
              ? 'focus:outline-none'
              : 'border focus:outline-none focus:ring-2 focus:ring-primary/20'
          )}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly={readOnly}
          placeholder="Start typing..."
        />
      </Slate>
    </div>
  );
}
