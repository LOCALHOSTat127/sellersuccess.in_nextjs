"use client";
import { useState, useEffect } from "react";
import SideControls from "./SideControlls";
import "./HoverBar.scss";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
const HoverBarFixed = () => {
  const [show, setShow] = useState(false);

  const handleScrollTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / documentHeight) * 100;
      if (scrollPercentage > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        position: "fixed",
        bottom: "40px",
        right: "40px",
        height: "fit-content",
        padding: "14px 10px",
        background: "#f9f9f9",
        zIndex: "200",
        borderRadius: "9px",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        flexDirection: "column",
        gap: "18px",
      }}
      className="hover_board"
    >
      <Tooltip title="Scroll To Top" arrow placement="left">
        <IconButton
          onClick={handleScrollTop}
          sx={{
            background: "grey#efefef",
          }}
        >
          <VerticalAlignTopIcon />
        </IconButton>
      </Tooltip>
      <SideControls fd={"column"} gp={"24px"} />
    </div>
  );
};

export default HoverBarFixed;
