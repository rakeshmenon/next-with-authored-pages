import Head from 'next/head';
import Header from '../components/common/Header';
import layoutRenderer from '../components/lib/renderers/layoutRenderer';

export default class BaseLayoutEngine extends React.Component {
  render() {
    const { layout } = this.props.data;

    return (
      <>
        <Head />
        <Header />
        <main>{layoutRenderer(layout)}</main>
      </>
    );
  }
}
