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

const gradients = [
  {
    name: 'Sunset',
    from: 'from-orange-500',
    via: 'via-pink-500',
    to: 'to-purple-500',
  },
  {
    name: 'Ocean',
    from: 'from-blue-500',
    via: 'via-teal-500',
    to: 'to-emerald-500',
  },
  {
    name: 'Forest',
    from: 'from-green-500',
    via: 'via-emerald-500',
    to: 'to-teal-500',
  },
  {
    name: 'Lavender',
    from: 'from-purple-500',
    via: 'via-pink-500',
    to: 'to-indigo-500',
  },
];

interface BackgroundPickerProps {
  onChange: (background: string) => void;
}

export function BackgroundPicker({ onChange }: BackgroundPickerProps) {
  const [opacity, setOpacity] = useState(50);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Background
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Tabs defaultValue="gradient">
          <TabsList className="w-full">
            <TabsTrigger value="gradient" className="flex-1">
              Gradient
            </TabsTrigger>
            <TabsTrigger value="solid" className="flex-1">
              Solid
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gradient" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {gradients.map(gradient => (
                <button
                  key={gradient.name}
                  className={`h-20 rounded-lg bg-gradient-to-r ${gradient.from} ${gradient.via} ${gradient.to} transition-transform hover:scale-105`}
                  onClick={() =>
                    onChange(
                      `bg-gradient-to-r ${gradient.from} ${gradient.via} ${gradient.to}`
                    )
                  }
                />
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Opacity</label>
              <Slider
                value={[opacity]}
                onValueChange={value => setOpacity(value[0])}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </TabsContent>
          <TabsContent value="solid" className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {['bg-primary', 'bg-secondary', 'bg-accent', 'bg-muted'].map(
                color => (
                  <button
                    key={color}
                    className={`h-10 rounded-lg ${color} transition-transform hover:scale-105`}
                    onClick={() => onChange(color)}
                  />
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
