/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './style.scss';
import ClientsReviews from '../ClientsReviews/ClientsReviews';

const OurStory = () => {
  return (
    <section className="our-story">
      <div className="container">
   
        <div className="story-content">
          <div className="story-image">
            <img src="/assets/img/our_story.jpg" alt="Our journey" />
          </div>
          <div className="story-text">
          <h2 >Our Story</h2>
            <h3>A Journey of Innovation</h3>
            <p>
            Founded in 2023, Sellersuccess.in has quickly established itself as a leader in providing exceptional services to businesses. Our journey has been marked by a steadfast commitment to our core values of creativity, integrity, and excellence. We pride ourselves on helping our clients achieve their goals through innovative solutions and personalized support.
            </p>
            <ul className="milestones">
              <li>2023: Sellersuccess.in founded</li>
              <li>2023: Successfully served over 1500 clients within the first year</li>
              <li>2024: Introduced advanced service offerings to cater to a wider range of business needs</li>
              <li>2024: Expanded our team with industry experts to enhance service quality and client satisfaction</li>
            </ul>
          </div>
        </div>
      </div>
      <ClientsReviews/>
    </section>
  );
};

export default OurStory;