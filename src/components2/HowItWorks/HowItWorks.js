import React from 'react';
import './HowItWorks.css';
import { FaComments, FaDatabase, FaAddressCard } from 'react-icons/fa';

const steps = [
  {
    icon: <FaComments />,
    title: 'AI Chat Interface',
    description: 'Employees ask questions through a simple, intuitive chat interface available on any device.',
  },
  {
    icon: <FaDatabase />,
    title: 'Real-Time HR Data',
    description: 'VipraCo securely accesses your HR systems to retrieve accurate, up-to-date information.',
  },
  {
    icon: <FaAddressCard />,
    title: 'Personalized Response',
    description: 'Employees receive accurate, personalized answers tailored to their specific situation and role.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <h2>How VipraCo Works</h2>
      <p className="subtitle">A simple three-step process that delivers powerful results for your organization.</p>
      <div className="glass-container">
        <div className="steps-container">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="step-card">
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
