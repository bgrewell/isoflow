import React from 'react';
import { Layer } from 'src/types';
import { Nodes } from '../Nodes/Nodes';

interface Props {
  layers: Layer[];
}

export const Layers = ({ layers }: Props) => {
  return (
    <>
      {layers
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

          return <Nodes key={layer.id} nodes={adjustedItems} />;
        })}
    </>
  );
};
