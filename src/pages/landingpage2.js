import React, { useEffect } from 'react';
import '../App.css';
import Navbar from '../components2/Navbar/Navbar';
import Hero from '../components2/Hero/Hero';
import Features from '../components2/Features/Features';
import HowItWorks from '../components2/HowItWorks/HowItWorks';
import Threads from '../components2/Threads/Threads';
import ScrollToTopButton from '../components2/ScrollToTopButton/ScrollToTopButton';
import Footer from '../components2/Footer/Footer';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <div className="App">
      <Threads color={[0, 0, 0]} enableMouseInteraction={true} />
      <Navbar />
      <div className="content-wrapper page-with-navbar">
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

