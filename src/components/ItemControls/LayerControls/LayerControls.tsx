import React, { useCallback, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  IconButton as MuiIconButton,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useScene } from 'src/hooks/useScene';
import { generateId } from 'src/utils';
import { LAYER_DEFAULTS } from 'src/config';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { Header } from '../components/Header';

export const LayerControls = () => {
  const { layers, createLayer, updateLayer, deleteLayer } = useScene();
  const [newLayerName, setNewLayerName] = useState('');
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(
    layers.length > 0 ? layers[0].id : null
  );

  const selectedLayer = layers.find((l) => {
    return l.id === selectedLayerId;
  });

  const handleCreateLayer = useCallback(() => {
    const layerId = generateId();
    const name = newLayerName.trim() || 'New Layer';

    createLayer({
      ...LAYER_DEFAULTS,
      id: layerId,
      name,
      zOffset: layers.length * 3
    });

    setSelectedLayerId(layerId);
    setNewLayerName('');
  }, [createLayer, newLayerName, layers.length]);

  const handleDeleteLayer = useCallback(
    (layerId: string) => {
      deleteLayer(layerId);
      if (selectedLayerId === layerId) {
        setSelectedLayerId(layers.length > 1 ? layers[0].id : null);
      }
    },
    [deleteLayer, selectedLayerId, layers]
  );

  const handleToggleVisibility = useCallback(
    (layerId: string, visible: boolean) => {
      updateLayer(layerId, { visible });
    },
    [updateLayer]
  );

  const handleUpdateZOffset = useCallback(
    (layerId: string, zOffset: number) => {
      updateLayer(layerId, { zOffset });
    },
    [updateLayer]
  );

  const handleUpdateName = useCallback(
    (layerId: string, name: string) => {
      updateLayer(layerId, { name });
    },
    [updateLayer]
  );

  const handleUpdateTransparency = useCallback(
    (layerId: string, transparency: number) => {
      updateLayer(layerId, { transparency });
    },
    [updateLayer]
  );

  return (
    <ControlsContainer header={<Header title="Layer Management" />}>
      <Section>
        <Typography variant="subtitle2" gutterBottom>
          Layers
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Create and manage visual layers for your diagram
        </Typography>

        {layers.length === 0 && (
          <Box sx={{ mb: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              No layers yet. Add a layer to get started.
            </Typography>
          </Box>
        )}

        {layers.length > 0 && (
          <List dense sx={{ mb: 2 }}>
            {layers.map((layer) => {
              return (
                <ListItem
                  key={layer.id}
                  button
                  selected={selectedLayerId === layer.id}
                  onClick={() => {
                    setSelectedLayerId(layer.id);
                  }}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    }
                  }}
                >
                  <ListItemText
                    primary={layer.name}
                    secondary={`zOffset: ${layer.zOffset} | ${layer.items.length} items`}
                    secondaryTypographyProps={{
                      sx: {
                        color:
                          selectedLayerId === layer.id
                            ? 'primary.contrastText'
                            : 'text.secondary'
                      }
                    }}
                  />
                  <ListItemSecondaryAction>
                    <MuiIconButton
                      edge="end"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleVisibility(layer.id, !layer.visible);
                      }}
                      sx={{
                        color:
                          selectedLayerId === layer.id
                            ? 'primary.contrastText'
                            : 'inherit'
                      }}
                    >
                      {layer.visible ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </MuiIconButton>
                    <MuiIconButton
                      edge="end"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLayer(layer.id);
                      }}
                      sx={{
                        color:
                          selectedLayerId === layer.id
                            ? 'primary.contrastText'
                            : 'inherit',
                        ml: 1
                      }}
                    >
                      <DeleteIcon />
                    </MuiIconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}

        <Stack spacing={1} direction="row" sx={{ mb: 3 }}>
          <TextField
            size="small"
            placeholder="Layer name"
            value={newLayerName}
            onChange={(e) => {
              setNewLayerName(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCreateLayer();
              }
            }}
            fullWidth
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateLayer}
          >
            Add
          </Button>
        </Stack>

        {selectedLayer && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Layer Settings: {selectedLayer.name}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <TextField
                label="Name"
                size="small"
                value={selectedLayer.name}
                onChange={(e) => {
                  handleUpdateName(selectedLayer.id, e.target.value);
                }}
                fullWidth
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" gutterBottom>
                Vertical Offset (z-offset): {selectedLayer.zOffset}
              </Typography>
              <Slider
                value={selectedLayer.zOffset}
                onChange={(_, value) => {
                  handleUpdateZOffset(selectedLayer.id, value as number);
                }}
                min={0}
                max={20}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" gutterBottom>
                Transparency:{' '}
                {Math.round((selectedLayer.transparency ?? 1) * 100)}%
              </Typography>
              <Slider
                value={selectedLayer.transparency ?? 1}
                onChange={(_, value) => {
                  handleUpdateTransparency(selectedLayer.id, value as number);
                }}
                min={0}
                max={1}
                step={0.01}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => {
                  return `${Math.round(value * 100)}%`;
                }}
                sx={{ mb: 2 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={selectedLayer.visible}
                    onChange={(e) => {
                      handleToggleVisibility(
                        selectedLayer.id,
                        e.target.checked
                      );
                    }}
                  />
                }
                label="Visible"
              />

              <Box
                sx={{ mt: 2, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}
              >
                <Typography variant="caption" color="text.secondary">
                  {selectedLayer.items.length} item(s) on this layer
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Section>
    </ControlsContainer>
  );
};
