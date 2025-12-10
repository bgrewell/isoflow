import React from 'react';
import {
  Slider,
  Box,
  TextField,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { ModelItem, ViewItem } from 'src/types';
import { MarkdownEditor } from 'src/components/MarkdownEditor/MarkdownEditor';
import { useModelItem } from 'src/hooks/useModelItem';
import { useScene } from 'src/hooks/useScene';
import { DeleteButton } from '../../components/DeleteButton';
import { Section } from '../../components/Section';

export type NodeUpdates = {
  model: Partial<ModelItem>;
  view: Partial<ViewItem>;
};

interface Props {
  node: ViewItem;
  onModelItemUpdated: (updates: Partial<ModelItem>) => void;
  onViewItemUpdated: (updates: Partial<ViewItem>) => void;
  onDeleted: () => void;
}

export const NodeSettings = ({
  node,
  onModelItemUpdated,
  onViewItemUpdated,
  onDeleted
}: Props) => {
  const modelItem = useModelItem(node.id);
  const { items } = useScene();

  const handleZIndexChange = (delta: number | 'front' | 'back') => {
    const allItems = items;
    const currentZIndex = node.zIndex ?? 0;

    let newZIndex: number;

    if (delta === 'front') {
      const maxZIndex = Math.max(
        0,
        ...allItems.map((n) => {
          return n.zIndex ?? 0;
        })
      );
      newZIndex = maxZIndex + 1;
    } else if (delta === 'back') {
      const minZIndex = Math.min(
        0,
        ...allItems.map((n) => {
          return n.zIndex ?? 0;
        })
      );
      newZIndex = minZIndex - 1;
    } else {
      newZIndex = currentZIndex + delta;
    }

    onViewItemUpdated({ zIndex: newZIndex });
  };

  return (
    <>
      <Section title="Name">
        <TextField
          value={modelItem.name}
          onChange={(e) => {
            const text = e.target.value as string;
            if (modelItem.name !== text) onModelItemUpdated({ name: text });
          }}
        />
      </Section>
      <Section title="Description">
        <MarkdownEditor
          value={modelItem.description}
          onChange={(text) => {
            if (modelItem.description !== text)
              onModelItemUpdated({ description: text });
          }}
        />
      </Section>
      {modelItem.name && (
        <Section title="Label height">
          <Slider
            marks
            step={20}
            min={60}
            max={280}
            value={node.labelHeight}
            onChange={(e, newHeight) => {
              const labelHeight = newHeight as number;
              onViewItemUpdated({ labelHeight });
            }}
          />
        </Section>
      )}
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
          <DeleteButton onClick={onDeleted} />
        </Box>
      </Section>
    </>
  );
};
