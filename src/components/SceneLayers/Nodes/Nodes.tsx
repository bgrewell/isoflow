import React from 'react';
import { ViewItem } from 'src/types';
import { Node } from './Node/Node';

interface Props {
  nodes: ViewItem[];
}

export const Nodes = ({ nodes }: Props) => {
  // Helper function to calculate natural isometric ordering based on tile position
  const getTileOrder = (node: ViewItem) => {
    return -node.tile.x - node.tile.y;
  };

  // Sort nodes by zIndex first, then by tile position for natural isometric ordering
  const sortedNodes = [...nodes].sort((a, b) => {
    const aZIndex = a.zIndex ?? 0;
    const bZIndex = b.zIndex ?? 0;

    if (aZIndex !== bZIndex) {
      return aZIndex - bZIndex;
    }

    // If zIndex is the same, use tile position for natural ordering
    return getTileOrder(a) - getTileOrder(b);
  });

  return (
    <>
      {sortedNodes.map((node) => {
        return (
          <Node
            key={node.id}
            order={node.zIndex ?? getTileOrder(node)}
            node={node}
          />
        );
      })}
    </>
  );
};
