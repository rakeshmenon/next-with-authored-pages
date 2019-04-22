import Head from 'next/head';
import layoutRenderer from '../components/lib/renderers/layoutRenderer';

export default class BaseLayoutEngine extends React.Component {
  render() {
    const { layout } = this.props.data;

    return (
      <>
        <Head />
        <main>{layoutRenderer(layout)}</main>
      </>
    );
  }
}
