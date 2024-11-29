'use client';

import { Section } from '@/lib/types/editor';
import { motion } from 'framer-motion';
import { TextEditor } from '../editor/text-editor';
import { BackgroundPicker } from '../editor/background-picker';
import { useState } from 'react';

interface LayoutTwoProps {
  sections: Section[];
  isPreview?: boolean;
  onSectionUpdate?: (sectionId: string, content: Section['content']) => void;
}

export function LayoutTwo({
  sections,
  isPreview = false,
  onSectionUpdate,
}: LayoutTwoProps) {
  const heroSection = sections.find(s => s.type === 'hero');
  const featuresSection = sections.find(s => s.type === 'features');
  const footerSection = sections.find(s => s.type === 'footer');

  const [sectionBackgrounds, setSectionBackgrounds] = useState({
    hero: '',
    features: '',
    footer: '',
  });

  const updateBackground = (
    section: keyof typeof sectionBackgrounds,
    value: string
  ) => {
    setSectionBackgrounds(prev => ({ ...prev, [section]: value }));
  };

  return (
    <div className="min-h-screen">
      {heroSection && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative py-24"
          style={{ background: sectionBackgrounds.hero }}
        >
          {!isPreview && (
            <div className="absolute top-4 right-4">
              <BackgroundPicker
                value={sectionBackgrounds.hero}
                onChange={value => updateBackground('hero', value)}
                type="section"
              />
            </div>
          )}
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <TextEditor
                  initialValue={heroSection.content}
                  onChange={content =>
                    onSectionUpdate?.(heroSection.id, content)
                  }
                  readOnly={isPreview}
                  className="prose prose-lg max-w-none"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <picture>
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {featuresSection && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative py-24"
          style={{ background: sectionBackgrounds.features }}
        >
          {!isPreview && (
            <div className="absolute top-4 right-4">
              <BackgroundPicker
                value={sectionBackgrounds.features}
                onChange={value => updateBackground('features', value)}
                type="section"
              />
            </div>
          )}
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border shadow-sm"
                >
                  <TextEditor
                    initialValue={featuresSection.content}
                    onChange={content =>
                      onSectionUpdate?.(featuresSection.id, content)
                    }
                    readOnly={isPreview}
                    className="prose max-w-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {footerSection && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative py-16"
          style={{ background: sectionBackgrounds.footer }}
        >
          {!isPreview && (
            <div className="absolute top-4 right-4">
              <BackgroundPicker
                value={sectionBackgrounds.footer}
                onChange={value => updateBackground('footer', value)}
                type="section"
              />
            </div>
          )}
          <div className="container mx-auto max-w-6xl px-4">
            <TextEditor
              initialValue={footerSection.content}
              onChange={content => onSectionUpdate?.(footerSection.id, content)}
              readOnly={isPreview}
              className="prose max-w-none"
              style={{ color: sectionBackgrounds.footer ? '#fff' : undefined }}
            />
          </div>
        </motion.footer>
      )}
    </div>
  );
}
