import Hello2 from './hello2';
import Context from '../utils/Context';
import ComponentInfo from '../utils/ComponentInfo';

export default ({ context }) => (
  <div style={{ border: '1px dashed #555' }}>
    <ComponentInfo name="Hello1" />
    <Context context={context} />
    <Hello2 />
  </div>
);
