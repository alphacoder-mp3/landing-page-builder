import { Layout } from '@/lib/types/editor';
import { Descendant } from 'slate';

const createDefaultContent = (text: string): Descendant[] => [
  {
    type: 'paragraph',
    children: [{ text }],
  },
];

export const defaultLayouts: Layout[] = [
  {
    id: 'layout-1',
    name: 'Modern Business',
    sections: [
      {
        id: 'hero-1',
        type: 'hero',
        content: createDefaultContent('Welcome to Our Platform'),
      },
      {
        id: 'features-1',
        type: 'features',
        content: createDefaultContent('Our Key Features'),
      },
      {
        id: 'about-1',
        type: 'about',
        content: createDefaultContent('About Us'),
      },
    ],
  },
  {
    id: 'layout-2',
    name: 'Startup Landing',
    sections: [
      {
        id: 'hero-2',
        type: 'hero',
        content: createDefaultContent('Transform Your Business'),
      },
      {
        id: 'features-2',
        type: 'features',
        content: createDefaultContent('Why Choose Us'),
      },
      {
        id: 'footer-2',
        type: 'footer',
        content: createDefaultContent('Get in Touch'),
      },
    ],
  },
];
