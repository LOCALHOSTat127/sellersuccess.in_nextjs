/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

const NotFound = () => {
  return (
    <div
    style={{
      background: "#fafafa",
      width: "100%",
      padding: "20px",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
    }}
    className="notfound"
  >
    <img
      style={{
        minWidth: "200px",
        height: "auto",
      }}
      src={"/assets/svg/not-found.svg"}
      alt="No Results Found!"
    />
    <p
      style={{
        fontWeight: "600",
        fontSize: "0.95rem",
      }}
    >
      No Results Found!
    </p>
  </div>
  )
}

export default NotFound