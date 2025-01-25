/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";
import Image from "next/image";
import ClockIcon from "../../../../public/assets/svg/clock.svg";
import AutherIcon from "../../../../public/assets/svg/auther.svg";


const PageArea = ({META_INFO,CONTENT}) => {
  return (
    <section className="page_text_area ">
      <div className="page_text_area_wapper">
        <div className="meta_text">
          <h1 className="page_main_title">
          {META_INFO?.seo?.title}
          </h1>
          <p className="page_main_description">
          {META_INFO?.seo?.description}
          </p>
          <div className="info">
            <span>
              <Image src={ClockIcon} alt="Page last updated" />
              <p>{META_INFO.date_publish} </p>
            </span>
            <span>
              <Image src={AutherIcon} alt="written By" />
              <p>
                {META_INFO?.auther}
              </p>
            </span>
          </div>
        </div>
        <img
        src={META_INFO.page_img || '/assets/Images/fallback-image.jpg'}  
        alt={META_INFO?.seo?.title || "Description"}
        id="page_image"
        loading="lazy"
      />

        <div className="dynamic_html_fluyed prose" dangerouslySetInnerHTML={{ __html: CONTENT }} />
      </div>
    </section>
  );
};

export default PageArea;

