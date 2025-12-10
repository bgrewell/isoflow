import { z } from 'zod';
import { id, constrainedStrings, coords } from './common';
import { rectangleSchema } from './rectangle';
import { connectorSchema } from './connector';
import { textBoxSchema } from './textBox';

export const viewItemSchema = z.object({
  id,
  tile: coords,
  labelHeight: z.number().optional()
});

export const layerSchema = z.object({
  id,
  name: constrainedStrings.name,
  description: constrainedStrings.description.optional(),
  items: z.array(viewItemSchema),
  zOffset: z.number().default(0),
  visible: z.boolean().default(true),
  transparency: z.number().min(0).max(1).default(1)
});

export const viewSchema = z.object({
  id,
  lastUpdated: z.string().datetime().optional(),
  name: constrainedStrings.name,
  description: constrainedStrings.description.optional(),
  items: z.array(viewItemSchema),
  rectangles: z.array(rectangleSchema).optional(),
  connectors: z.array(connectorSchema).optional(),
  textBoxes: z.array(textBoxSchema).optional(),
  layers: z.array(layerSchema).optional()
});

export const viewsSchema = z.array(viewSchema);
