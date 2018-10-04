import React from 'react';
import Section from '../../regions/Section';

const subsectionRenderer = layoutInfo => {
  const { sections, contexts } = layoutInfo;

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
