import Hello2 from './hello2';
import Context from '../utils/Context';
import ComponentInfo from '../utils/ComponentInfo';

export default ({ context, data }) => (
  <>
    <ComponentInfo name="Hello1" />
    {JSON.stringify(data, null, 2)}
    <Context context={context} />
    <Hello2 />
  </>
);
