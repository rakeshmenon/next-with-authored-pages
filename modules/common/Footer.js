const Footer = ({ ctx, router }) => (
  <div className="columns">
    <p style={styles.footer} className="column is-12">
      Made with 💗 by XT India
    </p>
  </div>
);

export default Footer;

const styles = {
  footer: {
    background: '#555',
    color: 'white',
    marginTop: '40px'
  }
};
