import { updateRectangle } from '../rectangle';
import { State } from '../types';

describe('Rectangle reducer', () => {
  const createMockState = (): State => {
    return {
      model: {
        title: 'Test',
        version: '1.0.0',
        icons: [],
        colors: [
          { id: 'color1', value: '#ff0000' },
          { id: 'color2', value: '#00ff00' }
        ],
        items: [],
        views: [
          {
            id: 'view1',
            name: 'Test View',
            items: [],
            connectors: [],
            rectangles: [
              {
                id: 'rect1',
                color: 'color1',
                from: { x: 0, y: 0 },
                to: { x: 2, y: 2 }
              }
            ],
            textBoxes: []
          }
        ]
      },
      scene: {
        connectors: {},
        textBoxes: {}
      }
    };
  };

  test('updateRectangle updates the color property', () => {
    const state = createMockState();
    const updates = { id: 'rect1', color: 'color2' };

    const newState = updateRectangle(updates, {
      viewId: 'view1',
      state
    });

    const rectangle = newState.model.views[0].rectangles?.[0];
    expect(rectangle?.color).toBe('color2');
  });

  test('updateRectangle preserves other properties when updating color', () => {
    const state = createMockState();
    const updates = { id: 'rect1', color: 'color2' };

    const newState = updateRectangle(updates, {
      viewId: 'view1',
      state
    });

    const rectangle = newState.model.views[0].rectangles?.[0];
    expect(rectangle?.id).toBe('rect1');
    expect(rectangle?.from).toEqual({ x: 0, y: 0 });
    expect(rectangle?.to).toEqual({ x: 2, y: 2 });
    expect(rectangle?.color).toBe('color2');
  });

  test('updateRectangle clears colorValue when setting a palette color', () => {
    const state = createMockState();
    // First, set a custom colorValue
    const stateWithCustomColor = updateRectangle(
      { id: 'rect1', colorValue: '#00ff00' },
      {
        viewId: 'view1',
        state
      }
    );

    const rectangleWithCustomColor =
      stateWithCustomColor.model.views[0].rectangles?.[0];
    expect(rectangleWithCustomColor?.colorValue).toBe('#00ff00');

    // Now, select a palette color and clear colorValue
    const finalState = updateRectangle(
      { id: 'rect1', color: 'color2', colorValue: undefined },
      {
        viewId: 'view1',
        state: stateWithCustomColor
      }
    );

    const finalRectangle = finalState.model.views[0].rectangles?.[0];
    expect(finalRectangle?.color).toBe('color2');
    expect(finalRectangle?.colorValue).toBeUndefined();
  });

  test('updateRectangle updates outline color', () => {
    const state = createMockState();
    const updates = { id: 'rect1', outlineColor: '#0000ff' };

    const newState = updateRectangle(updates, {
      viewId: 'view1',
      state
    });

    const rectangle = newState.model.views[0].rectangles?.[0];
    expect(rectangle?.outlineColor).toBe('#0000ff');
  });

  test('updateRectangle updates outline width', () => {
    const state = createMockState();
    const updates = { id: 'rect1', outlineWidth: 3 };

    const newState = updateRectangle(updates, {
      viewId: 'view1',
      state
    });

    const rectangle = newState.model.views[0].rectangles?.[0];
    expect(rectangle?.outlineWidth).toBe(3);
  });

  test('updateRectangle clears outline color when fill color changes', () => {
    const state = createMockState();
    // First, set a custom outline color
    const stateWithOutline = updateRectangle(
      { id: 'rect1', outlineColor: '#ff00ff' },
      {
        viewId: 'view1',
        state
      }
    );

    const rectangleWithOutline =
      stateWithOutline.model.views[0].rectangles?.[0];
    expect(rectangleWithOutline?.outlineColor).toBe('#ff00ff');

    // Now, change fill color and clear outline color
    const finalState = updateRectangle(
      { id: 'rect1', colorValue: '#00ff00', outlineColor: undefined },
      {
        viewId: 'view1',
        state: stateWithOutline
      }
    );

    const finalRectangle = finalState.model.views[0].rectangles?.[0];
    expect(finalRectangle?.colorValue).toBe('#00ff00');
    expect(finalRectangle?.outlineColor).toBeUndefined();
  });
});
