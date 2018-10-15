import Hello1 from '../presentation/hello1';
import { connect } from 'react-redux';

const Hello1Container = ({ context, data }) => (
  <>
    <Hello1 data={data} />
  </>
);

const mapStateToProps = state => {
  return {
    data: state.hello1data
  };
};

export default connect(mapStateToProps)(Hello1);
