import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import CCForm from "./scenes/home/CCForm";
import About from "./scenes/home/About";
import Terms from "./scenes/home/Terms";
import ThankYouPage from "./scenes/home/ThankYouPage";
import Login from "./scenes/home/Login";
import SearchResult from "./components/SearchResult";  
import { Toaster } from 'react-hot-toast';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Toaster />
        <Navbar />
        
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
          <Route path="/customer-care" element={<CCForm />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/thank-you-page" element={<ThankYouPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResult/>} />  
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
