import "./style.scss";

const GridPoints = ({ CONFIG,marginTop,marginBottom }) => {


  return (
    <>
      {CONFIG && (
        <section className="about_us">
          <div style={{
            marginTop : marginTop,
            marginBottom : marginBottom
          }} className="wrapper">
            <div className="text_area">
              <h5>{CONFIG.head}</h5>
              <p>{CONFIG.sub_head}</p>
            </div>
            <div className="points">
              {CONFIG?.list.map((point, index) => (
                <div
                  className={`point ${point.index % 3 === 0 ? "nlv" : null} ${
                    index >= CONFIG.list.length - (CONFIG.list.length % 3 || 3)
                      ? "nlh"
                      : ""
                  }`}
                  id={index}
                  key={index}
                >
                  <p className="desc">{point.subhead}</p>
                  <span>
                    <p>{point.head}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GridPoints;
