import React from 'react'
import Header from '../Component/Header'
import heroVideo from '../Images/HeroVideo.mp4'

const Home = () => {
  return (
    <>
      <Header
        videoSrc={heroVideo}
        heroTitle="Borrow Smarter, Live Better"
        heroSubtitle="Rent anything you need from people around you."
        heroBtnText="Explore Categories"
        heroBtnLink="/categories"
      />

      {/* Your Home page content goes here */}
    </>
  )
}

export default Home