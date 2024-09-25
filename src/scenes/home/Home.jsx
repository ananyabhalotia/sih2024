// Home.js
import React from 'react';
import MainCarousel from './MainCarousel';
import ShoppingList from './ShoppingList';
import Subscribe from './Subscribe';
import Chatbot from './Chatbot'; // Import Chatbot component

const Home = () => {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
      <Chatbot /> {/* Add Chatbot component */}
    </div>
  );
};

export default Home;
