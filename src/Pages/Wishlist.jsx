import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { Link } from 'react-router-dom'

// ── Props from App.jsx ──────────────────────────────────────────
// wishlist: array of items the user has saved (via Heart icon)
// toggleWishlist: function to remove an item when they click Heart again
// isLoggedIn: boolean to check if user is authenticated
const Wishlist = ({ wishlist = [], toggleWishlist, isLoggedIn }) => {

  return (
    <>
      <style>{`
        .wishlist-hero-wrapper {
          position: relative;
          width: 100%;
          height: 40vh;
          overflow: hidden;
          background-color: #0f172a;
        }
        .wishlist-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(25%);
        }
        .wishlist-hero-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.65);
          z-index: 1;
        }
        .wishlist-hero-content {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #ffffff;
          padding: 0 20px;
        }
        .wishlist-hero-content h1 {
          font-size: 3rem;
          font-weight: 800;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
        }
        .wishlist-hero-content p {
          font-size: 1.2rem;
          margin-top: 15px;
          color: #e2e8f0;
        }
        /* Badge showing count */
        .wishlist-count-badge {
          background: #0d6efd;
          color: white;
          border-radius: 50px;
          padding: 4px 14px;
          font-size: 0.9rem;
          font-weight: 700;
          margin-left: 10px;
        }
        .wishlist-body-section {
          background-color: #0f172a;
          padding: 80px 0;
          min-height: 50vh;
        }
        .wishlist-item-card {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 20px !important;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .wishlist-item-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35) !important;
        }
        .wishlist-img-container {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
        }
        .wishlist-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .wishlist-item-card:hover .wishlist-item-img {
          transform: scale(1.06);
        }
        .remove-wishlist-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(15, 23, 42, 0.7);
          border: none;
          color: #ef4444;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          z-index: 3;
        }
        .remove-wishlist-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: scale(1.1);
          color: #f87171;
        }
        .rent-now-btn {
          border-radius: 50px !important;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .empty-wishlist-box {
          max-width: 500px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .empty-wishlist-icon {
          font-size: 4.5rem;
          color: rgba(255, 255, 255, 0.15);
          margin-bottom: 20px;
        }
        /* Not logged in message */
        .not-logged-in-box {
          max-width: 480px;
          margin: 0 auto;
          padding: 40px 20px;
          text-align: center;
        }
      `}</style>

      <Header hideHero={true} />

      {/* ── Hero banner ── */}
      <div className="wishlist-hero-wrapper">
        <img
          src="https://images.unsplash.com/photo-1605364850025-1c59327db3b1?q=80&w=1320&auto=format&fit=crop"
          alt="Your Wishlist Background"
          className="wishlist-hero-image"
        />
        <div className="wishlist-hero-overlay"></div>
        <div className="wishlist-hero-content pt-5">
          <h1 className='mt-3'>
            Your Wishlist
            {/* Show item count badge if there are saved items */}
            {wishlist.length > 0 && (
              <span className="wishlist-count-badge">{wishlist.length}</span>
            )}
          </h1>
          <p>Keep track of the premium gear and tools <br />you want to borrow for upcoming projects.</p>
        </div>
      </div>

      {/* ── Wishlist body ── */}
      <div className="wishlist-body-section text-white">
        <div className="container">

          {/* ── Case 1: User is NOT logged in ── */}
          {!isLoggedIn ? (
            <div className="not-logged-in-box">
              <div className="empty-wishlist-icon">
                <i className="fa-solid fa-lock"></i>
              </div>
              <h3 className="fw-bold mb-2">Login to See Your Wishlist</h3>
              <p className="text-secondary small mb-4">
                You need to be logged in to save items to your wishlist. Login or register to get started!
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/login" className="btn btn-primary px-4 rounded-pill fw-semibold py-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline-light px-4 rounded-pill fw-semibold py-2">
                  Register with Google
                </Link>
              </div>
            </div>

          ) : wishlist.length > 0 ? (

            /* ── Case 2: Logged in + has saved items ── */
            <div className="row g-4">
              {wishlist.map((item) => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                  <div className="card h-100 wishlist-item-card text-white">

                    <div className="wishlist-img-container">
                      <img
                        src={item.image}
                        alt={item.name || item.itemName}
                        className="wishlist-item-img"
                      />
                      {/* Clicking the red heart REMOVES the item from wishlist */}
                      <button
                        className="remove-wishlist-btn"
                        title="Remove from Wishlist"
                        onClick={() => toggleWishlist(item)}
                      >
                        <i className="fa-solid fa-heart"></i>
                      </button>
                    </div>

                    <div className="card-body d-flex flex-column justify-content-between p-4">
                      <div>
                        <h5 className="card-title fw-bold mt-1 mb-2 text-white">
                          {/* Support both card names (name) and item names (itemName) */}
                          {item.name || item.itemName}
                        </h5>
                        {/* Show price if it's a Trending item (has perDayPrice) */}
                        {item.perDayPrice && (
                          <h6 className="fw-bold text-success mb-2">₹{item.perDayPrice}/day</h6>
                        )}
                      </div>
                      <Link to="/" className="btn btn-outline-primary w-100 rent-now-btn py-2">
                        Check Availability
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          ) : (

            /* ── Case 3: Logged in + wishlist is empty ── */
            <div className="empty-wishlist-box text-center py-5">
              <div className="empty-wishlist-icon">
                <i className="fa-regular fa-heart"></i>
              </div>
              <h3 className="fw-bold mb-2">There is nothing in your Wishlist</h3>
              <p className="text-secondary small mb-4">
                Browse our categories and tap the ❤️ Heart icon on any item to save it here for later.
              </p>
              <Link to="/" className="btn btn-primary px-4 rounded-pill fw-semibold py-2">
                Browse Items
              </Link>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Wishlist