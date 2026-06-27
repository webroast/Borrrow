import React from 'react'
import Header from '../Component/Header'
import aboutVideo from '../Images/AboutusVideo.mp4'  // ✅ About page video

const About = () => {
  return (
    <>
      {/* ✅ About page passes its own different video to Header */}
      <Header
        videoSrc={aboutVideo}
        heroTitle="About Borrrow"
        heroSubtitle="Building a Smarter Sharing Community."
        heroBtnText="Learn More"
        heroBtnLink="/howitworks"
      />

      {/* Your About Us page content goes here */}
    </>
  )
}

export default About