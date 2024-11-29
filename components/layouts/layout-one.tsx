'use client';

import { Section } from '@/lib/types/editor';
import { motion } from 'framer-motion';
import { TextEditor } from '../editor/text-editor';
import { ImageUpload } from '../editor/image-upload';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

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

  const [heroImage, setHeroImage] = useState<string>('');
  const [aboutImage, setAboutImage] = useState<string>('');

  return (
    <div className="min-h-screen">
      {heroSection && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
          style={{
            backgroundImage: heroImage ? `url(${heroImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
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
                    onImageSelect={url => setHeroImage(url)}
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
          className="py-24 px-4"
        >
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
          className="py-24 px-4 bg-muted/50"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                {!isPreview ? (
                  <ImageUpload
                    onImageSelect={url => setAboutImage(url)}
                    className="h-full"
                  />
                ) : (
                  aboutImage && (
                    <picture>
                      <img
                        src={aboutImage}
                        alt="About section"
                        className="w-full h-full object-cover"
                        height={500}
                        width={500}
                      />
                    </picture>
                  )
                )}
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
