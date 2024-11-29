import { Descendant } from 'slate';

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
}

export interface TextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
}

export interface Section {
  id: string;
  type: 'hero' | 'features' | 'about' | 'footer';
  content: Descendant[];
}

export interface Layout {
  id: string;
  name: string;
  sections: Section[];
}
