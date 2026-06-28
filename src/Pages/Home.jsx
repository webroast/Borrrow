import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import heroVideo from '../Images/HeroVideo.mp4'

import cardsData from '../Images/CardData.json'
import initialItemsData from '../Images/itemsData.json'

// ── Props from App.jsx ─────────────────────────────────────────
// isLoggedIn: boolean — is the user signed in?
// wishlist: array of saved items
// toggleWishlist: function to add/remove from wishlist
const Home = ({ isLoggedIn, wishlist, toggleWishlist }) => {

  // ── NEWSLETTER STATE ────────────────────────────────────────
  const [emailInput, setEmailInput] = useState('');
  const [showToast, setShowToast] = useState(false);

  // ── FEATURE 2: Card Zoom/Expand State ──────────────────────
  // expandedCard: stores the id of whichever Browse card is currently open
  // null means no card is expanded
  const [expandedCard, setExpandedCard] = useState(null);

  // ── FEATURE 4: Borrow Modal State ──────────────────────────
  // showBorrowModal: true/false — controls if the date/time form is visible
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  // borrowItem: the item the user clicked "Borrow Now" on
  const [borrowItem, setBorrowItem] = useState(null);
  // borrowDate / borrowTime: what the user picks in the form
  const [borrowDate, setBorrowDate] = useState('');
  const [borrowTime, setBorrowTime] = useState('');
  // showSuccess: true after user confirms their booking
  const [showSuccess, setShowSuccess] = useState(false);

  // useNavigate lets us redirect the user programmatically (e.g. to /login)
  const navigate = useNavigate();

  // ── Handler: Toggle card expand/collapse ───────────────────
  const handleCardClick = (cardId) => {
    // If this card is already open, close it. Otherwise open it.
    setExpandedCard(prev => (prev === cardId ? null : cardId));
  };

  // ── Handler: "Borrow Now" button clicked ───────────────────
  const handleBorrowClick = (item) => {
    if (!isLoggedIn) {
      // FEATURE 3: Not logged in → show alert with login/register message
      alert('Please login or register first!\n\nYou can also Register with Google for quick access.');
      navigate('/login'); // Redirect them to login page
      return;
    }
    // Logged in → show the date/time modal
    setBorrowItem(item);
    setShowBorrowModal(true);
    setShowSuccess(false); // Reset success message from any previous booking
    setBorrowDate('');
    setBorrowTime('');
  };

  // ── Handler: "Heart" icon clicked on a card ────────────────
  const handleHeartClick = (e, item) => {
    e.stopPropagation(); // Prevent the card from toggling when heart is clicked

    if (!isLoggedIn) {
      // FEATURE 3: Not logged in → show alert
      alert('Please login or register first!\n\nYou can also Register with Google for quick access.');
      navigate('/login');
      return;
    }
    // FEATURE 5: Logged in → toggle the item in/out of wishlist
    toggleWishlist(item);
  };

  // ── Handler: Confirm borrow booking ────────────────────────
  const handleBorrowConfirm = () => {
    // Simple validation: both fields must be filled
    if (!borrowDate || !borrowTime) {
      alert('Please select both a Date and a Time!');
      return;
    }
    // FEATURE 4: Show success message and a simulated email alert
    setShowSuccess(true);
    alert(`✅ Confirmation email sent!\n\nYour booking is confirmed for:\n📅 Date: ${borrowDate}\n⏰ Time: ${borrowTime}\n\nCheck your inbox for details.`);
  };

  // ── Handler: Close the borrow modal ────────────────────────
  const closeBorrowModal = () => {
    setShowBorrowModal(false);
    setBorrowItem(null);
    setShowSuccess(false);
  };

  // ── Newsletter submit ───────────────────────────────────────
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim() !== '') {
      setShowToast(true);
      setEmailInput('');
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  // Count how many items are in the wishlist (for the badge counter)
  const wishlistCount = wishlist.length;

  return (
    <>
      <style>
        {`
          .card-section, .trending-section {
            padding: 80px 0;
            background-color: #f8f9fa; 
          }
          .category-header {
            margin-bottom: 40px;
          }
          .section-main-title {
            color: #212529;
            font-size: 2.25rem;
            letter-spacing: 0.5px;
          }
          .category-underline, .steps-underline, .trending-underline, .trust-underline, .news-underline {
            width: 60px;
            height: 4px;
            background-color: #0d6efd;
            margin: 12px auto 0 auto;
            border-radius: 2px;
          }
          .steps-subtitle {
            color: #6c757d;
            font-size: 1.1rem;
            margin-top: 15px;
          }
          /* ── Browse Category Card styles ── */
          .custom-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            position: relative;
            cursor: pointer;
            /* Height is dynamic: collapsed = 250px, expanded = auto */
            transition: all 0.4s ease;
          }
          .custom-card.collapsed {
            height: 250px;
          }
          .custom-card.expanded {
            height: auto;
            min-height: 350px;
          }
          .card-img-wrapper {
            width: 100%;
            height: 250px; /* Image always stays 250px tall */
            overflow: hidden;
            position: relative;
          }
          .card-img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
          }
          .custom-card:hover .card-img-wrapper img {
            transform: scale(1.05);
          }
          .card-text-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4); 
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.3s ease, background-color 0.3s ease;
            z-index: 2;
            padding: 15px;
          }
          .card-overlay-title {
            color: #ffffff;
            font-size: 1.25rem;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
            margin: 0;
          }
          .custom-card:hover .card-text-overlay {
            opacity: 0;
            background-color: transparent;
          }
          /* ── Expanded panel that shows below the image ── */
          .card-expanded-panel {
            background: #ffffff;
            padding: 16px;
            border-top: 2px solid #0d6efd;
          }
          .card-expanded-panel .detail-row {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #555;
            font-size: 0.85rem;
            margin-bottom: 6px;
          }
          .card-expanded-panel .detail-row i {
            color: #0d6efd;
            width: 16px;
          }
          .borrow-btn {
            border-radius: 50px;
            font-weight: 600;
            padding: 8px 20px;
            font-size: 0.9rem;
          }
          .heart-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 6px 10px;
            border-radius: 50%;
            transition: transform 0.2s ease;
          }
          .heart-btn:hover { transform: scale(1.2); }
          /* ── How It Works ── */
          .how-it-works-section {
            padding: 80px 0;
            background-color: #ffffff; 
          }
          .step-box {
            padding: 30px 20px;
            text-align: center;
            transition: transform 0.3s ease;
          }
          .step-box:hover { transform: translateY(-5px); }
          .step-icon-wrapper {
            width: 80px;
            height: 80px;
            background-color: rgba(13, 110, 253, 0.1);
            color: #0d6efd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
            font-size: 2rem;
            position: relative;
          }
          .step-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 28px;
            height: 28px;
            background-color: #0d6efd;
            color: #ffffff;
            border-radius: 50%;
            font-size: 0.9rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          }
          .step-title { font-size: 1.4rem; color: #212529; margin-bottom: 12px; }
          .step-desc { color: #6c757d; font-size: 0.95rem; line-height: 1.6; }
          /* ── Trending Items ── */
          .trending-item-card {
            border: none;
            border-radius: 12px;
            background-color: #ffffff;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .trending-item-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }
          .wishlist-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            background-color: #ffffff;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            z-index: 10;
            transition: transform 0.2s ease;
            cursor: pointer;
          }
          .wishlist-btn:hover { transform: scale(1.1); }
          /* ── Wishlist badge counter in top corner ── */
          .wishlist-badge-container {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 999;
          }
          .wishlist-badge-btn {
            background-color: #0d6efd;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 10px 18px;
            font-weight: 700;
            box-shadow: 0 4px 15px rgba(13,110,253,0.4);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
            cursor: pointer;
            text-decoration: none;
          }
          .wishlist-badge-btn:hover { background-color: #0b5ed7; color: white; }
          /* ── Trust section ── */
          .trust-section { padding: 80px 0; background-color: #ffffff; }
          .trust-card {
            background-color: #ffffff;
            border: 1px solid #eef2f5;
            border-radius: 12px;
            padding: 35px 25px;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          }
          .trust-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            border-color: rgba(13, 110, 253, 0.2);
          }
          .trust-icon-box { font-size: 2.25rem; color: #0d6efd; margin-bottom: 20px; }
          .trust-card-title { font-size: 1.25rem; color: #212529; margin-bottom: 12px; }
          .trust-card-desc { color: #6c757d; font-size: 0.92rem; line-height: 1.6; margin: 0; }
          /* ── Lender CTA ── */
          .lender-cta-section { padding: 80px 0 40px 0; background-color: #f8f9fa; }
          .lender-banner-box {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border-radius: 20px;
            padding: 60px 40px;
            color: #ffffff;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }
          .lender-heading { font-size: 2.5rem; letter-spacing: 0.5px; }
          .lender-description { color: #cbd5e1; font-size: 1.1rem; max-width: 700px; margin: 0 auto 30px auto; line-height: 1.7; }
          .lender-signup-btn {
            background-color: #0d6efd;
            color: #ffffff;
            font-weight: 600;
            padding: 14px 40px;
            font-size: 1.05rem;
            border-radius: 50px;
            transition: background-color 0.3s ease, transform 0.2s ease;
            text-decoration: none;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
          }
          .lender-signup-btn:hover { background-color: #0b5ed7; color: #ffffff; transform: translateY(-2px); }
          /* ── Newsletter ── */
          .newsletter-section { padding: 60px 0 80px 0; background-color: #f8f9fa; }
          .newsletter-input-group {
            max-width: 550px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 6px;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          }
          .newsletter-input { border: none; padding: 12px 25px; font-size: 1rem; border-radius: 50px; outline: none; width: 70%; }
          .newsletter-submit-btn {
            background-color: #212529;
            color: #ffffff;
            border: none;
            border-radius: 50px;
            padding: 12px 30px;
            font-weight: 600;
            transition: background-color 0.3s ease;
            width: 30%;
          }
          .newsletter-submit-btn:hover { background-color: #000000; }
          /* ── Toast ── */
          .custom-success-toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #198754;
            color: #ffffff;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 600;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: popUpFade 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            align-items: center;
            gap: 10px;
          }
          @keyframes popUpFade {
            from { bottom: 0px; opacity: 0; transform: translate(-50%, 20px); }
            to { bottom: 30px; opacity: 1; transform: translate(-50%, 0); }
          }
          /* ── Borrow Modal overlay ── */
          .borrow-modal-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .borrow-modal-box {
            background: #ffffff;
            border-radius: 20px;
            padding: 35px;
            width: 90%;
            max-width: 420px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          .borrow-modal-box h5 { font-weight: 700; margin-bottom: 20px; color: #1e293b; }
          .borrow-modal-box label { font-size: 0.9rem; font-weight: 600; color: #475569; margin-bottom: 5px; display: block; }
          .borrow-modal-box input {
            width: 100%;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px 14px;
            font-size: 0.95rem;
            margin-bottom: 16px;
          }
          .borrow-modal-box input:focus { outline: 2px solid #0d6efd; border-color: transparent; }
          .success-msg {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
            color: #166534;
            font-weight: 600;
          }
        `}
      </style>

      {/* ── Header ── */}
      <Header videoSrc={heroVideo} />

      {/* ── Newsletter success toast ── */}
      {showToast && (
        <div className="custom-success-toast">
          <i className="fa-solid fa-circle-check"></i>
          <span>Successfully subscribed! Check your inbox for updates.</span>
        </div>
      )}

      {/* ── FEATURE 5: Floating Wishlist counter badge ─────────────────────
           Shows bottom-right corner when user has items saved.
           Clicking it takes them to the /wishlist page.
      ── */}
      {wishlistCount > 0 && (
        <div className="wishlist-badge-container">
          <Link to="/wishlist" className="wishlist-badge-btn">
            <i className="fa-solid fa-heart"></i>
            {/* The badge shows the number of items saved */}
            <span>{wishlistCount} Saved</span>
          </Link>
        </div>
      )}

      {/* ── FEATURE 4: Borrow Date/Time Modal ────────────────────────────
           Shown when a logged-in user clicks "Borrow Now" on any card.
      ── */}
      {showBorrowModal && (
        <div className="borrow-modal-overlay" onClick={closeBorrowModal}>
          {/* stopPropagation prevents click-outside from closing when clicking inside */}
          <div className="borrow-modal-box" onClick={e => e.stopPropagation()}>

            {!showSuccess ? (
              /* ── Step 1: Pick a date and time ── */
              <>
                <h5>
                  <i className="fa-solid fa-calendar-check me-2 text-primary"></i>
                  Book: {borrowItem?.name}
                </h5>

                <label htmlFor="borrowDate">📅 Select Date</label>
                <input
                  id="borrowDate"
                  type="date"
                  value={borrowDate}
                  onChange={e => setBorrowDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} /* Can't pick past dates */
                />

                <label htmlFor="borrowTime">⏰ Select Time</label>
                <input
                  id="borrowTime"
                  type="time"
                  value={borrowTime}
                  onChange={e => setBorrowTime(e.target.value)}
                />

                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-primary rounded-pill flex-grow-1 fw-bold"
                    onClick={handleBorrowConfirm}
                  >
                    Confirm Booking
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={closeBorrowModal}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              /* ── Step 2: Show success after confirming ── */
              <>
                <div className="success-msg mb-4">
                  <div style={{ fontSize: '2.5rem' }}>✅</div>
                  <h5 className="mt-2 mb-1">Booking Confirmed!</h5>
                  <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                    Confirmation email sent for <strong>{borrowDate}</strong> at <strong>{borrowTime}</strong>
                  </p>
                </div>
                <button
                  className="btn btn-outline-primary rounded-pill w-100"
                  onClick={closeBorrowModal}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          BROWSE BY CATEGORY SECTION
          FEATURE 2: Cards expand on click to show extra details,
                     Borrow Now button, and Heart icon.
      ════════════════════════════════════════════════════════════ */}
      <section className="card-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center category-header">
              <h2 className="section-main-title fw-bold m-0">Browse By Category</h2>
              <div className="category-underline"></div>
            </div>
          </div>
          <div className="row g-4">
            {cardsData.map((card) => {
              // Check if THIS specific card is currently expanded
              const isExpanded = expandedCard === card.id;

              return (
                <div key={card.id} className="col-12 col-md-6 col-lg-3">
                  {/* The card toggles open/close when clicked */}
                  <div
                    className={`card custom-card ${isExpanded ? 'expanded' : 'collapsed'}`}
                    onClick={() => handleCardClick(card.id)}
                  >
                    {/* ── Card image with title overlay ── */}
                    <div className="card-img-wrapper">
                      <img src={card.image} alt={card.name} />
                      <div className="card-text-overlay text-center">
                        <h5 className="card-overlay-title fw-bold">{card.name}</h5>
                      </div>
                    </div>

                    {/* ── FEATURE 2: Expanded panel — only visible when card is open ── */}
                    {isExpanded && (
                      <div
                        className="card-expanded-panel"
                        onClick={e => e.stopPropagation()} /* Don't close card when clicking inside panel */
                      >
                        <h6 className="fw-bold mb-2">{card.name} Rentals</h6>

                        {/* Extra details shown inside expanded card */}
                        <div className="detail-row">
                          <i className="fa-solid fa-tag"></i>
                          <span>Starting from ₹299/day</span>
                        </div>
                        <div className="detail-row">
                          <i className="fa-solid fa-star text-warning"></i>
                          <span>Highly rated by community</span>
                        </div>
                        <div className="detail-row">
                          <i className="fa-solid fa-clock"></i>
                          <span>Available for hourly & daily rental</span>
                        </div>

                        {/* Action buttons: Borrow Now + Heart icon */}
                        <div className="d-flex align-items-center gap-2 mt-3">
                          <button
                            className="btn btn-primary borrow-btn flex-grow-1"
                            onClick={() => handleBorrowClick(card)}
                          >
                            Borrow Now
                          </button>

                          {/* Heart button — red if in wishlist, outline if not */}
                          <button
                            className="heart-btn"
                            title="Save to Wishlist"
                            onClick={(e) => handleHeartClick(e, card)}
                          >
                            <i
                              className={`fa-heart fa-lg ${
                                // Check if this card is in the wishlist array
                                wishlist.find(w => w.id === card.id)
                                  ? 'fa-solid text-danger'    // Saved = solid red heart
                                  : 'fa-regular text-secondary' // Not saved = outline grey heart
                              }`}
                            ></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="section-main-title fw-bold m-0">How It Works</h2>
              <div className="steps-underline"></div>
              <p className="steps-subtitle fw-semibold">Rates for Hourly And For the day will diffrent</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="step-box">
                <div className="step-icon-wrapper">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <div className="step-badge">1</div>
                </div>
                <h4 className="step-title fw-bold">Browse & Pick dates</h4>
                <p className="step-desc">Search through local listings, find the item you need, and choose your required rental start and end dates.</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="step-box">
                <div className="step-icon-wrapper">
                  <i className="fa-solid fa-calendar-check"></i>
                  <div className="step-badge">2</div>
                </div>
                <h4 className="step-title fw-bold">Book & confirm</h4>
                <p className="step-desc">Connect directly with verified lenders, select your collection method, and securely confirm your order setup.</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="step-box">
                <div className="step-icon-wrapper">
                  <i className="fa-solid fa-face-smile"></i>
                  <div className="step-badge">3</div>
                </div>
                <h4 className="step-title fw-bold">Pickup and enjoy</h4>
                <p className="step-desc">Collect the gear safely, complete your project or event successfully, and return the item on schedule.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TRENDING RENTALS SECTION
          FEATURE 5: Heart button on each item adds/removes from wishlist.
                     FEATURE 3: Prompts login if not authenticated.
      ════════════════════════════════════════════════════════════ */}
      <section className="trending-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="section-main-title fw-bold m-0">Trending Rentals</h2>
              <div className="trending-underline"></div>
            </div>
          </div>
          <div className="row g-4">
            {initialItemsData.map((item) => {
              // Check if this item is saved in the wishlist (to show correct heart icon)
              const isSaved = wishlist.find(w => w.id === item.id);

              return (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 trending-item-card position-relative">

                    {/* Heart button — clicking adds/removes from wishlist */}
                    <button
                      className="wishlist-btn"
                      onClick={(e) => handleHeartClick(e, item)}
                      title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <i className={`fa-heart ${isSaved ? 'fa-solid text-danger' : 'fa-regular text-secondary'}`}></i>
                    </button>

                    <img
                      src={item.image}
                      alt={item.itemName}
                      style={{ height: '220px', objectFit: 'cover', width: '100%' }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title fw-bold text-dark mb-2">{item.itemName}</h5>
                        <div className="mb-3 text-warning">
                          <i className="fa-solid fa-star me-1"></i>
                          <span className="text-muted small fw-bold">({item.starRating})</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="fs-5 fw-bold text-dark">
                          ₹{item.perDayPrice} <small className="text-muted fw-normal">/ day</small>
                        </span>
                        {/* "Rent Now" also checks login */}
                        <button
                          className="btn btn-primary rounded-pill px-4 btn-sm fw-semibold"
                          onClick={() => handleBorrowClick({ ...item, name: item.itemName })}
                        >
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="trust-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="section-main-title fw-bold m-0">Why Choose Us</h2>
              <div className="trust-underline"></div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="trust-card text-center h-100">
                <div className="trust-icon-box"><i className="fa-solid fa-wallet"></i></div>
                <h4 className="trust-card-title fw-bold">Save Money vs Buying</h4>
                <p className="trust-card-desc">Access premium gear for a fraction of its total retail cost. Rent only for the exact period you need it.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="trust-card text-center h-100">
                <div className="trust-icon-box"><i className="fa-solid fa-user-shield"></i></div>
                <h4 className="trust-card-title fw-bold">Verified Listings</h4>
                <p className="trust-card-desc">Shop with complete peace of mind. Every product profile and local vendor is thoroughly vetted before going live.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="trust-card text-center h-100">
                <div className="trust-icon-box"><i className="fa-solid fa-shield-halved"></i></div>
                <h4 className="trust-card-title fw-bold">Safe and Secure</h4>
                <p className="trust-card-desc">All platform transactions and user interactions are protected by advanced top-tier standard encryption layers.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="trust-card text-center h-100">
                <div className="trust-icon-box"><i className="fa-solid fa-truck-ramp-box"></i></div>
                <h4 className="trust-card-title fw-bold">Easy Pickup & Return</h4>
                <p className="trust-card-desc">Coordinate seamless asset exchange directly through rapid handovers or flexible scheduled returns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lender CTA ── */}
      <section className="lender-cta-section">
        <div className="container text-center">
          <div className="lender-banner-box">
            <h2 className="lender-heading fw-bold mb-3">Make Money Sitting At Home</h2>
            <p className="lender-description">
              Have extra tools, cameras, party supplies, or gaming rigs lying around? Put your underutilized gear to work! List your items securely on our marketplace, set your custom pricing schedules, and watch your items generate consistent passive income today.
            </p>
            <Link to="/login" className="lender-signup-btn">Start Lending Now</Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="newsletter-section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2 className="section-main-title fw-bold m-0">Stay Updated</h2>
              <div className="news-underline"></div>
              <p className="steps-subtitle m-0 mt-3">Get notified about new listings near you.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleNewsletterSubmit} className="newsletter-input-group d-flex align-items-center justify-content-between">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email address..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-submit-btn">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <Footer />
    </>
  )
}

export default Home