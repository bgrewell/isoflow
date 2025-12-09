import { createLayer, updateLayer, deleteLayer } from '../layer';
import { State } from '../types';
import { INITIAL_SCENE_STATE } from 'src/config';

describe('Layer Reducers', () => {
  const initialState: State = {
    model: {
      title: 'Test',
      version: '1.0.0',
      items: [],
      views: [
        {
          id: 'view1',
          name: 'Test View',
          items: [],
          layers: []
        }
      ],
      icons: [],
      colors: []
    },
    scene: INITIAL_SCENE_STATE
  };

  describe('createLayer', () => {
    test('creates a new layer in the view', () => {
      const newLayer = {
        id: 'layer1',
        name: 'New Layer',
        items: [],
        zOffset: 2,
        visible: true
      };

      const result = createLayer(newLayer, {
        viewId: 'view1',
        state: initialState
      });

      expect(result.model.views[0].layers).toHaveLength(1);
      expect(result.model.views[0].layers?.[0]).toEqual(
        expect.objectContaining({
          id: 'layer1',
          name: 'New Layer',
          zOffset: 2,
          visible: true
        })
      );
    });

    test('initializes layers array if it does not exist', () => {
      const stateWithoutLayers: State = {
        ...initialState,
        model: {
          ...initialState.model,
          views: [
            {
              id: 'view1',
              name: 'Test View',
              items: []
            }
          ]
        }
      };

      const newLayer = {
        id: 'layer1',
        name: 'New Layer',
        items: [],
        zOffset: 0,
        visible: true
      };

      const result = createLayer(newLayer, {
        viewId: 'view1',
        state: stateWithoutLayers
      });

      expect(result.model.views[0].layers).toBeDefined();
      expect(result.model.views[0].layers).toHaveLength(1);
    });
  });

  describe('updateLayer', () => {
    test('updates layer properties', () => {
      const stateWithLayer: State = {
        ...initialState,
        model: {
          ...initialState.model,
          views: [
            {
              id: 'view1',
              name: 'Test View',
              items: [],
              layers: [
                {
                  id: 'layer1',
                  name: 'Original Name',
                  items: [],
                  zOffset: 0,
                  visible: true
                }
              ]
            }
          ]
        }
      };

      const result = updateLayer(
        {
          id: 'layer1',
          name: 'Updated Name',
          visible: false
        },
        {
          viewId: 'view1',
          state: stateWithLayer
        }
      );

      expect(result.model.views[0].layers?.[0].name).toBe('Updated Name');
      expect(result.model.views[0].layers?.[0].visible).toBe(false);
      expect(result.model.views[0].layers?.[0].zOffset).toBe(0); // unchanged
    });
  });

  describe('deleteLayer', () => {
    test('removes a layer from the view', () => {
      const stateWithLayers: State = {
        ...initialState,
        model: {
          ...initialState.model,
          views: [
            {
              id: 'view1',
              name: 'Test View',
              items: [],
              layers: [
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
                  visible: true
                }
              ]
            }
          ]
        }
      };

      const result = deleteLayer('layer1', {
        viewId: 'view1',
        state: stateWithLayers
      });

      expect(result.model.views[0].layers).toHaveLength(1);
      expect(result.model.views[0].layers?.[0].id).toBe('layer2');
    });
  });
});
