import React from 'react';
import componentRenderer from '../lib/renderers/componentRenderer';
import { Col } from 'react-styled-flexboxgrid';

const SubSection = ({ modules, grids, contexts, id, position }) => {
  const renderer = componentRenderer({
    componentList: modules,
    subsectionId: id,
    contexts
  });

  let modulesToRender = null;

  if (grids.bleed) {
    modulesToRender = (
      <Col fluid center middle>
        {renderer}
      </Col>
    );
  } else {
    const { columns, offsets } = grids;

    const cols = columns[position] || columns[0] || {};
    const { lg: lgOffset, md: mdOffset, sm: smOffset, xs: xsOffset } =
      offsets[position] || offsets[0] || {};

    const columnProps = {
      ...cols,
      lgOffset,
      mdOffset,
      smOffset,
      xsOffset
    };

    modulesToRender = <Col {...columnProps}>{renderer}</Col>;
  }

  return modulesToRender;
};

export default SubSection;
