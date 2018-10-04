import Hello5 from './hello5';

export default ({ context }) => (
  <>
    <p>
      Component:{' '}
      <span>
        <strong>Hello4</strong>
      </span>
    </p>
    {context && <pre style={{ color: 'blue' }}>{JSON.stringify(context)}</pre>}
    <Hello5 />
  </>
);
