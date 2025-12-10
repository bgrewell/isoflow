import React from 'react';
import { useScene } from 'src/hooks/useScene';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { getColorVariant } from 'src/utils';
import { useColor } from 'src/hooks/useColor';

type Props = ReturnType<typeof useScene>['rectangles'][0];

export const Rectangle = ({
  from,
  to,
  color: colorId,
  colorValue,
  outlineColor,
  outlineWidth,
  transparency = 1
}: Props) => {
  const color = useColor(colorId);

  // Use colorValue if provided, otherwise use the color from the color palette
  const fillColor = colorValue || color.value;

  // Use outlineColor if provided, otherwise use the default darker variant
  const strokeColor =
    outlineColor || getColorVariant(fillColor, 'dark', { grade: 2 });

  // Use outlineWidth if provided, otherwise use default of 1
  const strokeWidth = outlineWidth ?? 1;

  return (
    <IsoTileArea
      from={from}
      to={to}
      fill={fillColor}
      cornerRadius={22}
      stroke={{
        color: strokeColor,
        width: strokeWidth
      }}
      opacity={transparency}
    />
  );
};
