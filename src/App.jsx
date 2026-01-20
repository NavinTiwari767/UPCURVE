import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav.jsx'
import Intro from './Components/Intro.jsx'
import HomeService from './Components/HomeService.jsx'
import Explore from './Components/Explore.jsx'
import Scroll from './Components/Scroll.jsx'
import Footer from './Components/Footer.jsx'
import Contact from './Components/Contact.jsx'
import About from './Components/Pages/About.jsx'
import Services from './Components/Pages/Services.jsx'
const Home = () => (
  <>
    <Intro />
    <HomeService />
    <Explore />
    <Scroll />
  </>
)

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;