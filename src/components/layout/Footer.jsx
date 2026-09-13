// Footer.jsx — S: Footer rendering only
const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <span className="footer__logo">🛍️ ShopAI</span>
      <p className="footer__text">
        Built with React · Redux Toolkit · Tailwind CSS · Data from{' '}
        <a
          href="https://dummyjson.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          DummyJSON
        </a>
      </p>
      <p className="footer__sub">Demonstrating SOLID Principles in React</p>
    </div>
  </footer>
)

export default Footer
