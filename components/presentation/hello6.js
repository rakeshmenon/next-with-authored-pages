import Context from '../utils/Context';
import ComponentInfo from '../utils/ComponentInfo';

export default ({ context }) => (
  <div style={{ border: '1px dashed #555' }}>
    <ComponentInfo name="Hello6" />
    <Context context={context} />
  </div>
);
