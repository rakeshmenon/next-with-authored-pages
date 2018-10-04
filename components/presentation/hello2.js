import dynamic from 'next/dynamic';

const DynamicComponent3WithNoSSR = dynamic({
  loader: () => import('./hello3'),
  loading: () => <p>Loading ...</p>,
  ssr: false
});

export default ({ context }) => (
  <div>
    <p onClick={() => alert('Hello 2 component clicked!')}>
      Component:{' '}
      <span>
        <strong>Hello2</strong>
      </span>
    </p>
    {context && <pre style={{ color: 'blue' }}>{JSON.stringify(context)}</pre>}
    <br />
    <div>
      <p style={{ textDecoration: 'underline' }}>
        Dynamic component "Hello3" with NO SSR:
      </p>
      <DynamicComponent3WithNoSSR />
      (part of Hello2)
    </div>
  </div>
);
