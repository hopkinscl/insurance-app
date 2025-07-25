import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import QuoteForm from './components/QuoteForm';
import Products from './components/Products';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <QuoteForm />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
