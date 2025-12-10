import { z } from 'zod';
import { id, coords } from './common';

export const rectangleSchema = z.object({
  id,
  color: id.optional(),
  colorValue: z.string().optional(), // Direct hex color value (e.g., "#ff0000")
  outlineColor: z.string().optional(), // Custom outline color (e.g., "#000000")
  from: coords,
  to: coords,
  transparency: z.number().min(0).max(1).optional(),
  zIndex: z.number().optional()
});
