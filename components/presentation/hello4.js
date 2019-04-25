import Hello5 from './hello5';
import Context from '../utils/Context';
import ComponentInfo from '../utils/ComponentInfo';

export default ({ context }) => (
  <div style={{ border: '1px dashed #555' }}>
    <ComponentInfo name="Hello4" />
    <Context context={context} />
    <Hello5 />
    (part of Hello4)
  </div>
);
