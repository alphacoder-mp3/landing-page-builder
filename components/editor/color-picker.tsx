'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

const colorPalettes = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
};

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  const handleHSLChange = () => {
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    onChange(color);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-8 h-8 p-0">
          <div
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: value }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Tabs defaultValue="palette">
          <TabsList className="w-full">
            <TabsTrigger value="palette" className="flex-1">
              Palette
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex-1">
              Custom
            </TabsTrigger>
          </TabsList>
          <TabsContent value="palette" className="space-y-4">
            {Object.entries(colorPalettes).map(([name, palette]) => (
              <div key={name} className="space-y-2">
                <h4 className="text-sm font-medium capitalize">{name}</h4>
                <div className="grid grid-cols-10 gap-1">
                  {Object.entries(palette).map(([shade, color]) => (
                    <button
                      key={shade}
                      className={cn(
                        'w-5 h-5 rounded-md transition-all',
                        value === color && 'ring-2 ring-primary ring-offset-2'
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => onChange(color)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hue</label>
              <Slider
                value={[hue]}
                onValueChange={value => {
                  setHue(value[0]);
                  handleHSLChange();
                }}
                max={360}
                step={1}
                className="[&>.relative]:bg-gradient-to-r from-red-500 via-green-500 to-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Saturation</label>
              <Slider
                value={[saturation]}
                onValueChange={value => {
                  setSaturation(value[0]);
                  handleHSLChange();
                }}
                max={100}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Lightness</label>
              <Slider
                value={[lightness]}
                onValueChange={value => {
                  setLightness(value[0]);
                  handleHSLChange();
                }}
                max={100}
                step={1}
              />
            </div>
            <div
              className="h-20 rounded-lg"
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              }}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
