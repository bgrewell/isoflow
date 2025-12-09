import React, { useMemo } from 'react';
import { Layer } from 'src/types';
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

        return { id: layer.id, items: adjustedItems };
      });
  }, [layers]);

  return (
    <>
      {processedLayers.map(({ id, items }) => {
        return <Nodes key={id} nodes={items} />;
      })}
    </>
  );
};
