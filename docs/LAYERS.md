# Visual Layers Feature

## Overview

The visual layers feature allows you to create multi-tiered isometric diagrams by stacking multiple layers vertically. This is particularly useful for representing complex architectures where different components exist at different abstraction levels.

## Use Cases

- **Infrastructure + Platform + Application**: Show how your application services run on a Kubernetes platform, which itself runs on cloud infrastructure
- **Network Architecture**: Layer network zones (DMZ, internal, secure) with their respective components
- **Microservices Architecture**: Separate presentation, business logic, and data layers
- **Cloud Architecture**: Distinguish between IaaS, PaaS, and SaaS components

## How It Works

Each view can contain an optional `layers` array. Each layer has:
- **id**: Unique identifier
- **name**: Display name for the layer
- **description**: Optional description of the layer's purpose
- **items**: Array of view items (nodes) positioned on this layer
- **zOffset**: Vertical offset (in tiles) from the base view. Higher values appear above lower values.
- **visible**: Boolean to show/hide the layer

## Example Usage

```typescript
import Isoflow from 'isoflow';

const data = {
  title: 'Multi-Layer Architecture',
  items: [
    { id: 'database', name: 'Database', icon: 'storage' },
    { id: 'api', name: 'API Service', icon: 'server' },
    { id: 'web', name: 'Web App', icon: 'browser' }
  ],
  views: [
    {
      id: 'layered-view',
      name: 'Layered Architecture',
      items: [], // Empty when using layers
      layers: [
        {
          id: 'data-layer',
          name: 'Data Layer',
          zOffset: 0,
          visible: true,
          items: [
            { id: 'database', tile: { x: 0, y: 0 } }
          ]
        },
        {
          id: 'service-layer',
          name: 'Service Layer',
          zOffset: 3,
          visible: true,
          items: [
            { id: 'api', tile: { x: 0, y: 0 } }
          ]
        },
        {
          id: 'presentation-layer',
          name: 'Presentation Layer',
          zOffset: 6,
          visible: true,
          items: [
            { id: 'web', tile: { x: 0, y: 0 } }
          ]
        }
      ]
    }
  ]
};

<Isoflow initialData={data} />
```

## Layer Management API

When using the `useScene` hook, you have access to layer CRUD operations:

```typescript
import { useScene } from 'isoflow';

const MyComponent = () => {
  const { 
    layers,           // Array of current layers
    createLayer,      // (layer: Layer) => void
    updateLayer,      // (id: string, updates: Partial<Layer>) => void
    deleteLayer       // (id: string) => void
  } = useScene();

  // Create a new layer
  const handleAddLayer = () => {
    createLayer({
      id: 'new-layer',
      name: 'New Layer',
      items: [],
      zOffset: 3,
      visible: true
    });
  };

  // Toggle layer visibility
  const handleToggleVisibility = (layerId: string) => {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
      updateLayer(layerId, { visible: !layer.visible });
    }
  };

  // Remove a layer
  const handleRemoveLayer = (layerId: string) => {
    deleteLayer(layerId);
  };

  return (
    // Your component JSX
  );
};
```

## Best Practices

1. **Z-Offset Spacing**: Use consistent spacing between layers (e.g., 3 tiles) for visual clarity
2. **Layer Naming**: Use descriptive names that indicate the layer's purpose or abstraction level
3. **Item Positioning**: Position items relative to each layer's coordinate system (0,0) for easier management
4. **Visibility Toggle**: Use the visible property to show/hide layers without removing them
5. **Backward Compatibility**: If `layers` is empty or not defined, the view falls back to rendering the `items` array directly

## Migration Guide

### From Flat to Layered Views

If you have an existing flat view:

```typescript
{
  id: 'my-view',
  items: [
    { id: 'item1', tile: { x: 0, y: 0 } },
    { id: 'item2', tile: { x: 0, y: 3 } }
  ]
}
```

You can migrate to layers:

```typescript
{
  id: 'my-view',
  items: [], // Empty when using layers
  layers: [
    {
      id: 'layer1',
      name: 'Base Layer',
      zOffset: 0,
      visible: true,
      items: [
        { id: 'item1', tile: { x: 0, y: 0 } }
      ]
    },
    {
      id: 'layer2',
      name: 'Upper Layer',
      zOffset: 3,
      visible: true,
      items: [
        { id: 'item2', tile: { x: 0, y: 0 } }
      ]
    }
  ]
}
```

## Examples

Check out the `LayeredArchitecture` example in the examples directory to see a complete multi-tier architecture diagram with Infrastructure, Platform, and Application layers.

## Technical Details

- Layers are rendered in order, with items from all visible layers combined
- Each layer's items have their tile positions adjusted by the layer's `zOffset`
- The z-index ordering ensures items from higher layers appear above lower layers
- Connectors can span across layers by referencing items from different layers
