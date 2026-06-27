import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Footer.css'


const Footer = () => {
  return (
    <footer className="footer-bg pt-5 pb-4 position-relative">
      <div className="container">
        <div className="row">
          
          {/* Column 1: Brand & About */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
            <div className="brand-text mb-3 d-flex align-items-center">
              <i className="bi bi-browser-chrome fs-4 me-2"></i> PetConnect
            </div>
            <p className="text-muted pe-4" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Dedicated to finding every shelter animal a loving companion home through technological ease and sincere compassion.
            </p>
            <div className="mt-3">
              <a href="#/" className="footer-link me-3 fs-5"><i className="bi bi-globe"></i></a>
              <a href="#/" className="footer-link me-3 fs-5"><i className="bi bi-envelope"></i></a>
              <a href="#/" className="footer-link fs-5"><i className="bi bi-telephone"></i></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase footer-heading mb-4">Quick Links</h6>
            <p className="mb-2"><a href="#/" className="footer-link">Browse Adoptable Dogs</a></p>
            <p className="mb-2"><a href="#/" className="footer-link">Browse Adoptable Cats</a></p>
            <p className="mb-2"><a href="#/" className="footer-link">Browse Adoptable Rabbits</a></p>
            <p className="mb-2"><a href="#/" className="footer-link">Volunteer Opportunities</a></p>
          </div>

          {/* Column 3: Support */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase footer-heading mb-4">Support</h6>
            <p className="mb-2"><a href="#/" className="footer-link">About Us & Mission</a></p>
            <p className="mb-2"><a href="#/" className="footer-link">Contact Support</a></p>
            <p className="mb-2"><a href="#/" className="footer-link">Donation Center</a></p>
            <p className="mb-2"><a href="#/" className="footer-link">Frequently Asked Questions</a></p>
          </div>

          {/* Column 4: Legal Policy */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase footer-heading mb-4">Legal Policy</h6>
            <p className="mb-2"><a href="#/" className="footer-link">Privacy Policy</a></p>
            <p className="mb-2"><a href="#/" className="footer-link">Terms of Service</a></p>
            <p className="mb-2"><a href="#/" className="footer-link">Adoption Agreement Rules</a></p>
            <p className="mb-2"><a href="#/" className="footer-link">Cookies Settings</a></p>
          </div>
        </div>

        {/* Horizontal Divider */}
        <hr className="mb-4" style={{ borderColor: '#cbd5e1' }} />

        {/* Bottom Copyright & Small Links */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="bottom-text mb-0">
              © 2026 PetConnect. Finding companion homes, changing animal lives.
            </p>
          </div>
          <div className="col-md-5 col-lg-4 text-md-end mt-3 mt-md-0 d-flex justify-content-md-end gap-4">
            <a href="#/" className="bottom-text text-decoration-none">Accessibility</a>
            <a href="#/" className="bottom-text text-decoration-none">Adoption Safety Tips</a>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Chat) */}
      <a href="#/" className="chat-btn">
        <i className="bi bi-chat-square fa-regular fa-comment"></i>
      </a>
    </footer>
    
  )
}

export default Footer