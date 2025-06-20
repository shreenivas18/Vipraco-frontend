import React from 'react';
import './ImageInput.css';

const ImageInput = () => {
  return (
    <div className="image-input-container">
      <div className="chat-ui-mockup">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
        <div className="dot dot-4"></div>
        <div className="chat-item-1">
          <div className="chat-icon"></div>
          <div className="chat-line"></div>
        </div>
        <div className="chat-item-2">
          <div className="chat-icon"></div>
          <div className="chat-line"></div>
        </div>
        <div className="chat-item-3">
          <div className="chat-line long"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
