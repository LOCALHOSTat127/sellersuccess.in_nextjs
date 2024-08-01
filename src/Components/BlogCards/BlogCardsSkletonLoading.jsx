import React from 'react'
import "./style.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
const BlogCardsSkletonLoading = () => {
  return (
    <section className="blog-posts">
    <div className="blog-posts__grid">
      {[1,2,3].map((card, index) => (
        <div key={index} className="blog-post">
          <div className="blog-post__image skleten"></div>
          <div className="blog-post__content">
            <div className="blog-post__meta">
              <span className="blog-post__date skleten">
              <p
                  style={{
                    color: "transparent",
                  }}
                >
                  Date
                </p>
              </span>
              <span className="blog-post__author skleten">
                <PersonOutlineIcon style={{
                  color : "transparent"
                }} className="blog-post__author-icon " />
                <p
                  style={{
                    color: "transparent",
                  }}
                >
                  Date
                </p>
              </span>
            </div>
            <h3 className="blog-post__title">
            <div className="skleten skleten-text title"></div>
            <div className="skleten skleten-text title last"></div>
                </h3>
            <div className="blog-post__description">
            <div className="skleten skleten-text "></div>
            <div className="skleten skleten-text  last"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

export default BlogCardsSkletonLoading