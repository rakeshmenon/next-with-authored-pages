export default ({ context }) => (
  <div>
    <p onClick={() => alert('Hello 3 component clicked!')}>
      Component:{' '}
      <span>
        <strong>Hello3</strong>
      </span>
    </p>
    {context && <pre style={{ color: 'blue' }}>{JSON.stringify(context)}</pre>}
  </div>
);
