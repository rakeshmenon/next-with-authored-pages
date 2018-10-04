export default ({ context }) => (
  <>
    <p>Hello World 6 (imported dynamically) </p>
    {context && <pre style={{ color: 'blue' }}>{JSON.stringify(context)}</pre>}
  </>
);
