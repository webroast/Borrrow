import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'

const Categories = () => {
  return (
    <>
      <style>{`
        .categories-hero-wrapper {
          position: relative;
          width: 100%;
          height: 90vh;
          overflow: hidden;
        }

        .categories-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(40%);
        }

        .categories-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.55);
          z-index: 1;
        }

        .categories-hero-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          display: flex;
          align-items: center;
          padding: 0 60px;
        }

        /* LEFT SIDE - Title */
        .categories-left-text {
          flex: 1;
          color: #ffffff;
          padding-right: 40px;
        }

        .categories-left-text h1 {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
        }

        .categories-left-text p {
          font-size: 1.2rem;
          margin-top: 15px;
          color: #e2e8f0;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
        }

        /* RIGHT SIDE - Empty for your content */
        .categories-right-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      {/* Top White Bar + Navbar only — no hero from Header */}
      <Header hideHero={true} />

      <div className="categories-hero-wrapper">

        {/* ✅ Add your image URL here */}
        <img
          src="YOUR_IMAGE_URL_HERE"
          alt="Categories Background"
          className="categories-hero-image"
        />

        {/* Dark Overlay */}
        <div className="categories-hero-overlay"></div>

        {/* Left Text + Right Content */}
        <div className="categories-hero-content">

          {/* LEFT — Title */}
          <div className="categories-left-text">
            <h1>Explore Our Categories</h1>
            <p>Find anything you need — <br />borrow it, use it, return it.</p>
          </div>

          {/* RIGHT — Add your content here */}
          <div className="categories-right-content">
            {/* Your content goes here */}
          </div>

        </div>
      </div>

      {/* Your Categories page sections go below here */}

      <Footer />

    </>
  )
}

export default Categories