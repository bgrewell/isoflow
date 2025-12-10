import React from 'react';
import { useScene } from 'src/hooks/useScene';
import { TextBox } from './TextBox';

interface Props {
  textBoxes: ReturnType<typeof useScene>['textBoxes'];
}

export const TextBoxes = ({ textBoxes }: Props) => {
  // Sort textBoxes by zIndex in ascending order (lower zIndex renders first/behind)
  const sortedTextBoxes = [...textBoxes].sort((a, b) => {
    const aZIndex = a.zIndex ?? 0;
    const bZIndex = b.zIndex ?? 0;
    return aZIndex - bZIndex;
  });

  return (
    <>
      {sortedTextBoxes.map((textBox) => {
        return <TextBox key={textBox.id} textBox={textBox} />;
      })}
    </>
  );
};
