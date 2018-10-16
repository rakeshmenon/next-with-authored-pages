import { connect } from 'react-redux';
import Hello1 from '../presentation/hello1';

const Hello1Container = ({ context, data }) => (
  <>
    <Hello1 context={context} data={data} />
  </>
);

const mapStateToProps = state => {
  const pageId = state.global.pageData.response.pageId;
  return {
    data: state[pageId] ? state[pageId].hello1Container : {}
  };
};

const ConnectedHello1 = connect(mapStateToProps)(Hello1Container);

export default ConnectedHello1;
