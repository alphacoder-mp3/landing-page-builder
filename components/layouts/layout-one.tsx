'use client';

import { Section } from '@/lib/types/editor';
import { motion } from 'framer-motion';
import { TextEditor } from '../editor/text-editor';
import { ImageUpload } from '../editor/image-upload';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { BackgroundPicker } from '../editor/background-picker';

interface LayoutOneProps {
  sections: Section[];
  isPreview?: boolean;
  onSectionUpdate?: (sectionId: string, content: Section['content']) => void;
}

export function LayoutOne({
  sections,
  isPreview = false,
  onSectionUpdate,
}: LayoutOneProps) {
  const heroSection = sections.find(s => s.type === 'hero');
  const featuresSection = sections.find(s => s.type === 'features');
  const aboutSection = sections.find(s => s.type === 'about');

  const [images, setImages] = useState<Record<string, string>>({
    hero: '',
    about: '',
  });

  const [sectionBackgrounds, setSectionBackgrounds] = useState({
    hero: '',
    features: '',
    about: '',
  });

  const updateBackground = (
    section: keyof typeof sectionBackgrounds,
    value: string
  ) => {
    setSectionBackgrounds(prev => ({ ...prev, [section]: value }));
  };

  const handleImageUpload = (section: keyof typeof images, url: string) => {
    setImages(prev => ({ ...prev, [section]: url }));
  };

  return (
    <div className="min-h-screen">
      {heroSection && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative min-h-[80vh] flex items-center justify-center"
          style={{
            ...(images.hero
              ? {
                  backgroundImage: `url(${images.hero})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {
                  background:
                    sectionBackgrounds.hero ||
                    'linear-gradient(to right, var(--primary-5), var(--primary-10), var(--primary-5))',
                }),
          }}
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
          <div className="absolute inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-10" />
          <div className="container mx-auto max-w-6xl px-4 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <TextEditor
                initialValue={heroSection.content}
                onChange={content => onSectionUpdate?.(heroSection.id, content)}
                readOnly={isPreview}
                className="prose prose-lg max-w-none"
              />
              {!isPreview && (
                <div className="mt-8">
                  <ImageUpload
                    onImageSelect={url => handleImageUpload('hero', url)}
                    className="max-w-md mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {featuresSection && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative py-24 px-4"
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
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              {Array.from({ length: 2 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow"
                >
                  <TextEditor
                    initialValue={featuresSection.content}
                    onChange={content =>
                      onSectionUpdate?.(featuresSection.id, content)
                    }
                    readOnly={isPreview}
                    className="prose max-w-none"
                  />
                  {!isPreview && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {aboutSection && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative py-24 px-4"
          style={{ background: sectionBackgrounds.about || 'bg-muted/50' }}
        >
          {!isPreview && (
            <div className="absolute top-4 right-4">
              <BackgroundPicker
                value={sectionBackgrounds.about}
                onChange={value => updateBackground('about', value)}
                type="section"
              />
            </div>
          )}
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                {!isPreview ? (
                  <ImageUpload
                    onImageSelect={url => handleImageUpload('about', url)}
                    className="h-full"
                  />
                ) : images.about ? (
                  <picture>
                    <img
                      src={images.about}
                      alt="About section"
                      className="w-full h-full object-cover"
                      height={500}
                      width={500}
                    />
                  </picture>
                ) : null}
              </div>
              <div>
                <TextEditor
                  initialValue={aboutSection.content}
                  onChange={content =>
                    onSectionUpdate?.(aboutSection.id, content)
                  }
                  readOnly={isPreview}
                  className="prose max-w-none"
                />
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
