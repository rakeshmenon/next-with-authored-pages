import Context from '../utils/Context';
import ComponentInfo from '../utils/ComponentInfo';

export default ({ context }) => (
  <div>
    <ComponentInfo
      name="Hello3"
      onClick={() => alert('Hello 3 component clicked!')}
    />
    <Context context={context} />
  </div>
);
