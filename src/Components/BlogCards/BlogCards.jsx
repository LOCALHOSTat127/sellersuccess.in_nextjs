import React from "react";
import "./style.scss";
import Link from "next/link";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { truncateText } from "../../../lib/commons";
import Image from "next/image";
import { formatDate } from "../../../lib/commons";
const BlogCards = ({ cards_,pre_fix }) => {

  return (
    <section className="blog-posts">
      <div className="blog-posts__grid">
        {cards_?.map((card, index) => (
          <div key={`${pre_fix}_${index}`} className="blog-post">
            <div className="blog-post__image">
              <Image width={400} height={400}   src={card?.img?.url} alt={card.title} />
            </div>
            <div className="blog-post__content">
              <div className="blog-post__meta">
                <span className="blog-post__date">{formatDate(card.date)}</span>
                <span className="blog-post__author">
                  <PersonOutlineIcon className="blog-post__author-icon" />
                  {card.auther.name}
                </span>
              </div>
              <h3 className="blog-post__title">{card.title}</h3>
              <p className="blog-post__description">
                {truncateText(card.description, 120)}
              </p>
              <Link
                href={`/blogs/${card.seo.slug}/?id=${card.id}`}
                className="blog-post__link"
              >
                Read Now →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogCards;
