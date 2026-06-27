import React from 'react'
import Header from '../Component/Header'
import howitWorks from '../Images/HowitworksVideo.mp4'

const Howitworks = () => {
  return (
    <>
    {/* ✅ About page passes its own different video to Header */}
      <Header
        videoSrc={howitWorks}
        heroTitle="About Borrrow"
        heroSubtitle="Building a Smarter Sharing Community."
        heroBtnText="Learn More"
        heroBtnLink="/howitworks"
      />

      {/* Your About Us page content goes here */}
    </>
  )
}

export default Howitworks