import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav.jsx'
import Intro from './Components/Intro.jsx'
import HomeService from './Components/HomeService.jsx'
import Explore from './Components/Explore.jsx'
import Scroll from './Components/Scroll.jsx'
import Footer from './Components/Footer.jsx'
import Contact from './Components/Contact.jsx'

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Intro />
              <HomeService />
              <Explore />
              <Scroll />
            </>
          } 
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;