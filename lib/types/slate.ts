import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading-one' | 'heading-two' | 'heading-three';
  children: CustomText[];
};

export type LinkElement = {
  type: 'link';
  url: string;
  children: CustomText[];
};

export type ListItemElement = {
  type: 'list-item';
  children: CustomText[];
};

export type ImageElement = {
  type: 'image';
  url: string;
  children: CustomText[];
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | LinkElement
  | ListItemElement
  | ImageElement;

export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  background?: string;
};

export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export interface RenderElementProps {
  attributes: Record<string, unknown>;
  children: React.ReactNode;
  element: CustomElement;
}

export interface RenderLeafProps {
  attributes: Record<string, unknown>;
  children: React.ReactNode;
  leaf: CustomText;
}

export interface EditorMarks {
  [key: string]: boolean | string;
}
