import React from 'react';
import { useScene } from 'src/hooks/useScene';
import { Rectangle } from './Rectangle';

interface Props {
  rectangles: ReturnType<typeof useScene>['rectangles'];
}

export const Rectangles = ({ rectangles }: Props) => {
  // Sort rectangles by zIndex in ascending order (lower zIndex renders first/behind)
  const sortedRectangles = [...rectangles].sort((a, b) => {
    const aZIndex = a.zIndex ?? 0;
    const bZIndex = b.zIndex ?? 0;
    return aZIndex - bZIndex;
  });

  return (
    <>
      {sortedRectangles.map((rectangle) => {
        return <Rectangle key={rectangle.id} {...rectangle} />;
      })}
    </>
  );
};
