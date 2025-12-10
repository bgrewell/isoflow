import React, { useMemo } from 'react';
import { Layer } from 'src/types';
import { SceneLayer } from 'src/components/SceneLayer/SceneLayer';
import { Nodes } from '../Nodes/Nodes';

interface Props {
  layers: Layer[];
}

export const Layers = ({ layers }: Props) => {
  // Memoize the layer processing to avoid recalculation on every render
  const processedLayers = useMemo(() => {
    return layers
      .filter((layer) => {
        return layer.visible;
      })
      .sort((a, b) => {
        // Sort by zOffset to ensure proper rendering order (lower layers first)
        return a.zOffset - b.zOffset;
      })
      .map((layer) => {
        // Apply z-offset to each item in the layer by adjusting the tile positions
        const adjustedItems = layer.items.map((item) => {
          return {
            ...item,
            tile: {
              x: item.tile.x,
              y: item.tile.y + layer.zOffset
            }
          };
        });

        return {
          id: layer.id,
          items: adjustedItems,
          zOffset: layer.zOffset,
          transparency: layer.transparency ?? 1
        };
      });
  }, [layers]);

  return (
    <>
      {processedLayers.map(({ id, items, zOffset, transparency }) => {
        return (
          <SceneLayer key={id} order={zOffset} sx={{ opacity: transparency }}>
            <Nodes nodes={items} />
          </SceneLayer>
        );
      })}
    </>
  );
};
