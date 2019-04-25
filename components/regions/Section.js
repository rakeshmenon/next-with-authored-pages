import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Grid, Row } from 'react-styled-flexboxgrid';
import SubSection from '../regions/SubSection';
import theme from '../lib/theme';

const Section = ({ subsectionInfo, contexts }) => {
  const subsectionType = subsectionInfo.type;

  const { columns, offsets, bleed } = subsectionType;
  let subsections;
  const grids = { columns, offsets };

  if (!bleed) {
    subsections = subsectionInfo.modules.map((modules, index) => ({
      id: subsectionInfo.id + '-' + modules[0].id + '-' + index,
      position: index,
      grids,
      modules
    }));
  } else {
    subsections = subsectionInfo.modules.map((module, index) => ({
      id: subsectionInfo.id + '-bleed-' + index,
      grids: {
        bleed: true
      },
      modules: module
    }));
  }

  const subsectionMarkup = subsections.map(subsection => {
    const subsectionId = `${contexts.page.global.pageId}-${subsection.id}`;

    return (
      <SubSection
        key={subsectionId}
        id={subsectionId}
        position={subsection.position}
        grids={subsection.grids}
        modules={subsection.modules}
        contexts={contexts}
      />
    );
  });

  return bleed ? (
    <section className="bleed-section">{subsectionMarkup}</section>
  ) : (
    <ThemeProvider theme={theme}>
      <Grid>
        <Row>{subsectionMarkup}</Row>
      </Grid>
    </ThemeProvider>
  );
};

export default Section;
