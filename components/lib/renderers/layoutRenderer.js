import React from 'react';
import Section from '../../regions/Section';

const layoutRenderer = layoutInfo => {
  const { sections, contexts } = layoutInfo;

  return sections.map(section => (
    <Section key={section.id} subsectionInfo={section} contexts={contexts} />
  ));
};

export default layoutRenderer;
