import Header from '../components/Header';
import arrayRenderer from '../components/lib/renderers/array';
import subsectionRenderer from '../components/lib/renderers/subsection';

export default class BaseLayoutEngine extends React.Component {
  render() {
    const { type, layout } = this.props.data;
    return (
      <div>
        <Header />
        <div style={{ marginTop: '50px' }}>
          {type === 'array' ? (
            <>{arrayRenderer(layout)}</>
          ) : (
            <>{subsectionRenderer(layout)}</>
          )}
        </div>
      </div>
    );
  }
}
