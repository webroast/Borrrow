import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Header.css'
import logovideo from '../Images/Scene.mp4'
import loginimg from '../Images/login.png'
import HFlogo from '../Images/HeaderFooterMainLogo.png'

const Header = ({ videoSrc, imageSrc, heroTitle, heroSubtitle, heroBtnText, heroBtnLink, hideHero }) => {
  const [isScrolled, setIsScrolled] = useState(window.scrollY > 90);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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
          .mobile-menu {
            display: none;
          }

          /* ── TOPBAR MOBILE ── */
          @media (max-width: 768px) {

            /* Top bar */
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

            /* Hide desktop nav links */
            .desktop-nav-links {
              display: none !important;
            }

            /* Show hamburger */
            .hamburger-btn {
              display: block;
            }

            /* Mobile menu open */
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
            .mobile-menu.open {
              transform: translateX(0);
            }
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

            /* Hero mobile */
            .hero-container { height: 50vh; }
            .hero-title { font-size: 1.5rem !important; }
            .hero-subtitle { font-size: 1rem !important; }
          }
        `}
      </style>

      {/* ── TOP BAR ── */}
      <div className="container-fluid navbar navbar-light mb-0 pb-0 bg-white">
        <div className="container-fluid topbar-inner d-flex justify-content-between align-items-center">

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
            <li className="d-flex align-items-center">
              <Link className='header-links' to="/login">
                <img className='login-img' src={loginimg} alt="Login" />
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <Link className='custom-tooltip-link' data-tooltip="Admin" to="/admin">
                <i className="fa-solid me-1 ms-4 fa-circle-user"></i>
              </Link>
            </li>
          </ul>

        </div>
      </div>

      {/* ── HERO + NAV WRAPPER ── */}
      {!hideHero && (
        <div className="hero-wrapper">

          {/* Mobile Overlay */}
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
          </div>

          {/* Navbar */}
          <nav className={`container-fluid Navbar d-flex justify-content-between align-items-center ${isScrolled ? 'solid-sticky-nav bg-light' : 'transparent-nav'}`}>
            <div>
              <Link to="/">
                <img className='Navlogo' style={{ height: '60px', width: 'auto', objectFit: 'contain' }} src={HFlogo} alt="NavLogo" />
              </Link>
            </div>

            {/* Desktop Links */}
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
                  <span style={{ color: isScrolled ? '#000' : '#fff' }}>WishList </span>
                  <i className="fa-solid fa-heart"></i>
                </Link>
              </li>
            </ul>

            {/* Hamburger */}
            <button
              className="hamburger-btn"
              style={{ color: isScrolled ? '#000' : '#fff' }}
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </nav>

          {/* Hero Section */}
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

        </div>
      )}
    </>
  )
}

export default Header