import React from 'react';
import arrayRenderer from '../../components/lib/renderers/array';

class SubSection extends React.Component {
  render() {
    const { components, column, contexts } = this.props;
    return (
      <div
        className={`column is-${column}`}
        style={{ border: '1px solid blue' }}
      >
        <>{arrayRenderer({ componentList: components, contexts })}</>
      </div>
    );
  }
}

export default SubSection;
