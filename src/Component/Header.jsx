import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/Header.css'
import logovideo from '../Images/Scene.mp4'
import loginimg from '../Images/login.png'
import HFlogo from '../Images/HeaderFooterMainLogo.png'

const Header = ({ videoSrc, imageSrc, heroTitle, heroSubtitle, heroBtnText, heroBtnLink, hideHero }) => {
  const [isScrolled, setIsScrolled] = useState(window.scrollY > 90);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── AUTH: Read logged-in user from localStorage ─────────────
  // We read directly here so the Header always shows the latest state,
  // even when the user logs in from a different page.
  const [loggedInUser, setLoggedInUser] = useState(null);

  // useNavigate lets us redirect to /login on logout
  const navigate = useNavigate();

  // Check localStorage every time the Header renders (or on storage change)
  useEffect(() => {
    const readUser = () => {
      const saved = localStorage.getItem('borrowUser');
      if (saved) {
        // Parse the JSON string back into an object { name: "..." }
        setLoggedInUser(JSON.parse(saved));
      } else {
        setLoggedInUser(null);
      }
    };

    readUser(); // Run once immediately

    // Also listen for storage changes (e.g. login/logout from another tab or page)
    window.addEventListener('storage', readUser);
    return () => window.removeEventListener('storage', readUser);
  }, []);

  // ── LOGOUT ───────────────────────────────────────────────────
  // Clears localStorage, resets local state, and refreshes the page
  // so all components (Home wishlist, etc.) reset too.
  const handleLogout = () => {
    localStorage.removeItem('borrowUser');
    setLoggedInUser(null);
    // Force a full page reload so App.jsx re-runs its useEffect
    // and isLoggedIn resets to false everywhere
    window.location.href = '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 90);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`
          /* ── HERO ── */
          .hero-wrapper { position: relative; width: 100%; }
          .hero-container { position: relative; width: 100%; height: 75vh; overflow: hidden; background-color: #000; }
          .hero-video { width: 100%; height: 100%; filter: grayscale(40%); object-fit: cover; }
          .hero-image { width: 100%; height: 100%; object-fit: cover; filter: grayscale(40%); }
          .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); z-index: 1; }
          .hero-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); color: #fff; z-index: 2; width: 90%; }

          /* ── NAV ── */
          .transparent-nav {
            background-color: transparent !important;
            position: absolute; top: 0; left: 0;
            width: 100%; z-index: 10;
            transition: all 0.3s ease;
            padding: 15px;
          }
          .transparent-nav .header-links { color: #fff !important; text-shadow: 1px 1px 3px rgba(0,0,0,0.5); }
          .transparent-nav .header-links i { color: #fff !important; }
          .solid-sticky-nav {
            position: fixed; top: 0; left: 0;
            width: 100%; z-index: 1050;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            animation: slideDown 0.3s ease-in-out;
          }
          @keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }

          /* ── HAMBURGER ── */
          .hamburger-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.6rem;
            cursor: pointer;
            z-index: 20;
          }

          /* ── MOBILE MENU ── */
          .mobile-menu { display: none; }

          /* ── USER WELCOME PILL in topbar ── */
          .user-welcome-pill {
            display: flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, #0d6efd, #0b5ed7);
            color: #fff;
            border-radius: 50px;
            padding: 6px 16px 6px 10px;
            font-size: 0.88rem;
            font-weight: 600;
            box-shadow: 0 2px 10px rgba(13,110,253,0.3);
          }
          .user-welcome-pill .user-avatar {
            width: 30px;
            height: 30px;
            background: rgba(255,255,255,0.25);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            font-weight: 800;
            text-transform: uppercase;
            flex-shrink: 0;
          }
          .logout-btn {
            background: none;
            border: 1px solid rgba(255,255,255,0.5);
            color: #fff;
            border-radius: 50px;
            padding: 3px 12px;
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease;
            margin-left: 4px;
          }
          .logout-btn:hover { background: rgba(255,255,255,0.2); }

          /* ── TOPBAR MOBILE ── */
          @media (max-width: 768px) {
            .topbar-inner {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 6px;
              padding: 10px 15px;
            }
            .topbar-logo-video {
              width: 180px !important;
              height: 50px !important;
            }
            .topbar-nav-items {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 4px;
              margin: 0 !important;
              padding: 0 !important;
            }
            .desktop-nav-links { display: none !important; }
            .hamburger-btn { display: block; }
            .mobile-menu {
              display: flex;
              flex-direction: column;
              position: fixed;
              top: 0; left: 0;
              width: 75%;
              height: 100vh;
              background: #1e293b;
              z-index: 2000;
              padding: 60px 30px 30px 30px;
              gap: 20px;
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }
            .mobile-menu.open { transform: translateX(0); }
            .mobile-menu a {
              color: #ffffff !important;
              font-size: 1.1rem;
              text-decoration: none;
              font-weight: 600;
              border-bottom: 1px solid rgba(255,255,255,0.1);
              padding-bottom: 12px;
            }
            .mobile-menu-close {
              position: absolute;
              top: 15px; right: 15px;
              background: none;
              border: none;
              color: #fff;
              font-size: 1.5rem;
              cursor: pointer;
            }
            .mobile-overlay {
              position: fixed;
              top: 0; left: 0;
              width: 100%; height: 100%;
              background: rgba(0,0,0,0.5);
              z-index: 1999;
            }
            .hero-container { height: 50vh; }
            .hero-title { font-size: 1.5rem !important; }
            .hero-subtitle { font-size: 1rem !important; }
            /* Stack user pill on mobile */
            .user-welcome-pill { font-size: 0.78rem; padding: 4px 10px 4px 8px; }
            .user-welcome-pill .user-avatar { width: 24px; height: 24px; font-size: 0.75rem; }
          }
        `}
      </style>

      {/* ══════════════════════════════════════════════════════
          TOP BAR — shows logo video, contact info, and
          either a Login link OR the user's welcome pill + logout
      ══════════════════════════════════════════════════════ */}
      <div className="container-fluid navbar navbar-light mb-0 pb-0 bg-white">
        <div className="container-fluid topbar-inner d-flex justify-content-between align-items-center">

          {/* Logo video */}
          <Link to="/" className="navbar-brand p-0">
            <div className="topbar-logo-video" style={{ width: '400px', height: '80px', overflow: 'hidden', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
              <video autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.25)' }}>
                <source src={logovideo} type="video/mp4" />
              </video>
            </div>
          </Link>

          <ul className="navbar-nav topbar-nav-items d-flex flex-row align-items-center gap-3">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <i className="fa-solid fa-phone logos1"></i>{' '}
                <i className="fa-brands fa-whatsapp logos"></i>
                <span className="number fw-bold"> +91 8942 00 8221</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <i className="fa-brands fa-instagram logos"></i>
                <span className="insta-id fw-bold"> justborrrowit</span>
              </a>
            </li>

            {/* ── FEATURE: Conditional render based on login state ──
                If logged in → show welcome pill with user's name + Logout button
                If not logged in → show the original login image link              */}
            <li className="d-flex align-items-center">
              {loggedInUser ? (
                // ── LOGGED IN: show "Hi, Name" pill + Logout ──
                <div className="user-welcome-pill">
                  {/* Avatar circle showing first letter of user's name */}
                  <div className="user-avatar">
                    {loggedInUser.name ? loggedInUser.name.charAt(0) : '?'}
                  </div>
                  {/* Welcome message with their name */}
                  <span>Hi, {loggedInUser.name}!</span>
                  {/* Logout button — clears localStorage and reloads */}
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                // ── NOT LOGGED IN: show login image icon ──
                <Link className='header-links' to="/login">
                  <img className='login-img' src={loginimg} alt="Login" />
                </Link>
              )}
            </li>

            <li className="d-flex align-items-center">
              <Link className='custom-tooltip-link' data-tooltip="Admin" to="/admin">
                <i className="fa-solid me-1 ms-4 fa-circle-user"></i>
              </Link>
            </li>
          </ul>

        </div>
      </div>

      {/* ── NAV — always renders on every page ── */}
      <div className="hero-wrapper">

        {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

        {/* Mobile Slide Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>✕</button>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link to="/howitworks" onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link to="/contactus" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <Link to="/reviews" onClick={() => setMenuOpen(false)}>Reviews</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>WishList ❤️</Link>
          {loggedInUser && (
            <button
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: '#f87171', fontWeight: 700, textAlign: 'left', padding: '0 0 12px 0', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
            >
              Logout
            </button>
          )}
        </div>

        {/* Navbar — solid+relative when hideHero, transparent/sticky on home */}
        <nav className={`container-fluid Navbar d-flex justify-content-between align-items-center ${isScrolled ? 'solid-sticky-nav bg-light' : 'transparent-nav'}`}>
          <div>
            <Link to="/">
              <img className='Navlogo' style={{ height: '60px', width: 'auto', objectFit: 'contain' }} src={HFlogo} alt="NavLogo" />
            </Link>
          </div>

          <ul className='nav-list desktop-nav-links mb-0 d-flex align-items-center'>
            <li><Link className='header-links' to="/">Home</Link></li>
            <li><Link className='header-links' to="/about">About Us</Link></li>
            <li><Link className='header-links' to="/categories">Categories</Link></li>
            <li>
              <Link className='header-links custom-tooltip-link' to="/howitworks" data-tooltip="How It Works">
                <i className="fa-solid fa-gear gear-one"></i>
                <i className="fa-solid fa-gear gear-two"></i>
              </Link>
            </li>
            <li><Link className='header-links' to="/contactus">Contact Us</Link></li>
            <li><Link className='header-links' to="/reviews">Reviews</Link></li>
            <li>
              <Link className='header-links me-5' to="/wishlist">
                <span>WishList </span>
                <i className="fa-solid fa-heart" style={{ color: '#e11d48' }}></i>
              </Link>
            </li>
          </ul>

          <button
            className="hamburger-btn"
            style={{ color: '#000' }}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </nav>

        {/* Hero Section — only on home page */}
        {!hideHero && (
          <section className="hero-container">
            {imageSrc ? (
              <img src={imageSrc} alt="Hero" className="hero-image" />
            ) : (
              <video autoPlay loop muted playsInline className="hero-video" key={videoSrc}>
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
            <div className="hero-overlay"></div>
            <div className={`hero-content text-center ${!isTextVisible ? 'hero-content-hidden' : ''}`}>
              <h1 className="hero-title fw-bold">{heroTitle}</h1>
              <h4 className="hero-subtitle fw-bold">{heroSubtitle}</h4>
              {heroBtnText && (
                <Link to={heroBtnLink} className="btn text-white custom-hero-btn mt-3">
                  {heroBtnText}
                </Link>
              )}
            </div>
          </section>
        )}

      </div>
    </>
  )
}

export default Header