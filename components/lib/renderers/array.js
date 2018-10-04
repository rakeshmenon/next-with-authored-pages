import React, { Fragment } from 'react';
import ComponentRegistry from '../componentRegistry';

const arrayRenderer = ({
  componentList,
  nested = false,
  level = 0,
  contexts = {}
}) => {
  if (!Array.isArray(componentList)) {
    return null;
  }
  return componentList.map(item => {
    if (typeof item === 'string') {
      const Component = ComponentRegistry.components[item];
      return (
        <Fragment key={Math.random()}>
          {!nested && (
            <h4>
              <strong>First Level Component --></strong>
            </h4>
          )}
          <br />
          <Component context={contexts[item]} />
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
          {arrayRenderer({
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

export default arrayRenderer;
