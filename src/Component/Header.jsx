import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Header.css'
import logovideo from '../Images/Scene.mp4'
import loginimg from '../Images/login.png'
import HFlogo from '../Images/HeaderFooterMainLogo.png'
// ✅ HeroVideo import REMOVED — video now comes from each page as a prop

// ✅ Header now accepts: videoSrc, heroTitle, heroSubtitle, heroBtnText, heroBtnLink
const Header = ({ videoSrc, heroTitle, heroSubtitle, heroBtnText, heroBtnLink }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>
        {`
          .hero-wrapper {
            position: relative;
            width: 100%;
          }

          .hero-container {
            position: relative;
            width: 100%;
            height: 75vh;
            overflow: hidden;
            background-color: #000;
          }

          .hero-video {
            width: 100%;
            height: 100%;
            filter: grayscale(40%);
            object-fit: cover;
          }

          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1;
          }

          .hero-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ffffff;
            z-index: 2;
            width: 90%;
          }

          .transparent-nav {
            background-color: transparent !important;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 10;
            transition: all 0.3s ease;
            padding-top: 15px;
            padding-bottom: 15px;
          }

          .transparent-nav .header-links {
            color: #ffffff !important;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          }

          .transparent-nav .header-links i {
            color: #ffffff !important;
          }

          .solid-sticky-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1050;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            animation: slideDown 0.3s ease-in-out;
          }

          @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>

      {/* ── Top White Bar ── */}
      <div className="container-fluid navbar navbar-expand-lg navbar-light mb-0 pb-0 bg-white">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand p-0">
            <div style={{ width: '400px', height: '80px', overflow: 'hidden', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <video autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.25)' }}>
                <source src={logovideo} type="video/mp4" />
              </video>
            </div>
          </Link>

          <ul className="navbar-nav me-5">
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
            <li>
              <Link className='header-links' to="/login">
                <img className='login-img' src={loginimg} alt="login" />
              </Link>
            </li>
            <li>
              <a className='custom-tooltip-link' data-tooltip="Admin" href="">
                <i className="fa-solid me-1 ms-4 fa-circle-user"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Hero + Transparent Nav Wrapper ── */}
      <div className="hero-wrapper">

        {/* Transparent nav sits ON TOP of the video */}
        <nav className={`container-fluid Navbar d-flex justify-content-between align-items-center ${isScrolled ? 'solid-sticky-nav bg-light' : 'transparent-nav'}`}>
          <div>
            <Link to="/">
              <img className='Navlogo' style={{ height: '60px', width: 'auto', objectFit: 'contain' }} src={HFlogo} alt="NavLogo" />
            </Link>
          </div>
          <ul className='nav-list mb-0 d-flex align-items-center'>
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
                <span style={{ color: isScrolled ? '#000000' : '#ffffff' }}>WishList </span>
                <i className="fa-solid fa-heart"></i>
              </Link>
            </li>
          </ul>
        </nav>

        {/* ── Hero Video Section ── */}
        <section className="hero-container">
          {/* ✅ key={videoSrc} forces React to reload video when page changes */}
          <video autoPlay loop muted playsInline className="hero-video" key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="hero-overlay"></div>

          {/* ✅ Title, subtitle, button all come from each page as props */}
          <div className="hero-content text-center">
            <h1 className="hero-title">{heroTitle}</h1>
            <p className="hero-subtitle">{heroSubtitle}</p>
            <Link to={heroBtnLink} className="btn text-white custom-hero-btn mt-3">
              {heroBtnText}
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}

export default Header