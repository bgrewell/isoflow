import { z } from 'zod';
import { id, coords } from './common';

// Hex color validation pattern
const hexColor = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color (e.g., #ff0000)');

export const rectangleSchema = z.object({
  id,
  color: id.optional(),
  colorValue: hexColor.optional(), // Direct hex color value (e.g., "#ff0000")
  outlineColor: hexColor.optional(), // Custom outline color (e.g., "#000000")
  outlineWidth: z.number().min(0).max(10).optional(), // Outline width (0-10)
  from: coords,
  to: coords,
  transparency: z.number().min(0).max(1).optional(),
  zIndex: z.number().optional()
});
