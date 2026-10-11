export default function Nav() {
  return (
    <nav>
      <div className="logo-mark">
        <img src="https://res.cloudinary.com/wjb6fjzs/image/upload/v1791715356/WhatsApp_Image_2026-10-11_at_4.09.28_PM.jpg" alt="HK Builder Logo" className="logo-img" />
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
