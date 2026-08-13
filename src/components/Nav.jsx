export default function Nav() {
  return (
    <nav>
      <div className="logo-mark">
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M4 34V16L14 8V34" stroke="currentColor" strokeWidth="1.6" />
          <path d="M14 34V4L26 12V34" stroke="currentColor" strokeWidth="1.6" />
          <path d="M26 34V16L36 22V34" stroke="currentColor" strokeWidth="1.6" />
          <path d="M2 34H38" stroke="#C9A227" strokeWidth="1.6" />
        </svg>
        <div className="logo-text">
          HK Builder
          <span>Crafting Communities</span>
        </div>
      </div>
      <div className="links">
        <a href="#services">Services</a>
        <a href="#project">SP Galaxy</a>
        <a href="#plans">Floor Plans</a>
        <a href="#location">Location</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
