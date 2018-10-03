import { Link } from '../lib/routes';

export default () => (
  <div>
    <Link route="/">
      <a style={styles.a}>Home</a>
    </Link>

    <Link route="/about">
      <a style={styles.a}>About</a>
    </Link>
  </div>
);

const styles = {
  a: {
    marginRight: 10
  }
};
