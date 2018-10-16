const ComponentInfo = ({ name, onClick }) => {
  return (
    <p>
      Component:{' '}
      <span>
        <strong>{name}</strong>
      </span>
      {onClick && (
        <button className="button is-primary" onClick={onClick}>
          Click to test
        </button>
      )}
    </p>
  );
};

export default ComponentInfo;
