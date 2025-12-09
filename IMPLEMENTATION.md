# Visual Layers Implementation Summary

## Overview
This implementation adds support for multi-tiered isometric diagrams with vertically stacked visual layers. Users can now create complex layered architecture diagrams where components exist at different abstraction levels.

## What Was Changed

### 1. Data Model (`src/schemas/views.ts`)
- Added `layerSchema` with fields: id, name, description, items, zOffset, visible
- Updated `viewSchema` to include optional `layers` array
- Maintains backward compatibility with existing flat `items` structure

### 2. Type Definitions (`src/types/model.ts`)
- Exported `Layer` type for TypeScript support
- Added to all type exports for consistent API

### 3. Configuration (`src/config.ts`)
- Added `LAYER_DEFAULTS` constant with sensible defaults:
  - zOffset: 0
  - visible: true

### 4. Renderer (`src/components/SceneLayers/Layers/Layers.tsx`)
- New component that processes layers with z-offset transformations
- Filters visible layers
- Applies tile position adjustments based on zOffset
- Uses `useMemo` for performance optimization

### 5. Scene Hook (`src/hooks/useScene.ts`)
- Added `layers` to returned data
- Implemented CRUD operations:
  - `createLayer(layer: Layer)`
  - `updateLayer(id: string, updates: Partial<Layer>)`
  - `deleteLayer(id: string)`

### 6. State Management (`src/stores/reducers/`)
- New `layer.ts` reducer with create/update/delete operations
- Updated `view.ts` to handle layer actions
- Updated `types.ts` with layer action definitions
- Uses Immer for immutable state updates

### 7. Tests
- **Schema tests** (5 tests): Validate layer data structure
- **Reducer tests** (4 tests): Test CRUD operations
- All 9 tests passing

### 8. Example (`src/examples/LayeredArchitecture/`)
- Demonstrates three-tier architecture:
  - Infrastructure Layer (AWS VPC, RDS, S3) at zOffset: 0
  - Platform Layer (Kubernetes) at zOffset: 3
  - Application Layer (Web, API, Worker) at zOffset: 6
- Shows connectors spanning across layers
- Includes rectangles and text boxes for visual grouping

### 9. Documentation
- `docs/LAYERS.md`: Comprehensive guide with:
  - Use cases and examples
  - API documentation
  - Migration guide
  - Best practices
- Updated `README.md` with feature highlight

## Technical Implementation Details

### Z-Offset Calculation
The z-offset is applied to item tile positions during rendering:
```typescript
const adjustedItems = layer.items.map((item) => ({
  ...item,
  tile: {
    x: item.tile.x,
    y: item.tile.y + layer.zOffset  // Vertical offset applied here
  }
}));
```

### Backward Compatibility
The renderer checks for layers and falls back to flat items:
```typescript
{layers.length > 0 ? (
  <Layers layers={layers} />
) : (
  <Nodes nodes={items} />
)}
```

### Performance Optimization
- Layer processing is memoized with `useMemo` to avoid recalculation on every render
- Only recalculates when `layers` array changes

### State Management
- Uses Immer's `produce` for immutable updates
- Direct draft mutation inside `produce` callback for clarity
- All operations properly update view timestamps

## Usage Example

```typescript
const data = {
  items: [/* ... */],
  views: [{
    id: 'layered-view',
    name: 'Architecture',
    items: [],  // Empty when using layers
    layers: [
      {
        id: 'infra',
        name: 'Infrastructure',
        zOffset: 0,
        visible: true,
        items: [{ id: 'db', tile: { x: 0, y: 0 } }]
      },
      {
        id: 'app',
        name: 'Application',
        zOffset: 3,
        visible: true,
        items: [{ id: 'api', tile: { x: 0, y: 0 } }]
      }
    ]
  }]
};

<Isoflow initialData={data} />
```

## Testing

Run layer-specific tests:
```bash
npm test -- layer.test
```

Run all tests:
```bash
npm test
```

Build the project:
```bash
npm run build
```

## Security

- CodeQL scan: **0 alerts**
- No security vulnerabilities detected
- Follows secure coding practices
- Uses immutable state management

## Files Changed

**Core Implementation:**
- `src/schemas/views.ts` - Layer schema
- `src/types/model.ts` - Layer type exports
- `src/config.ts` - Layer defaults
- `src/components/SceneLayers/Layers/Layers.tsx` - Layer renderer
- `src/components/Renderer/Renderer.tsx` - Integration
- `src/hooks/useScene.ts` - Layer CRUD API
- `src/stores/reducers/layer.ts` - Layer reducers
- `src/stores/reducers/view.ts` - View reducer updates
- `src/stores/reducers/types.ts` - Type definitions

**Tests:**
- `src/schemas/__tests__/layer.test.ts`
- `src/stores/reducers/__tests__/layer.test.ts`

**Examples:**
- `src/examples/LayeredArchitecture/LayeredArchitecture.tsx`
- `src/examples/LayeredArchitecture/layeredArchitectureData.ts`
- `src/examples/index.tsx`

**Documentation:**
- `docs/LAYERS.md`
- `README.md`

## Future Enhancements (Not in Scope)

Potential future improvements could include:
- UI controls for layer management in the editor
- Layer reordering drag-and-drop
- Layer groups/nesting
- Per-layer styling options
- Layer import/export

## Conclusion

This implementation provides a solid foundation for multi-tiered isometric diagrams while maintaining backward compatibility and following best practices for performance, security, and code quality.
