import React from 'react';
import componentRenderer from '../lib/renderers/component';

const SubSection = ({ components, column, contexts, id }) => {
  return (
    <div
      className={`column is-${column}`}
      style={{
        outline: '1px dotted brown'
      }}
    >
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

export default SubSection;
