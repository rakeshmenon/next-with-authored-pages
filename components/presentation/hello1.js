import Hello2 from './hello2';

export default ({ context }) => (
  <>
    <p>
      Component:{' '}
      <span>
        <strong>Hello1</strong>
      </span>
    </p>
    {context && <pre style={{ color: 'blue' }}>{JSON.stringify(context)}</pre>}
    <Hello2 />
  </>
);
