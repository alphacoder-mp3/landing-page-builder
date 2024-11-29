'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const gradients = [
  {
    name: 'Sunset',
    colors: ['#f97316', '#ec4899', '#a855f7'],
  },
  {
    name: 'Ocean',
    colors: ['#3b82f6', '#14b8a6', '#10b981'],
  },
  {
    name: 'Forest',
    colors: ['#22c55e', '#10b981', '#14b8a6'],
  },
  {
    name: 'Lavender',
    colors: ['#a855f7', '#ec4899', '#6366f1'],
  },
  {
    name: 'Golden Hour',
    colors: ['#f59e0b', '#d97706', '#b45309'],
  },
  {
    name: 'Northern Lights',
    colors: ['#06b6d4', '#0ea5e9', '#6366f1'],
  },
  {
    name: 'Cherry Blossom',
    colors: ['#ec4899', '#db2777', '#be185d'],
  },
  {
    name: 'Emerald Dream',
    colors: ['#059669', '#10b981', '#34d399'],
  },
];

const solidColors = [
  { name: 'Slate', value: '#64748b' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Yellow', value: '#eab308' },
];

interface BackgroundPickerProps {
  value?: string;
  onChange: (background: string) => void;
  type?: 'text' | 'section';
}

export function BackgroundPicker({
  value,
  onChange,
  type = 'text',
}: BackgroundPickerProps) {
  const [opacity, setOpacity] = useState(100);

  const createGradient = (colors: string[], opacity: number) => {
    console.log({ opacity }); // for future purpose use opacity
    return `linear-gradient(to right, ${colors
      .map((color, index) => {
        const position = (index / (colors.length - 1)) * 100;
        return `${color} ${position}%`;
      })
      .join(', ')})`;
  };

  const handleGradientClick = (gradient: (typeof gradients)[0]) => {
    const gradientString = createGradient(gradient.colors, opacity);
    onChange(gradientString);
  };

  const handleOpacityChange = (values: number[]) => {
    const newOpacity = values[0];
    setOpacity(newOpacity);

    if (value?.includes('linear-gradient')) {
      const colors = value.match(/#[a-fA-F0-9]{6}/g) || [];
      const gradientString = createGradient(colors, newOpacity);
      onChange(gradientString);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn('w-8 h-8 p-0', type === 'section' && 'w-auto px-3')}
        >
          {type === 'text' ? (
            <div
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: value }}
            />
          ) : (
            <>
              <div
                className="w-4 h-4 rounded-full border mr-2"
                style={{ background: value }}
              />
              Background
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Tabs defaultValue="solid">
          <TabsList className="w-full">
            <TabsTrigger value="solid" className="flex-1">
              Solid
            </TabsTrigger>
            <TabsTrigger value="gradient" className="flex-1">
              Gradient
            </TabsTrigger>
          </TabsList>
          <TabsContent value="solid" className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              {solidColors.map(color => (
                <button
                  key={color.name}
                  className={cn(
                    'w-8 h-8 rounded-md transition-transform hover:scale-105',
                    value === color.value && 'ring-2 ring-primary ring-offset-2'
                  )}
                  style={{ backgroundColor: color.value }}
                  onClick={() => onChange(color.value)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="gradient" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {gradients.map(gradient => (
                <button
                  key={gradient.name}
                  className="h-20 rounded-lg transition-transform hover:scale-105"
                  style={{
                    background: createGradient(gradient.colors, opacity),
                  }}
                  onClick={() => handleGradientClick(gradient)}
                />
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Opacity</label>
              <Slider
                value={[opacity]}
                onValueChange={handleOpacityChange}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
