import "./style.scss";

const GirdBoxes = ({ CONFIG }) => {
  return (
    <>
      {CONFIG && (
        <section className="grid_">
          <div className="wrapper">
            <div className="text_section">
              <h5>{CONFIG?.head}?</h5>
              <p>{CONFIG?.sub_head}</p>
            </div>
            <div className="grid_area">
              {CONFIG?.list.map((card, index) => (
                <div key={index} className="card_">
                  <div className="card_number">
                    <img src={`${`/assets/svg/1_.svg`}`} alt={card.title} />
                  </div>
                  <div className="content">
                    <h6>{card.title}</h6>
                    <p>{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GirdBoxes;
