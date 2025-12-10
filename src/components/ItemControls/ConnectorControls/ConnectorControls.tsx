import React from 'react';
import { Connector, connectorStyleOptions } from 'src/types';
import {
  Box,
  Slider,
  Select,
  MenuItem,
  TextField,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { useConnector } from 'src/hooks/useConnector';
import { ColorSelector } from 'src/components/ColorSelector/ColorSelector';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useScene } from 'src/hooks/useScene';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { DeleteButton } from '../components/DeleteButton';

interface Props {
  id: string;
}

export const ConnectorControls = ({ id }: Props) => {
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const connector = useConnector(id);
  const { updateConnector, deleteConnector, connectors } = useScene();

  const handleZIndexChange = (delta: number | 'front' | 'back') => {
    const allConnectors = connectors;
    const currentZIndex = connector.zIndex ?? 0;

    let newZIndex: number;

    if (delta === 'front') {
      const maxZIndex = Math.max(
        0,
        ...allConnectors.map((c) => {
          return c.zIndex ?? 0;
        })
      );
      newZIndex = maxZIndex + 1;
    } else if (delta === 'back') {
      const minZIndex = Math.min(
        0,
        ...allConnectors.map((c) => {
          return c.zIndex ?? 0;
        })
      );
      newZIndex = minZIndex - 1;
    } else {
      newZIndex = currentZIndex + delta;
    }

    updateConnector(connector.id, { zIndex: newZIndex });
  };

  return (
    <ControlsContainer>
      <Section>
        <TextField
          label="Description"
          value={connector.description}
          onChange={(e) => {
            updateConnector(connector.id, {
              description: e.target.value as string
            });
          }}
        />
      </Section>
      <Section>
        <ColorSelector
          onChange={(color) => {
            return updateConnector(connector.id, { color });
          }}
          activeColor={connector.color}
        />
      </Section>
      <Section title="Width">
        <Slider
          marks
          step={10}
          min={10}
          max={30}
          value={connector.width}
          onChange={(e, newWidth) => {
            updateConnector(connector.id, { width: newWidth as number });
          }}
        />
      </Section>
      <Section title="Style">
        <Select
          value={connector.style}
          onChange={(e) => {
            updateConnector(connector.id, {
              style: e.target.value as Connector['style']
            });
          }}
        >
          {Object.values(connectorStyleOptions).map((style) => {
            return <MenuItem value={style}>{style}</MenuItem>;
          })}
        </Select>
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
              deleteConnector(connector.id);
            }}
          />
        </Box>
      </Section>
    </ControlsContainer>
  );
};
