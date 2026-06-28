import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Component/Header'
import logo from '../Images/HeaderFooterMainLogo.png'

const Register = () => {
  return (
    <>
      <style>{`
        .register-hero-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
        }
        .register-hero-image {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0; left: 0;
          object-fit: cover;
          filter: grayscale(30%);
        }
        .register-hero-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.60);
          z-index: 1;
        }
        .register-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          padding: 60px;
          min-height: 100vh;
          gap: 40px;
        }
        .register-left-text { flex: 1; color: #fff; padding-right: 20px; }
        .register-left-text h1 { font-size: 3rem; font-weight: 800; line-height: 1.2; text-shadow: 2px 2px 8px rgba(0,0,0,0.5); }
        .register-left-text p { font-size: 1.2rem; margin-top: 15px; color: #e2e8f0; line-height: 1.7; }
        .register-left-text .highlight { color: #60a5fa; font-weight: 700; }
        .register-right-form { flex: 1; display: flex; justify-content: center; align-items: center; }
        .register-formcontainer {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 440px;
        }
        .register-specs { height: 45px; width: auto; margin-bottom: 12px; }
        .register-heading { font-size: 1.8rem; color: #fff; margin-bottom: 5px; font-weight: 300; }
        .register-subtext { color: rgba(255,255,255,0.55); font-size: 0.85rem; margin-bottom: 20px; }
        .register-google-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          border-radius: 10px;
          padding: 10px;
          width: 100%;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .register-google-btn:hover { background: rgba(255,255,255,0.2); color: #fff; }
        .register-divider { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
        .register-divider hr { flex: 1; border-color: rgba(255,255,255,0.2); opacity: 1; }
        .register-divider span { color: rgba(255,255,255,0.5); font-size: 0.85rem; white-space: nowrap; }
        .register-label { color: rgba(255,255,255,0.75); font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; display: block; }
        .register-input {
          background: rgba(255,255,255,0.1) !important;
          border: 1px solid rgba(255,255,255,0.25) !important;
          color: #fff !important;
          border-radius: 10px !important;
          margin-bottom: 14px;
          padding: 12px 16px;
        }
        .register-input::placeholder { color: rgba(255,255,255,0.35) !important; }
        .register-input:focus { background: rgba(255,255,255,0.15) !important; box-shadow: 0 0 0 2px rgba(99,102,241,0.4) !important; outline: none; }
        .register-whatsapp-check { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; }
        .register-whatsapp-check input { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.3); width: 16px; height: 16px; }
        .register-whatsapp-check label { color: rgba(255,255,255,0.8); font-size: 0.88rem; margin: 0; }
        .register-whatsapp-check i { color: #25D366; font-size: 1.1rem; }
        .register-submit-btn {
          width: 100%;
          border-radius: 50px;
          padding: 12px;
          font-size: 1rem;
          font-weight: 700;
          background-color: #0d6efd;
          border: none;
          color: #fff;
          transition: background 0.3s ease, transform 0.2s ease;
          margin-bottom: 15px;
        }
        .register-submit-btn:hover { background-color: #0b5ed7; transform: translateY(-2px); }
        .register-login-link { text-align: center; color: rgba(255,255,255,0.6); font-size: 0.88rem; margin: 0; }
        .register-login-link a { color: #93c5fd; text-decoration: none; font-weight: 600; }
        .register-login-link a:hover { text-decoration: underline; }

        /* ── MOBILE FIXES ── */
        @media (max-width: 768px) {
          .register-hero-content {
            flex-direction: column;
            padding: 30px 20px;
            min-height: auto;
          }
          .register-left-text {
            padding-right: 0;
            text-align: center;
          }
          .register-left-text h1 { font-size: 2rem; }
          .register-left-text p { font-size: 1rem; }
          .register-right-form { width: 100%; }
          .register-formcontainer { padding: 25px 20px; }
          .register-divider span { font-size: 0.75rem; }
        }
      `}</style>

      <Header hideHero={true} />

      <div className="register-hero-wrapper">
        <img
          src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=1170&auto=format&fit=crop"
          alt="Register Background"
          className="register-hero-image"
        />
        <div className="register-hero-overlay"></div>

        <div className="register-hero-content">
          <div className="register-left-text">
            <h1>Join the <span className="highlight">Borrrow</span> Community!</h1>
            <p>
              Register today and start borrowing or lending <br />
              items with trusted people around you. <br /><br />
              <span className="highlight">Save money.</span> Reduce waste. <br />
              Live smarter — together.
            </p>
          </div>

          <div className="register-right-form">
            <div className="register-formcontainer">
              <img className="register-specs" src={logo} alt="Logo" />
              <h1 className="register-heading">Register Now</h1>
              <p className="register-subtext">Use social login for a faster experience</p>

              <button className="register-google-btn">
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.8 13.6-4.7l-6.3-5.2C29.4 35.6 26.8 36 24 36c-5.3 0-9.6-2.9-11.3-7H6.3C9.7 35.8 16.3 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.3 4.1-4.3 5.4l6.3 5.2C41.4 34.9 44 29.8 44 24c0-1.3-.1-2.7-.4-4z"/>
                </svg>
                Register with Google
              </button>

              <div className="register-divider">
                <hr />
                <span>or register with phone number</span>
                <hr />
              </div>

              <label className="register-label">Phone Number</label>
              <input type="text" className="form-control register-input" placeholder="+91-00-0000-0000" maxLength="10" />

              <div className="register-whatsapp-check">
                <input className="form-check-input" type="checkbox" id="whatsappUpdates" />
                <label htmlFor="whatsappUpdates">Get Updates on WhatsApp</label>
                <i className="fa-brands fa-whatsapp"></i>
              </div>

              <button className="register-submit-btn">Create Account</button>

              <p className="register-login-link">
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register