import Hello4 from './hello4';

export default ({ context }) => (
  <>
    <p onClick={() => alert('Hello 3 component clicked!')}>
      Hello World 3 (imported dynamically){' '}
      {context && (
        <pre style={{ color: 'blue' }}>{JSON.stringify(context)}</pre>
      )}
    </p>
    <Hello4 />
  </>
);
