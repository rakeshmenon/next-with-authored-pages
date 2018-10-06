import React, { Fragment } from 'react';
import ComponentRegistry from '../componentRegistry';

const componentRenderer = ({
  componentList,
  subsectionId = 'Unknown',
  nested = false,
  level = 0,
  contexts = {}
}) => {
  if (!Array.isArray(componentList)) {
    return null;
  }

  const globalContext = contexts.global || null;

  return componentList.map((item, index) => {
    if (typeof item === 'string') {
      const Component = ComponentRegistry.components[item];
      const componentContext = contexts.components
        ? contexts.components[item]
        : null;
      const extendedComponentContext = Object.assign(
        {},
        globalContext,
        componentContext
      );
      const componentId = `${subsectionId}-${item}-${index}`;

      return (
        <Fragment key={componentId}>
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
        <div key={componentId}>
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
