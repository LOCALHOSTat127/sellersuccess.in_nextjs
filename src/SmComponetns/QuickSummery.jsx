"use client"
import React, { useState } from 'react';

const QuickSummary = ({SUMMARY_TEXT}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        background: "#fffefe",
        padding: "24px 18px",
        borderRadius: "16px",
        boxShadow: 'rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px'
      }}
      className="quick_summary"
    >
      <p style={{
        fontWeight: "600",
        color: "black",
        fontSize: "1.1rem"
      }}>
        Quick Summary:
      </p>
      <p
        style={{
          textAlign: "justify",
          fontWeight: "500",
          color: "#464646",
          fontSize: "0.95rem",
          overflow: 'hidden',
          maxHeight: isExpanded ? 'none' : '10.5em',
          transition: 'max-height 0.3s ease'
        }}
        className="summary_text"
      >
      {SUMMARY_TEXT || "No Summary Found!"}
      </p>
      <button
        onClick={toggleExpand}
        style={{
          background: 'none',
          border: 'none',
          color: '#007BFF',
          fontSize : "0.95rem",
          cursor: 'pointer',
          padding: 0,
          fontWeight: '500',
          alignSelf: 'flex-start'
        }}
      >
        {isExpanded ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
};

export default QuickSummary;
