import React from 'react';
import '../App.css';
import Navbar from '../components2/Navbar/Navbar';
import Hero from '../components2/Hero/Hero';
import Features from '../components2/Features/Features';
import HowItWorks from '../components2/HowItWorks/HowItWorks';
import Threads from '../components2/Threads/Threads';
import ScrollToTopButton from '../components2/ScrollToTopButton/ScrollToTopButton';
import Footer from '../components2/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Threads color={[0, 0, 0]} enableMouseInteraction={true} />
      <div className="content-wrapper">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <ScrollToTopButton />
        <Footer />
      </div>
    </div>
  );
}

export default App;

