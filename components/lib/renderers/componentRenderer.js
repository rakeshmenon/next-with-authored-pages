import React, { Fragment } from 'react';
import ComponentRegistry from '../componentRegistry';

const componentRenderer = ({
  componentList,
  subsectionId = 'Unknown',
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
          <Module context={contexts.modules[moduleId]} />
        </Fragment>
      );
    } else {
      return null;
    }
  });
};

export default componentRenderer;
