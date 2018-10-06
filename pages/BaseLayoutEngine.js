import Header from '../components/Header';
import componentRenderer from '../components/lib/renderers/component';
import layoutRenderer from '../components/lib/renderers/layout';

export default class BaseLayoutEngine extends React.Component {
  render() {
    const { type, layout } = this.props.data;
    return (
      <div>
        <Header />
        <div style={{ marginTop: '50px' }}>
          {type === 'sections' ? (
            <>{layoutRenderer(layout)}</>
          ) : (
            <>{componentRenderer({ componentList: layout })}</>
          )}
        </div>
      </div>
    );
  }
}
