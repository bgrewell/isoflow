import { z } from 'zod';
import { id, coords } from './common';

export const rectangleSchema = z.object({
  id,
  color: id.optional(),
  from: coords,
  to: coords,
  transparency: z.number().min(0).max(1).optional(),
  zIndex: z.number().optional()
});
