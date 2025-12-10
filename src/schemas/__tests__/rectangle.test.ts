import { rectangleSchema } from '../rectangle';

describe('Rectangle schema', () => {
  test('validates rectangle with color ID', () => {
    const rectangle = {
      id: 'rect1',
      color: 'color1',
      from: { x: 0, y: 0 },
      to: { x: 2, y: 2 },
      transparency: 1,
      zIndex: 0
    };

    const result = rectangleSchema.safeParse(rectangle);
    expect(result.success).toBe(true);
  });

  test('validates rectangle with custom color value', () => {
    const rectangle = {
      id: 'rect1',
      colorValue: '#ff0000',
      from: { x: 0, y: 0 },
      to: { x: 2, y: 2 },
      transparency: 0.5,
      zIndex: 0
    };

    const result = rectangleSchema.safeParse(rectangle);
    expect(result.success).toBe(true);
  });

  test('validates rectangle with outline color', () => {
    const rectangle = {
      id: 'rect1',
      color: 'color1',
      outlineColor: '#000000',
      from: { x: 0, y: 0 },
      to: { x: 2, y: 2 },
      transparency: 0.8,
      zIndex: 0
    };

    const result = rectangleSchema.safeParse(rectangle);
    expect(result.success).toBe(true);
  });

  test('validates rectangle with both custom color and outline color', () => {
    const rectangle = {
      id: 'rect1',
      colorValue: '#ff00ff',
      outlineColor: '#00ff00',
      from: { x: 0, y: 0 },
      to: { x: 2, y: 2 },
      transparency: 0.7,
      zIndex: 0
    };

    const result = rectangleSchema.safeParse(rectangle);
    expect(result.success).toBe(true);
  });

  test('validates minimal rectangle (only required fields)', () => {
    const rectangle = {
      id: 'rect1',
      from: { x: 0, y: 0 },
      to: { x: 2, y: 2 }
    };

    const result = rectangleSchema.safeParse(rectangle);
    expect(result.success).toBe(true);
  });
});
