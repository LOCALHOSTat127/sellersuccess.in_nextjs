"use client";
import "./pircing.scss";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Pricing = ({ CONFIG }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: -20 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [controls, inView]);

  return (
    <div className="prices_" ref={ref}>
      <div className="wrapper">
        <span className="text_area">
          <h6>{CONFIG?.head}</h6>
          <p>{CONFIG?.subhead}</p>
        </span>
        <div
          className="price_cards"
          style={{ gridTemplateColumns: `repeat(${CONFIG?.packs.length || 1}, 1fr)` }}
        >
          {CONFIG?.packs.map((card, index) => (
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ delay: 0.2 }}
              key={card.id || index}
            >
              <div className="card_price_info">
                <div className="tag">
                  <div className="dot"></div>
                  <p>{card.type}</p>
                </div>
                <div className="pricing_section">
                  <span className="pricing_upper">
                    <p className="original_pricing">{card.original_price}</p>
                    <p className="dis_percent">
                      ({(((card.original_price - card.current_price) / card.original_price) * 100).toFixed(0)}%)
                    </p>
                  </span>
                  <span className="pricing_lower">
                    <p className="symbol">₹</p>
                    <p className="current_price">{card.current_price}</p>
                  </span>
                  <p className="info">Plan inclusive of all charges</p>
                </div>
              </div>
              <div className="features">
                <p>KEY FEATURES</p>
                <ul>
                  {card?.list.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature">
                      <CheckCircleOutlineRoundedIcon className="tick" sx={{ stroke: "#86F09D" }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
