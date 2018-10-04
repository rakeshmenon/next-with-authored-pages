import React from 'react';
import arrayRenderer from '../../components/lib/renderers/array';

class SubSection extends React.Component {
  render() {
    const { components, column, contexts } = this.props;
    return (
      <div
        className={`column is-${column}`}
        style={{
          outline: '1px dotted brown'
        }}
      >
        <>{arrayRenderer({ componentList: components, contexts })}</>
      </div>
    );
  }
}

export default SubSection;