import React, { Fragment } from 'react';
import ComponentRegistry from '../componentRegistry';

const componentRenderer = ({
  componentList,
  nested = false,
  level = 0,
  contexts = {}
}) => {
  if (!Array.isArray(componentList)) {
    return null;
  }

  const pageContext = contexts.page ? contexts.page : null;

  return componentList.map(item => {
    if (typeof item === 'string') {
      const Component = ComponentRegistry.components[item];
      const componentContext = contexts.components
        ? contexts.components[item]
        : null;
      const extendedComponentContext = Object.assign(
        {},
        pageContext,
        componentContext
      );

      return (
        <Fragment key={Math.random()}>
          {!nested && (
            <h4>
              <strong>
                SubSection Component &rarr;{' '}
                <span style={{ color: 'green' }}>{item.toUpperCase()}</span>
              </strong>
            </h4>
          )}
          <br />
          <Component context={extendedComponentContext} />
          <br />
          <hr />
        </Fragment>
      );
    } else if (Array.isArray(item)) {
      return (
        <div key={Math.random()}>
          <h5>
            <strong>
              Nested -- L{level + 1} -- {item.join(' // ')}
            </strong>
          </h5>
          {componentRenderer({
            componentList: item,
            nested: true,
            level: level + 1
          })}
        </div>
      );
    } else {
      return null;
    }
  });
};

export default componentRenderer;
