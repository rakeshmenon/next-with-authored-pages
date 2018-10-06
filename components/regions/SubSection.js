import React from 'react';
import componentRenderer from '../lib/renderers/component';

class SubSection extends React.Component {
  render() {
    const { components, column, contexts, id } = this.props;
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
  }
}

export default SubSection;
