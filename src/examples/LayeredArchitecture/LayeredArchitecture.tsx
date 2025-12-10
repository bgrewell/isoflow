import React from 'react';
import Isoflow from 'src/Isoflow';
import { layeredArchitectureData } from './layeredArchitectureData';

export const LayeredArchitecture = () => {
  return (
    <Isoflow initialData={{ ...layeredArchitectureData, fitToView: true }} />
  );
};
