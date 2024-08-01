/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";
import Link from "next/link";



const OtherSerivicesLayout = ({CONFIG}) => {
    
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
          return text;
        }
        return text.substring(0, maxLength) + '...';
      };
  return (
    <section className="section_outer">
        <div className="text_section">
            <h4>{CONFIG.head}</h4>
            <p>{CONFIG.subhead}</p>
        </div>
        <div 
        className="grid">
            {
                CONFIG.cards.map((card,index) => (
                    <Link key={index} href={`/article/${card.card_link}?id=${card.id}`} >
                  <div  className="card">
                    <div className="image_outer">
                        <img
                        className="card_img"
                        src={card.card_image}
                        alt={card.alt || "image"}
                        />
                    </div>
                    <span>
                    <h3 className="card_title">
                            {card.card_title}
                        </h3>
                        <p className="card_desc">
                            {
                            truncateText(card.card_description,250)
                            }
                        </p>
                    </span>
                        <p className="cta_link">
                            Learn More
                        </p>
                  </div>
                  </Link>
                ))
            }
        </div>
    </section>
  )
}

export default OtherSerivicesLayout