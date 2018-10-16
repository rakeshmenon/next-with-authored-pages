import Header from '../modules/common/Header';
import Footer from '../modules/common/Footer';
import componentRenderer from '../modules/lib/renderers/component';
import layoutRenderer from '../modules/lib/renderers/layout';

export default class BaseLayoutEngine extends React.Component {
  render() {
    const { type, layout } = this.props.pageData;
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
