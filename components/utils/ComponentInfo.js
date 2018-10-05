const ComponentInfo = ({ name, onClick }) => {
  return (
    <p>
      Component:{' '}
      <span>
        <strong>{name}</strong>
      </span>
      {onClick && (
        <a className="buttom is-primary" onClick={onClick}>
          Click to test
        </a>
      )}
    </p>
  );
};

export default ComponentInfo;
