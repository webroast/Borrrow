import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from './Component/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
  return (
    <>
      {/* ⚠️ CHANGED: Removed the duplicate "/Borrow" here so Vite and React Router don't clash */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/howitworks' element={<Howitworks />} />
          <Route path='/contactus' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App