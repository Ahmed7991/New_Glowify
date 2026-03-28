'use client';

import { ProductColor } from '@/types/product';
import { Check } from 'lucide-react';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onSelect: (color: ProductColor) => void;
}

export function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Color</h3>
        <span className="text-sm text-gray-600">{selectedColor.name}</span>
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
        {colors.map((color) => {
          const isSelected = color.hex === selectedColor.hex;

          return (
            <button
              key={color.hex}
              onClick={() => onSelect(color)}
              className={`relative w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                isSelected
                  ? 'border-rose-gold ring-2 ring-rose-gold ring-offset-2'
                  : 'border-gray-300 hover:border-deep-rose'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Select ${color.name}`}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check
                    className="w-5 h-5"
                    style={{
                      color: getContrastColor(color.hex),
                    }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to determine if we should use black or white icon based on background color
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
