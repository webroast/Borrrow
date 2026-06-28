import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// ✅ Import useState and useEffect so we can manage login state here
import { useState, useEffect } from 'react'

import Home from './Pages/Home'
import About from './Pages/About'
import Categories from './Pages/Categories'
import Howitworks from './Pages/Howitworks'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Reviews from './Pages/Reviews'
import Wishlist from './Pages/Wishlist'
import Register from './Pages/Register'
import NotFound from './Pages/NotFound'

function App() {

  // ── AUTH STATE ──────────────────────────────────────────────
  // isLoggedIn: tracks if a user is currently signed in (true/false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // wishlist: array of item objects the user has hearted
  const [wishlist, setWishlist] = useState([]);

  // ── FEATURE 1: Restore login from localStorage on page load ──
  // useEffect with [] runs ONE TIME when the app first loads.
  // It checks if we previously saved a logged-in user to localStorage.
  useEffect(() => {
    // localStorage.getItem returns the saved value, or null if nothing saved
    const savedUser = localStorage.getItem('borrowUser');

    // If a user was found in storage, mark them as logged in automatically
    if (savedUser) {
      setIsLoggedIn(true);
    }
  }, []); // The [] means "run only once on first load"

  // ── LOGIN HANDLER ────────────────────────────────────────────
  // Called from the Login page when user submits the form.
  // Saves user info to localStorage so they stay logged in after refresh.
  const handleLogin = (userName) => {
    // Save a simple object to localStorage (must be a string, so we use JSON.stringify)
    localStorage.setItem('borrowUser', JSON.stringify({ name: userName }));
    setIsLoggedIn(true); // Update the state so all pages know they're logged in
  };

  // ── LOGOUT HANDLER ───────────────────────────────────────────
  // Clears localStorage and resets state back to logged out.
  const handleLogout = () => {
    localStorage.removeItem('borrowUser');
    setIsLoggedIn(false);
    setWishlist([]); // Clear the wishlist when logging out
  };

  // ── WISHLIST TOGGLE ──────────────────────────────────────────
  // Called when user clicks the Heart icon on any item.
  // If item is already in wishlist → remove it. If not → add it.
  const toggleWishlist = (item) => {
    setWishlist(prev => {
      // Check if this item is already saved (by comparing id)
      const alreadySaved = prev.find(w => w.id === item.id);
      if (alreadySaved) {
        // Remove it: keep all items EXCEPT this one
        return prev.filter(w => w.id !== item.id);
      } else {
        // Add it: spread existing items and append the new one
        return [...prev, item];
      }
    });
  };

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          {/* Pass props down to each page that needs them */}
          <Route path='/' element={
            <Home
              isLoggedIn={isLoggedIn}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          } />
          <Route path='/about' element={<About />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/howitworks' element={<Howitworks />} />
          <Route path='/contactus' element={<Contact />} />
          <Route path='/login' element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/wishlist' element={
            <Wishlist
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              isLoggedIn={isLoggedIn}
            />
          } />
          <Route path='/register' element={<Register onLogin={handleLogin} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App