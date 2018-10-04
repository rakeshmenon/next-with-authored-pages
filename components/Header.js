import { withRouter } from 'next/router';
import { Link } from '../lib/routes';

const Header = ({ ctx, router }) => (
  <div>
    <Link route="/">
      <a style={styles.a} className={router.asPath === '/' ? 'active' : null}>
        Home
      </a>
    </Link>

    <Link route="/about">
      <a
        style={styles.a}
        className={router.asPath === '/about' ? 'active' : null}
      >
        About
      </a>
    </Link>

    <Link route="/section">
      <a
        style={styles.a}
        className={router.asPath === '/section' ? 'active' : null}
      >
        Sections
      </a>
    </Link>
  </div>
);

export default withRouter(Header);

const styles = {
  a: {
    marginRight: 10
  }
};
