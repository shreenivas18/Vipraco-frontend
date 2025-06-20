import React from 'react';
import './BotSection.css';
import botImage from '../../assets/bot-img.png';

const BotSection = () => {
  return (
    <div className="bot-section-container">
      <div className="bot-image-wrapper">
        <img src={botImage} alt="VipraCo AI Bot" className="bot-section-img" />
      </div>
    </div>
  );
};

export default BotSection;