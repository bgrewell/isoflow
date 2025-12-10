# Custom Shape Colors Feature

## Overview
This feature allows users to set custom fill colors, outline colors, and transparency on rectangle shapes in Isoflow diagrams.

## Features

### 1. Custom Fill Colors
Rectangles can now have custom fill colors specified as hex color values (e.g., `#ff0000` for red), in addition to selecting from the predefined color palette.

**Schema Changes:**
- Added `colorValue` field to rectangle schema (optional string)
- When `colorValue` is set, it takes precedence over the predefined `color` ID

**Usage:**
```typescript
const rectangle = {
  id: 'rect1',
  colorValue: '#ff00ff', // Custom magenta color
  from: { x: 0, y: 0 },
  to: { x: 2, y: 2 }
};
```

### 2. Custom Outline Colors
Rectangles can now have custom outline (stroke) colors specified independently from the fill color.

**Schema Changes:**
- Added `outlineColor` field to rectangle schema (optional string)
- When `outlineColor` is set, it overrides the default behavior of using a darker variant of the fill color

**Usage:**
```typescript
const rectangle = {
  id: 'rect1',
  color: 'color1',
  outlineColor: '#000000', // Black outline
  from: { x: 0, y: 0 },
  to: { x: 2, y: 2 }
};
```

### 3. Transparency (Already Existing)
Rectangles support transparency values between 0 (fully transparent) and 1 (fully opaque).

**Usage:**
```typescript
const rectangle = {
  id: 'rect1',
  color: 'color1',
  transparency: 0.5, // 50% opacity
  from: { x: 0, y: 0 },
  to: { x: 2, y: 2 }
};
```

## UI Controls

When a rectangle is selected, the Rectangle Controls panel now includes:

1. **Color Palette Selector**: Select from predefined colors (existing feature)
2. **Custom Fill Color Picker**: Choose any color for the rectangle fill
3. **Outline Color Picker**: Choose any color for the rectangle outline
4. **Transparency Slider**: Adjust opacity from 0% to 100%

## Technical Implementation

### Schema
The `rectangleSchema` in `src/schemas/rectangle.ts` has been extended:
```typescript
export const rectangleSchema = z.object({
  id,
  color: id.optional(),
  colorValue: z.string().optional(), // Direct hex color value
  outlineColor: z.string().optional(), // Custom outline color
  from: coords,
  to: coords,
  transparency: z.number().min(0).max(1).optional(),
  zIndex: z.number().optional()
});
```

### Rendering Logic
The `Rectangle` component in `src/components/SceneLayers/Rectangles/Rectangle.tsx` implements the following priority:
1. If `colorValue` is set, use it as the fill color
2. Otherwise, use the color from the palette referenced by `color` ID
3. If `outlineColor` is set, use it as the stroke color
4. Otherwise, use a darker variant of the fill color (default behavior)

### UI Components
The `RectangleControls` component in `src/components/ItemControls/RectangleControls/RectangleControls.tsx` has been updated to include:
- Custom fill color picker using the `ColorPicker` component
- Outline color picker using the `ColorPicker` component
- Both pickers use the existing MUI color input component

## Backward Compatibility
All changes are backward compatible:
- Existing rectangles without `colorValue` or `outlineColor` will continue to work as before
- The new fields are optional and have no default values
- Existing diagrams will render unchanged

## Testing
Comprehensive tests have been added in `src/schemas/__tests__/rectangle.test.ts` to verify:
- Rectangles with color ID only
- Rectangles with custom color value
- Rectangles with outline color
- Rectangles with both custom color and outline color
- Minimal rectangles with only required fields
