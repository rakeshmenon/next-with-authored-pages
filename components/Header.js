import { Link } from '../lib/routes';

const Header = () => (
  <div>
    <Link route="/">
      <a style={styles.a}>Home</a>
    </Link>

    <Link route="/about">
      <a style={styles.a}>About</a>
    </Link>

    <Link route="/section">
      <a style={styles.a}>Sections</a>
    </Link>
  </div>
);

export default Header;

const styles = {
  a: {
    marginRight: 10
  }
};
