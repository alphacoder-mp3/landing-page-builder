'use client';

import { Editor, Element as SlateElement, Transforms, Range } from 'slate';
import { CustomEditor, CustomElement, FormattedText } from '../types/slate';

type FormatKey = keyof Omit<FormattedText, 'text'>;

export const isFormatActive = (editor: CustomEditor, format: FormatKey) => {
  const marks = Editor.marks(editor) as Partial<FormattedText>;
  return marks ? marks[format] === true : false;
};

export const toggleBlock = (editor: CustomEditor, format: string) => {
  const isActive = isBlockActive(editor, format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ['list-item'].includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : format,
  } as Partial<CustomElement>);
};

export const isBlockActive = (editor: CustomEditor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

export const insertLink = (editor: CustomEditor) => {
  const url = window.prompt('Enter URL:');
  if (!url) return;

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: CustomElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const insertImage = (editor: CustomEditor) => {
  const url = window.prompt('Enter image URL:');
  if (!url) return;

  const image: CustomElement = {
    type: 'image',
    url,
    children: [{ text: '' }],
  };

  Transforms.insertNodes(editor, image);
};

export const withImages = (editor: CustomEditor) => {
  const { isVoid } = editor;

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };

  return editor;
};

export const getActiveStyles = (
  editor: CustomEditor
): Record<FormatKey, boolean> => {
  const marks = Editor.marks(editor) as Partial<FormattedText>;
  return {
    bold: !!marks?.bold,
    italic: !!marks?.italic,
    underline: !!marks?.underline,
    color: !!marks?.color,
    background: !!marks?.background,
  };
};
