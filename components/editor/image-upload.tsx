'use client';

import { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { ImageIcon, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  onImageSelect: (url: string) => void;
  className?: string;
}

export function ImageUpload({ onImageSelect, className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [, setIsLoading] = useState(false);

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setIsLoading(true);
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setPreview(base64String);
          onImageSelect(base64String);
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
        setIsLoading(false);
      }
    },
    [onImageSelect]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg transition-all',
        isDragging && 'ring-2 ring-primary',
        className
      )}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="block w-full cursor-pointer">
            {preview ? (
              <div className="relative group">
                <picture>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </picture>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <Button variant="secondary" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  'border-2 border-dashed rounded-lg p-8 transition-colors',
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25'
                )}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop an image here, or click to select
                  </p>
                </div>
              </div>
            )}
          </label>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
