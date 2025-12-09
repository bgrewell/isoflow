import { produce } from 'immer';
import { Layer } from 'src/types';
import { getItemByIdOrThrow } from 'src/utils';
import { LAYER_DEFAULTS } from 'src/config';
import { ViewReducerContext, State } from './types';

export const createLayer = (
  newLayer: Layer,
  { viewId, state }: ViewReducerContext
): State => {
  const newState = produce(state, (draft) => {
    const view = getItemByIdOrThrow(draft.model.views, viewId);

    if (!view.value.layers) {
      view.value.layers = [];
    }

    view.value.layers.push({
      ...LAYER_DEFAULTS,
      ...newLayer
    });
  });

  return newState;
};

export const updateLayer = (
  { id, ...updates }: Partial<Layer> & { id: string },
  { viewId, state }: ViewReducerContext
): State => {
  const newState = produce(state, (draft) => {
    const view = getItemByIdOrThrow(draft.model.views, viewId);
    const layers = view.value.layers ?? [];
    const layer = getItemByIdOrThrow(layers, id);

    const updatedLayer = { ...layer.value, ...updates };
    layers[layer.index] = updatedLayer;
  });

  return newState;
};

export const deleteLayer = (
  id: string,
  { viewId, state }: ViewReducerContext
): State => {
  const newState = produce(state, (draft) => {
    const view = getItemByIdOrThrow(draft.model.views, viewId);
    const layers = view.value.layers ?? [];
    const layer = getItemByIdOrThrow(layers, id);

    layers.splice(layer.index, 1);
  });

  return newState;
};
