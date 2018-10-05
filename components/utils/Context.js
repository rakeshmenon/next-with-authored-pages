const Context = ({ context }) => {
  return (
    <>
      {context && (
        <pre style={{ color: 'blue' }}>{JSON.stringify(context, null, 2)}</pre>
      )}
    </>
  );
};

export default Context;
