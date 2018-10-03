import React, { Fragment } from 'react';
import Header from '../components/Header';
import ComponentRegistry from '../components/componentRegistry';

export default class Index extends React.Component {
  renderComponents = (compArr, nested, level = 0) => {
    return compArr.map(item => {
      if (typeof item === 'string') {
        const Component = ComponentRegistry[item];
        return (
          <Fragment key={Math.random()}>
            {!nested && <h4>Direct</h4>}
            <span>Component:</span>{' '}
            <span
              style={{
                textTransform: 'uppercase',
                textDecoration: 'underline',
                color: 'red'
              }}
            >
              <strong>{item}</strong>
            </span>
            <Component />
            <br />
            <br />
          </Fragment>
        );
      } else {
        return (
          <div
            style={{ marginLeft: `${(level + 1) * 30}px` }}
            key={Math.random()}
          >
            <h4>
              Nested -- L{level + 1} -- {item.join(' // ')}
            </h4>
            {this.renderComponents(item, true, level + 1)}
          </div>
        );
      }
    });
  };

  render() {
    const compArr = this.props.data.layout;
    return (
      <div>
        <Header />
        <>{this.renderComponents(compArr)}</>
      </div>
    );
  }
}
