/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import { formatDate, truncateText } from "../../../../lib/commons";
import Link from "next/link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Person from "@mui/icons-material/Person";

const filter_options = ["GST", "Income Tax", "Registrations", "Complaince", "Other"];

const LoadinCard = ({ index }) => (
  <div key={index} className="article-card">
    <div className="article-content">
      <div style={{ minHeight: "200px", maxHeight: "200px" }} className="sk_image skleten"></div>
      <div className="skleten skleten-text title"></div>
      <div className="skleten skleten-text title last"></div>
      <p className="article-meta">
        <span>
          <CalendarMonthIcon style={{ width: "18px", height: "18px" }} />
        </span>
        <span>
          <Person style={{ width: "18px", height: "18px" }} />
        </span>
      </p>
      <div className="skleten skleten-text"></div>
      <div className="skleten skleten-text last" style={{ marginBottom: "10px" }}></div>
      <button className="read-article skleten skleten-text"></button>
    </div>
  </div>
);

const ArticleCard = ({ article, index }) => (
  <div key={index} className="article-card">
    <img src={article.img.url} alt={article.title || "Description"} />
    <div className="article-content">
      <h2>{truncateText(article.title, 60)}</h2>
      <p className="article-meta">
        <span>
          <CalendarMonthIcon style={{ width: "18px", height: "18px" }} />
          {formatDate(article.date)}
        </span>
        <span>
          <Person style={{ width: "18px", height: "18px" }} />
          {article.auther.name}
        </span>
      </p>
      <p>{truncateText(article.description, 120)}</p>
      <Link href={`/blogs/${article.seo.slug}/?id=${article.id}`}>
        <button className="read-article">Read Article →</button>
      </Link>
    </div>
  </div>
);

const BlogComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState(filter_options[0]);
  const [isFetching, setFetching] = useState(true);
  const [filteredArticles, setFilteredArticles] = useState([]);

  const cacheKey = `articles_${selectedFilter}`;

  // Function to fetch blogs by topic
  const fetchBlogsByTopic = async (filter_topic) => {
    if (!filter_topic) return [];

    try {
      const response = await fetch(
        "http://192.168.1.14:3000/api/blogs/get_by_topic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({ topic: filter_topic }),
        }
      );
      const result = await response.json();
      // Store in localStorage
      localStorage.setItem(cacheKey, JSON.stringify(result?.data || []));
      return result?.data || [];
    } catch (error) {
      console.error("Error while fetching topic blog posts:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadArticles = async () => {
      // Clear cache if flag is set
      const reloadFlag = localStorage.getItem('reloadFlag');
      if (reloadFlag) {
        localStorage.clear();
        localStorage.removeItem('reloadFlag');
      }

      setFetching(true);
      // Check if articles are in localStorage
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        setFilteredArticles(JSON.parse(cachedData));
        setFetching(false);
      } else {
        try {
          const res = await fetchBlogsByTopic(selectedFilter);
          setFilteredArticles(res);
        } catch (error) {
          console.error("Error while setting filtered articles:", error);
          setFilteredArticles([]);
        } finally {
          setFetching(false);
        }
      }
    };

    // Set flag to detect full page reload
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('reloadFlag', 'true');
    });

    loadArticles();

    // Cleanup event listener
    return () => {
      window.removeEventListener('beforeunload', () => {
        localStorage.setItem('reloadFlag', 'true');
      });
    };
  }, [selectedFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="blog-container">
      <div className="top">
        <span>
          <h1>Read By Topic</h1>
          <p>Learn and Read all about Compliance and Taxation</p>
        </span>
        <div className="filter-buttons">
          {filter_options.map((filter) => (
            <button
              key={filter}
              className={`filter_item ${selectedFilter === filter ? "active" : ""}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="articles-grid">
        {isFetching
          ? Array(3).fill().map((_, index) => <LoadinCard key={index} />)
          : filteredArticles.length > 0
          ? filteredArticles.map((article, index) => <ArticleCard key={index} article={article} />)
          : <p>No articles found for the selected topic.</p>}
      </div>
    </div>
  );
};

export default BlogComponent;
