import Hello4 from './hello4';

export default () => (
  <>
    <p onClick={() => alert('Hello 3 component clicked!')}>
      Hello World 3 (imported dynamically){' '}
    </p>
    <Hello4 />
  </>
);
