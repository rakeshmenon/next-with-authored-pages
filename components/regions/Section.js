import React from 'react';
import ComponentRegistry from '../lib/componentRegistry';

const Section = ({ subsectionInfo, contexts }) => {
  const subsectionType = subsectionInfo.type;
  const SubSection = ComponentRegistry.regions.subsection;

  const subsections = subsectionType.split('-').map((column, index) => {
    return {
      id: subsectionInfo.id + column + index,
      column,
      components: subsectionInfo.components[index]
    };
  });

  return (
    <div
      className="columns"
      style={{
        border: '1px solid red',
        padding: '5px'
      }}
    >
      {subsections.map(subsection => {
        return (
          <SubSection
            key={`${contexts.global.page.id}-${subsection.id}`}
            id={`${contexts.global.page.id}-${subsection.id}`}
            column={subsection.column}
            components={subsection.components}
            contexts={contexts}
          />
        );
      })}
    </div>
  );
};

export default Section;
