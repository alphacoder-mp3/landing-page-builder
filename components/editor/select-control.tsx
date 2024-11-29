'use client';

import { Button } from '../ui/button';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionControlsProps {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
}

export function SectionControls({
  onMoveUp,
  onMoveDown,
  onDelete,
}: SectionControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-1"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onMoveUp}
        className="h-8 w-8"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onMoveDown}
        className="h-8 w-8"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="h-8 w-8 text-destructive hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
