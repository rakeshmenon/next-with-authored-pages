import Hello2 from './hello2';

export default ({ context }) => (
  <>
    <p>
      Hello World 1 (imported dynamically)
      {context && (
        <pre style={{ color: 'blue' }}>{JSON.stringify(context)}</pre>
      )}
    </p>
    <Hello2 />
  </>
);
