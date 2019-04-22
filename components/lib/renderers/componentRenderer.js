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

  return componentList.map(({ name: item, id: moduleId }, index) => {
    if (typeof item === 'string') {
      const componentId = `${subsectionId}-${moduleId}`;
      const Module = ComponentRegistry.modules[item];

      return (
        <Fragment key={componentId}>
          <Module />
        </Fragment>
      );
    } else if (Array.isArray(item)) {
      return (
        <div key={componentId}>
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
