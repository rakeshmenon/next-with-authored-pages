import React from 'react';
import ComponentRegistry from '../componentRegistry';

const subsectionRenderer = layoutInfo => {
  const { sections, contexts } = layoutInfo;
  const Section = ComponentRegistry.regions.section;

  return sections.map((section, index) => {
    return (
      <Section
        key={Math.random()}
        subsectionInfo={sections[index]}
        contexts={contexts}
      />
    );
  });
};

export default subsectionRenderer;
