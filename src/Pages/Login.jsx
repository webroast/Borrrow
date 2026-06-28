import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Component/Header'
import logo from '../Images/HeaderFooterMainLogo.png'

const Login = () => {
  return (
    <>
      <style>{`
        .login-hero-wrapper {
          position: relative;
          width: 100%;
          min-height: 90vh;
          overflow: hidden;
        }
        .login-hero-image {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0; left: 0;
          object-fit: cover;
          filter: grayscale(40%);
        }
        .login-hero-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.55);
          z-index: 1;
        }
        .login-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          padding: 60px;
          min-height: 90vh;
          gap: 40px;
        }
        .login-left-text {
          flex: 1;
          color: #fff;
          padding-right: 40px;
        }
        .login-left-text h1 {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
        }
        .login-left-text p {
          font-size: 1.2rem;
          margin-top: 15px;
          color: #e2e8f0;
        }
        .login-right-form {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .formcontainer {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(2px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 420px;
        }
        .Borrrow-logo { height: 80px; width: auto; margin-bottom: 15px; }
        .loginHeading { font-size: 1.8rem; color: #fff; margin-bottom: 25px; }
        .login-input {
          background: rgba(255,255,255,0.1) !important;
          border: 1px solid rgba(255,255,255,0.25) !important;
          color: #fff !important;
          border-radius: 10px !important;
        }
        .login-input:focus {
          background: rgba(255,255,255,0.15) !important;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.4) !important;
        }
        .form-floating label { color: rgba(255,255,255,0.6) !important; }
        .login-checkbox { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.3); }
        .login-submit {
          border-radius: 50px;
          padding: 10px 40px;
          font-size: 1rem;
          background-color: #0d6efd;
          border: none;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .login-submit:hover { background-color: #0b5ed7; transform: translateY(-2px); }
        .form-register-label a { color: #93c5fd; text-decoration: none; }
        .form-register-label a:hover { text-decoration: underline; }

        /* ── MOBILE FIXES ── */
        @media (max-width: 768px) {
          .login-hero-content {
            flex-direction: column;
            padding: 30px 20px;
            min-height: auto;
          }
          .login-left-text {
            padding-right: 0;
            text-align: center;
          }
          .login-left-text h1 { font-size: 2rem; }
          .login-left-text p { font-size: 1rem; }
          .login-right-form { width: 100%; }
          .formcontainer { padding: 25px 20px; }
        }
      `}</style>

      <Header imageSrc={null} videoSrc={null} hideHero={true} />

      <div className="login-hero-wrapper">
        <img
          src="https://images.unsplash.com/photo-1776062356815-d5e8312792a8?q=80&w=1939&auto=format&fit=crop"
          alt="Login Background"
          className="login-hero-image"
        />
        <div className="login-hero-overlay"></div>

        <div className="login-hero-content">
          <div className="login-left-text">
            <h1>Welcome Back!</h1>
            <p>Login to borrow or lend items<br />in your community.</p>
          </div>

          <div className="login-right-form">
            <div className="formcontainer bg-transparent">
              <div className="logo1">
                <img className="Borrrow-logo" src={logo} alt="Logo" />
              </div>
              <h1 className="loginHeading text-center fw-bold">Login Form</h1>

              <form className="text-start loginform">
                <div className="form-floating mb-2">
                  <input type="email" className="form-control login-input" id="floatingEmail" placeholder="Enter Email" required />
                  <label htmlFor="floatingEmail">Enter Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control login-input" id="floatingPassword" placeholder="Password" required />
                  <label htmlFor="floatingPassword">Enter Password</label>
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input login-checkbox" type="checkbox" id="rememberMe" />
                  <label className="text-light form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <label className="text-light fs-small form-register-label fw-semibold text-center d-block">
                  If You Do Not Have Account <Link to="/register">Register Here</Link>
                </label>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-5 mt-3 fw-bold login-submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login