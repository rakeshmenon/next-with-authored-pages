import Hello5 from './hello5';

export default ({ context }) => (
  <>
    <p>Hello World 4 (imported dynamically) </p>
    {context && <pre style={{ color: 'blue' }}>{JSON.stringify(context)}</pre>}
    <Hello5 />
  </>
);
