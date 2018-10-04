import React from 'react';
import SubSection from './SubSection';

class Section extends React.Component {
  render() {
    const { subsectionInfo, contexts } = this.props;
    const subsectionType = subsectionInfo.type;

    const subsections = subsectionType.split('-').map((column, index) => {
      return {
        column,
        components: subsectionInfo.components[index]
      };
    });

    return (
      <div className="columns" style={{ border: '1px solid red' }}>
        {subsections.map(subsection => {
          return (
            <SubSection
              key={Math.random()}
              column={subsection.column}
              components={subsection.components}
              contexts={contexts}
            />
          );
        })}
      </div>
    );
  }
}

export default Section;
