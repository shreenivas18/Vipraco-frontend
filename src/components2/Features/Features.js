import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import './Features.css';
import FeatureCard from './FeatureCard';
import { FaCode, FaFileContract, FaQuestionCircle, FaEye, FaClock, FaUsers } from 'react-icons/fa';

const featuresData = [
  {
    icon: <FaCode />,
    title: 'Smart Integration',
    description: 'Seamlessly connects with your existing HR systems, databases, and knowledge bases for accurate, up-to-date information.',
  },
  {
    icon: <FaFileContract />,
    title: 'Policy Compliance',
    description: 'Ensures all responses comply with company policies, legal requirements, and industry regulations.',
  },
  {
    icon: <FaQuestionCircle />,
    title: 'Analytics & Insights',
    description: 'Gain valuable insights into common employee questions, concerns, and trends to proactively improve HR services.',
  },
  {
    icon: <FaEye />,
    title: 'Personalized Responses',
    description: 'VipraCo learns from interactions to provide increasingly personalized answers based on employee roles, history, and preferences.',
  },
  {
    icon: <FaClock />,
    title: '24/7 Availability',
    description: 'Access HR support anytime, anywhere. VipraCo is always available to answer questions, even outside business hours.',
  },
  {
    icon: <FaUsers />,
    title: 'Multi-Tenant Support',
    description: 'Easily manage multiple departments or organizations with customized HR policies and information for each.',
  },
];

const Features = () => {
  return (
    <section id="features" className="features-section">
      <h2>Powerful HR Features</h2>
      <p className="subtitle">VipraCo combines AI intelligence with HR expertise to deliver a seamless employee experience.</p>
      <div className="carousel-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="features-carousel"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {featuresData.map((feature, index) => (
            <SwiperSlide key={index}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Features;
