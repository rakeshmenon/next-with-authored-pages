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
    <div className="columns" style={styles.section}>
      {subsections.map(subsection => {
        const subsectionId = `${contexts.global.page.id}-${subsection.id}`;
        return (
          <SubSection
            key={subsectionId}
            id={subsectionId}
            column={subsection.column}
            components={subsection.components}
            contexts={contexts}
          />
        );
      })}
    </div>
  );
};

// Temporary :)
const styles = {
  section: {
    border: '1px solid red',
    padding: '5px'
  }
};

export default Section;
