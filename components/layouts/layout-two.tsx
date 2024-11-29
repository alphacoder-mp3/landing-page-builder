import { Section } from '@/lib/types/editor';
import { motion } from 'framer-motion';
import { TextEditor } from '../editor/text-editor';
import Image from 'next/image';

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

  return (
    <div className="min-h-screen">
      {heroSection && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 px-4"
        >
          <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <TextEditor
              initialValue={heroSection.content}
              onChange={content => onSectionUpdate?.(heroSection.id, content)}
              readOnly={isPreview}
              className="prose prose-lg max-w-none"
            />
            <div className="bg-muted rounded-lg p-8">
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="Hero"
                className="rounded-lg shadow-lg"
                height={100}
                width={100}
              />
            </div>
          </div>
        </motion.section>
      )}

      {featuresSection && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="py-16 px-4 bg-muted"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <TextEditor
                initialValue={featuresSection.content}
                onChange={content =>
                  onSectionUpdate?.(featuresSection.id, content)
                }
                readOnly={isPreview}
                className="prose max-w-none"
              />
            </div>
          </div>
        </motion.section>
      )}

      {footerSection && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="py-12 px-4 bg-primary text-primary-foreground"
        >
          <div className="container mx-auto max-w-6xl">
            <TextEditor
              initialValue={footerSection.content}
              onChange={content => onSectionUpdate?.(footerSection.id, content)}
              readOnly={isPreview}
              className="prose prose-invert max-w-none"
            />
          </div>
        </motion.footer>
      )}
    </div>
  );
}
