import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { Link } from 'react-router-dom'
// 👇 Optional: If you ever want a custom background photo for the header, import it here
import wishlistBgImg from '../Images/Categories.png' 

const Wishlist = () => {
  // Mock data to display a couple of sample wishlisted items out of the box
  // Set this to an empty array [] later if you want to test the "Empty Wishlist" screen
  const wishlistedItems = [
    {
      id: 1,
      title: "DeWalt Cordless Drill Kit",
      category: "Power Tools",
      price: "₹499/day",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "4-Person Waterproof Camping Tent",
      category: "Camping Gear",
      price: "₹799/day",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=600"
    }
  ];

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
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.65);
          z-index: 1;
        }

        .wishlist-hero-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
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
          line-height: 1.2;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
        }

        .wishlist-hero-content p {
          font-size: 1.2rem;
          margin-top: 15px;
          color: #e2e8f0;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
        }

        .wishlist-body-section {
          background-color: #0f172a;
          padding: 80px 0;
          min-height: 50vh;
        }

        /* Glassmorphic card styling matching categories page */
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

        /* Heart remove button overlay */
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

        /* Clean empty state styling */
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
      `}</style>

      {/* Top White Bar + Navbar only */}
      <Header hideHero={true} />

      {/* Hero Header Section */}
      <div className="wishlist-hero-wrapper">
        <img 
          src="https://images.unsplash.com/photo-1605364850025-1c59327db3b1?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Your Wishlist Background" 
          className="wishlist-hero-image" 
        />
        <div className="wishlist-hero-overlay"></div>
        <div className="wishlist-hero-content pt-5">
          <h1 className='mt-3'>Your Wishlist</h1>
          <p>Keep track of the premium gear and tools <br />you want to borrow for upcoming projects.</p>
        </div>
      </div>

      {/* Wishlist Main Display Grid */}
      <div className="wishlist-body-section text-white">
        <div className="container">
          
          {wishlistedItems.length > 0 ? (
            <div className="row g-4">
              {wishlistedItems.map((item) => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                  <div className="card h-100 wishlist-item-card text-white">
                    
                    {/* Item Image Container */}
                    <div className="wishlist-img-container">
                      <img src={item.image} alt={item.title} className="wishlist-item-img" />
                      {/* Heart Icon to Remove */}
                      <button className="remove-wishlist-btn" title="Remove from Wishlist">
                        <i className="fa-solid fa-heart"></i>
                      </button>
                    </div>

                    {/* Card Body Details */}
                    <div className="card-body d-flex flex-column justify-content-between p-4">
                      <div>
                        <span className="text-primary small fw-semibold text-uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h5 className="card-title fw-bold mt-1 mb-2 text-white">{item.title}</h5>
                        <h6 className="fw-bold text-success mb-4">{item.price}</h6>
                      </div>
                      
                      <Link to="/categories" className="btn btn-outline-primary w-100 rent-now-btn py-2">
                        Check Availability
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Conditional Fallback: Rendered if wishlistedItems array is empty */
            <div className="empty-wishlist-box text-center py-5">
              <div className="empty-wishlist-icon">
                <i className="fa-regular fa-heart"></i>
              </div>
              <h3 className="fw-bold mb-2">Your Wishlist is Empty</h3>
              <p className="text-secondary small mb-4">
                Explore our structural equipment marketplace and save items you like for later usage.
              </p>
              <Link to="/categories" className="btn btn-primary px-4 rounded-pill fw-semibold py-2">
                Browse Categories
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