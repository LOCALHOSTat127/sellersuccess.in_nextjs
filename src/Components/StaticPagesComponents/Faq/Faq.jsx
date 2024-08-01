"use client";
import { Add } from "@mui/icons-material";
import "./style.scss";

const GRID_CONFIG = {
  col: 1,
  gap: 34,
};

const Faq = ({ cls_n, CONFIG }) => {
  const handleOpenClose = (e) => {
    const left = document.getElementById("left_faqs").children;
    const right = document.getElementById("right_faqs").children;

    const targetBox = e.currentTarget;

    if (targetBox.classList.contains("active")) {
      targetBox.classList.remove("active");
      return;
    }

    Array.from(left).forEach((item) => item.classList.remove("active"));
    Array.from(right).forEach((item) => item.classList.remove("active"));

    targetBox.classList.add("active");
  };

  if (!CONFIG) return null;

  return (
    <section className={`faqs_section ${cls_n}`}>
      <div className="wrapper">
        <div className="text_area">
          <h6>FAQs</h6>
          <p>Get Answers to your most asked questions.</p>
        </div>
        <div
          className="faqs"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_CONFIG.col}, 1fr)`,
            gap: `${GRID_CONFIG.gap}px`,
          }}
        >
          <div className="left faqs_list_outer" id="left_faqs">
            {CONFIG.faqs.left.map((faq, index) => (
              <div
                onClick={handleOpenClose}
                key={faq.id || index} // Ensure unique key
                className="faq"
              >
                <div className="faq_q">
                  <h2>{faq.question}</h2>
                  <Add className="openFaq" alt="Expand" />
                </div>
                <p className="answer">{faq.answer}</p>
                <div className="overlay"></div>
              </div>
            ))}
          </div>
          <div className="right faqs_list_outer" id="right_faqs">
            {CONFIG.faqs.right.map((faq, index) => (
              <div
                onClick={handleOpenClose}
                key={faq.id || index} // Ensure unique key
                className="faq"
              >
                <div className="faq_q">
                  <h2>{faq.question}</h2>
                  <Add className="openFaq" alt="Expand" />
                </div>
                <p className="answer">{faq.answer}</p>
                <div className="overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
