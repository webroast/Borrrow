import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Component/Header'
import logo from '../Images/HeaderFooterMainLogo.png'

// ── Props from App.jsx ──────────────────────────────────────────
// onLogin: function to call when user successfully logs in
// isLoggedIn: boolean — redirect away if already logged in
const Login = ({ onLogin, isLoggedIn }) => {

  // Local state for the form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // useNavigate lets us redirect the user after login
  const navigate = useNavigate();

  // ── Handle form submit ─────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from reloading (default form behaviour)
    setErrorMsg('');    // Clear any previous error

    // Simple validation: both fields must be filled
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please fill in both Email and Password.');
      return;
    }

    // FEATURE 1 + 3: Call the login handler from App.jsx
    // This saves the user to localStorage and updates isLoggedIn to true.
    // We use the part before "@" as the user's display name.
    const userName = email.split('@')[0];
    onLogin(userName);

    // Redirect to home page after successful login
    navigate('/');
  };

  // ── Google "login" simulation ─────────────────────────────
  const handleGoogleLogin = () => {
    // Simulate a Google login with a placeholder name
    onLogin('GoogleUser');
    navigate('/');
  };

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
        .login-left-text { flex: 1; color: #fff; padding-right: 40px; }
        .login-left-text h1 { font-size: 3rem; font-weight: 800; line-height: 1.2; text-shadow: 2px 2px 8px rgba(0,0,0,0.5); }
        .login-left-text p { font-size: 1.2rem; margin-top: 15px; color: #e2e8f0; }
        .login-right-form { flex: 1; display: flex; justify-content: center; align-items: center; }
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
        .google-btn {
          border-radius: 50px;
          padding: 10px 25px;
          font-size: 0.95rem;
          background-color: #fff;
          color: #333;
          border: none;
          font-weight: 600;
          transition: background 0.3s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          width: 100%;
          cursor: pointer;
          margin-top: 12px;
        }
        .google-btn:hover { background-color: #f1f5f9; transform: translateY(-2px); }
        .form-register-label a { color: #93c5fd; text-decoration: none; }
        .form-register-label a:hover { text-decoration: underline; }
        .login-error {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.4);
          color: #fca5a5;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.9rem;
          margin-bottom: 14px;
        }
        @media (max-width: 768px) {
          .login-hero-content { flex-direction: column; padding: 30px 20px; min-height: auto; }
          .login-left-text { padding-right: 0; text-align: center; }
          .login-left-text h1 { font-size: 2rem; }
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

              {/* Show error message if validation fails */}
              {errorMsg && <div className="login-error">{errorMsg}</div>}

              {/* FEATURE 3: Form calls handleSubmit which saves to localStorage */}
              <form className="text-start loginform" onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                  <input
                    type="email"
                    className="form-control login-input"
                    id="floatingEmail"
                    placeholder="Enter Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingEmail">Enter Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control login-input"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
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
                  <button type="submit" className="btn btn-primary px-5 mt-3 fw-bold login-submit">
                    Login
                  </button>
                </div>
              </form>

              {/* ── Simulated Google Register / Login option ── */}
              <div className="mt-3 text-center">
                <p className="text-secondary small mb-1">— or —</p>
                <button className="google-btn" onClick={handleGoogleLogin}>
                  {/* Google "G" icon using a simple SVG inline */}
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.2 0 5.9 1.1 8.1 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.4 13.9 17.7 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4c4-3.8 6.2-9.3 6.2-16.1z"/>
                    <path fill="#FBBC05" d="M10.7 28.5c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7-5.4C2.3 16.7 1 20.2 1 24s1.3 7.3 3.7 10.5l7-5.4-.1-.6z"/>
                    <path fill="#34A853" d="M24 47c5.6 0 10.3-1.8 13.7-5l-7-5.4c-1.8 1.2-4.1 2-6.7 2-6.3 0-11.6-4.3-13.3-10.1l-7 5.4C7 41.3 14.8 47 24 47z"/>
                  </svg>
                  Register / Login with Google
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login