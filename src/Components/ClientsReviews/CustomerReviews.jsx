/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useRef } from "react";
import "./style.scss";
import Rating from "@mui/material/Rating";

const REVIEWS = [
  {
    customer_img: "assets/img/review_girl.png",
    custmer_name: "Rajesh Sharma",
    review:
      "Sellersuccess.in helped me with my GST registration. The process was smooth and fast. They explained everything clearly and were very professional.",
    stars: 4.0,
  },
  {
    customer_img: "assets/img/review_girl.png",
    custmer_name: "Priya Patel",
    review:
      "The accounting services by Sellersuccess.in are very good. They make it simple for me to understand my finances and handle all my accounting needs efficiently.",
    stars: 4.5,
  },
  {
    customer_img: "assets/img/review_girl.png",
    custmer_name: "Amit Kumar",
    review:
      "I got my tax return filed by Sellersuccess.in. They were very helpful and made the entire process stress-free. I am very happy with the service.",
    stars: 4.0,
  },
  {
    customer_img: "assets/img/review_girl.png",
    custmer_name: "Sneha Verma",
    review:
      "Sellersuccess.in assisted me with my company's registration. They handled everything very professionally and answered all my queries promptly.",
    stars: 4.5,
  },
  {
    customer_img: "assets/img/review_girl.png",
    custmer_name: "Manoj Singh",
    review:
      "The team at Sellersuccess.in is very knowledgeable. They helped me with my compliance issues and provided great support throughout the process.",
    stars: 4.0,
  },
  {
    customer_img: "assets/img/review_girl.png",
    custmer_name: "Anita Desai",
    review:
      "I used Sellersuccess.in for my payroll services. They are reliable and their services are affordable. I am very satisfied with their work.",
    stars: 4.5,
  },
  {
    customer_img: "assets/img/review_girl.png",
    custmer_name: "Vikram Malhotra",
    review:
      "Sellersuccess.in made my business registration process very easy. They are very professional and provide excellent customer service.",
    stars: 4.5,
  },
  {
    customer_img: "assets/img/review_girl.png",
    custmer_name: "Radhika Iyer",
    review:
      "I took accounting services from Sellersuccess.in and they made everything so easy for me. They are very professional and always ready to help.",
    stars: 4.0,
  },
];
const Reviews = () => {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = (e) => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed for smooth natural scroll
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="reviews">
      <div className="wrapper">
        <div className="text_area">
          <h6>Listen what our clients have to say.</h6>
          <p>
            Testimonials don’t lie,This is what our past & current clients said
            about the services we offer.
          </p>
          <a target="_blank" href="https://www.google.com/search?q=Seller+Success+%3A+Business+Accountant+%26+Internet+Marketing+Agency&rlz=1C1RXQR_enIN1111IN1111&oq=seller+Success+%3A+Business+Accountant+%26+Internet+Marketing+Agency&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGEAyBggCEEUYPDIGCAMQRRg8MgYIBBBFGDzSAQg5ODQ5ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x396db126605541bb:0xc30389611fe92aa0,3,,,,">
          <button class="brutalist-button">
            <div class="ms-logo">
              <img src="/assets/svg/gmb.svg" alt="Google My Business" />
            </div>
            <div class="button-text">
              <span>Give your Review on</span>
              <span>Google my business</span>
            </div>
          </button>
          </a>
        </div>
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className={`reviews_slider slider ${isDown && "grabbing"}`}
        >
          {REVIEWS.map((review, index) => (
            <div
              key={`${index}-${review.custmer_name}`}
              className="review_card"
            >
              <div className="img_name">
                <img
                  src={review.customer_img}
                  alt={review.custmer_name}
                  className="review_image"
                />
                <p className="name">{review.custmer_name}</p>
              </div>
              <p className="review_text">{review.review}</p>
              <div className="meta">
                <div className="rating">
                  <Rating
                    name="half-rating"
                    readOnly
                    defaultValue={review.stars}
                    precision={0.5}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
