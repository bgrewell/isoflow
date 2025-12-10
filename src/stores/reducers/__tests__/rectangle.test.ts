import { updateRectangle, createRectangle } from '../rectangle';
import { State } from '../types';
import { Rectangle } from 'src/types';

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

  test('createRectangle creates a new rectangle with color', () => {
    const state = createMockState();
    const newRectangle: Rectangle = {
      id: 'rect2',
      color: 'color2',
      from: { x: 5, y: 5 },
      to: { x: 7, y: 7 }
    };
    
    const newState = createRectangle(newRectangle, {
      viewId: 'view1',
      state
    });

    const rectangles = newState.model.views[0].rectangles;
    expect(rectangles).toHaveLength(2);
    
    // Find the newly created rectangle (it should be first due to unshift)
    const createdRectangle = rectangles?.[0];
    expect(createdRectangle?.id).toBe('rect2');
    expect(createdRectangle?.color).toBe('color2');
    expect(createdRectangle?.from).toEqual({ x: 5, y: 5 });
    expect(createdRectangle?.to).toEqual({ x: 7, y: 7 });
  });
});
