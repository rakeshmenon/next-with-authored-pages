import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import componentRenderer from '../components/lib/renderers/component';
import layoutRenderer from '../components/lib/renderers/layout';

export default class BaseLayoutEngine extends React.Component {
  render() {
    const { type, layout } = this.props.data;
    return (
      <>
        <Header />
        <div style={{ marginTop: '50px' }}>
          {type === 'sections' ? (
            <>{layoutRenderer(layout)}</>
          ) : (
            <>{componentRenderer({ componentList: layout })}</>
          )}
        </div>
        <Footer />
      </>
    );
  }
}
