import React from 'react';
import componentRenderer from '../lib/renderers/component';

const SubSection = ({ components, column, contexts, id }) => {
  return (
    <div className={`column is-${column}`} style={styles.subsection}>
      <>
        {componentRenderer({
          componentList: components,
          contexts,
          subsectionId: id
        })}
      </>
    </div>
  );
};

// Temporary :)
const styles = {
  subsection: {
    outline: '1px dotted brown'
  }
};

export default SubSection;
