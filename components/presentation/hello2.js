import dynamic from 'next/dynamic';

const DynamicComponent3WithNoSSR = dynamic({
  loader: () => import('./hello3'),
  loading: () => <p>Loading ...</p>,
  ssr: false
});

export default () => (
  <div>
    <p onClick={() => alert('Hello 2 component clicked!')}>
      Hello World 2 (imported dynamically){' '}
    </p>
    <DynamicComponent3WithNoSSR />
  </div>
);
