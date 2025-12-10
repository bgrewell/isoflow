import React from 'react';
import { Box, Typography, Slider, Stack, Button } from '@mui/material';
import { useRectangle } from 'src/hooks/useRectangle';
import { ColorSelector } from 'src/components/ColorSelector/ColorSelector';
import { ColorPicker } from 'src/components/ColorSelector/ColorPicker';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useScene } from 'src/hooks/useScene';
import {
  RECTANGLE_DEFAULT_FILL_COLOR,
  RECTANGLE_DEFAULT_OUTLINE_COLOR
} from 'src/config';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { DeleteButton } from '../components/DeleteButton';

interface Props {
  id: string;
}

export const RectangleControls = ({ id }: Props) => {
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const rectangle = useRectangle(id);
  const { updateRectangle, deleteRectangle, rectangles } = useScene();

  const handleZIndexChange = (delta: number | 'front' | 'back') => {
    const allRectangles = rectangles;
    const currentZIndex = rectangle.zIndex ?? 0;

    let newZIndex: number;

    if (delta === 'front') {
      // Move to front - get max zIndex + 1
      const maxZIndex = Math.max(
        0,
        ...allRectangles.map((r) => {
          return r.zIndex ?? 0;
        })
      );
      newZIndex = maxZIndex + 1;
    } else if (delta === 'back') {
      // Move to back - get min zIndex - 1
      const minZIndex = Math.min(
        0,
        ...allRectangles.map((r) => {
          return r.zIndex ?? 0;
        })
      );
      newZIndex = minZIndex - 1;
    } else {
      newZIndex = currentZIndex + delta;
    }

    updateRectangle(rectangle.id, { zIndex: newZIndex });
  };

  return (
    <ControlsContainer>
      <Section>
        <ColorSelector
          onChange={(color) => {
            updateRectangle(rectangle.id, {
              color,
              colorValue: undefined,
              outlineColor: undefined
            });
          }}
          activeColor={rectangle.color}
        />
      </Section>
      <Section title="Custom fill color">
        <ColorPicker
          value={rectangle.colorValue || RECTANGLE_DEFAULT_FILL_COLOR}
          onChange={(newColor) => {
            updateRectangle(rectangle.id, {
              colorValue: newColor,
              outlineColor: undefined
            });
          }}
        />
      </Section>
      <Section title="Outline color">
        <ColorPicker
          value={rectangle.outlineColor || RECTANGLE_DEFAULT_OUTLINE_COLOR}
          onChange={(newColor) => {
            updateRectangle(rectangle.id, { outlineColor: newColor });
          }}
        />
      </Section>
      <Section>
        <Typography variant="body2" gutterBottom>
          Outline width: {rectangle.outlineWidth ?? 1}
        </Typography>
        <Slider
          value={rectangle.outlineWidth ?? 1}
          onChange={(_, value) => {
            updateRectangle(rectangle.id, { outlineWidth: value as number });
          }}
          min={0}
          max={10}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </Section>
      <Section>
        <Typography variant="body2" gutterBottom>
          Transparency: {Math.round((rectangle.transparency ?? 1) * 100)}%
        </Typography>
        <Slider
          value={rectangle.transparency ?? 1}
          onChange={(_, value) => {
            updateRectangle(rectangle.id, { transparency: value as number });
          }}
          min={0}
          max={1}
          step={0.01}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => {
            return `${Math.round(value * 100)}%`;
          }}
        />
      </Section>
      <Section>
        <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
          Position
        </Typography>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              fullWidth
              onClick={() => {
                return handleZIndexChange('front');
              }}
            >
              Bring to Front
            </Button>
            <Button
              size="small"
              variant="outlined"
              fullWidth
              onClick={() => {
                return handleZIndexChange('back');
              }}
            >
              Send to Back
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              fullWidth
              onClick={() => {
                return handleZIndexChange(1);
              }}
            >
              Bring Forward
            </Button>
            <Button
              size="small"
              variant="outlined"
              fullWidth
              onClick={() => {
                return handleZIndexChange(-1);
              }}
            >
              Send Backward
            </Button>
          </Stack>
        </Stack>
      </Section>
      <Section>
        <Box>
          <DeleteButton
            onClick={() => {
              uiStateActions.setItemControls(null);
              deleteRectangle(rectangle.id);
            }}
          />
        </Box>
      </Section>
    </ControlsContainer>
  );
};
