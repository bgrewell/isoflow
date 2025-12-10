import { z } from 'zod';
import { layerSchema } from '../views';

describe('Layer Schema', () => {
  test('validates a valid layer', () => {
    const validLayer = {
      id: 'layer1',
      name: 'Test Layer',
      description: 'A test layer',
      items: [
        {
          id: 'item1',
          tile: { x: 0, y: 0 },
          labelHeight: 80
        }
      ],
      zOffset: 2,
      visible: true
    };

    const result = layerSchema.safeParse(validLayer);
    expect(result.success).toBe(true);
  });

  test('applies default values for zOffset and visible', () => {
    const layer = {
      id: 'layer1',
      name: 'Test Layer',
      items: []
    };

    const result = layerSchema.parse(layer);
    expect(result.zOffset).toBe(0);
    expect(result.visible).toBe(true);
    expect(result.transparency).toBe(1);
  });

  test('validates transparency value within range', () => {
    const layer = {
      id: 'layer1',
      name: 'Test Layer',
      items: [],
      transparency: 0.5
    };

    const result = layerSchema.safeParse(layer);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.transparency).toBe(0.5);
    }
  });

  test('rejects invalid transparency values', () => {
    const invalidLayers = [
      {
        id: 'layer1',
        name: 'Test Layer',
        items: [],
        transparency: 1.5 // Too high
      },
      {
        id: 'layer2',
        name: 'Test Layer',
        items: [],
        transparency: -0.1 // Too low
      }
    ];

    invalidLayers.forEach((layer) => {
      const result = layerSchema.safeParse(layer);
      expect(result.success).toBe(false);
    });
  });

  test('validates layers array', () => {
    const layersSchema = z.array(layerSchema);
    const layers = [
      {
        id: 'layer1',
        name: 'Layer 1',
        items: [],
        zOffset: 0,
        visible: true
      },
      {
        id: 'layer2',
        name: 'Layer 2',
        items: [],
        zOffset: 3,
        visible: false
      }
    ];

    const result = layersSchema.safeParse(layers);
    expect(result.success).toBe(true);
  });

  test('rejects layer without required fields', () => {
    const invalidLayer = {
      items: []
    };

    const result = layerSchema.safeParse(invalidLayer);
    expect(result.success).toBe(false);
  });

  test('validates layer with items containing tile coordinates', () => {
    const layer = {
      id: 'layer1',
      name: 'Test Layer',
      items: [
        {
          id: 'item1',
          tile: { x: 5, y: -3 }
        },
        {
          id: 'item2',
          tile: { x: 0, y: 0 },
          labelHeight: 100
        }
      ]
    };

    const result = layerSchema.safeParse(layer);
    expect(result.success).toBe(true);
  });
});
