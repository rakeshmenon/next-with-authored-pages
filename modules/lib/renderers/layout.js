import React from 'react';
import Loadables from '../../loadables';

const layoutRenderer = layoutInfo => {
  const { sections, contexts } = layoutInfo;
  const Section = Loadables.regions.section;

  return sections.map(section => (
    <Section key={section.id} subsectionInfo={section} contexts={contexts} />
  ));
};

export default layoutRenderer;
