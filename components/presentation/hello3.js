import Context from '../utils/Context';
import ComponentInfo from '../utils/ComponentInfo';

export default ({ context }) => (
  <div style={{ border: '1px dashed #555' }}>
    <ComponentInfo
      name="Hello3"
      onClick={() =>
        alert(
          `Hello 3 component clicked!\n\n${
            context ? `Context: ${JSON.stringify(context, null, 2)}` : ''
          }`
        )
      }
    />
    <Context context={context} />
  </div>
);
