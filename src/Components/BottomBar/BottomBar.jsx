/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";
import config from "../../../content/pages_static/homepage.json";

const BottomBar = () => {
  return (
    <div className="bottom_bar">
      <div className="bottom_bar_wrapper">
        <div className="head">
          <p>Excellence in Action</p>
        </div>
        <div className="cards">
          {config.showcase_bar.map((card, index) => (
            <div key={index} className="card flex aic jcsb">
                <div className="icon flex aic jcc">
                    <img 
                    src={card.icon} 
                    alt={card.text || "Description"}
                     />
                </div>
                <div className="text flex fdc">
                        <h6>{card.text}</h6>
                        <p>{card.descrtption}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
