/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import copy from "copy-to-clipboard";
import { truncateText } from "../../lib/commons";
import "./share_dialogstyle.scss";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { useSelector, useDispatch } from "react-redux";
import { setShareDiloag } from "../store/configSlice";
import { Close } from "@mui/icons-material";

const SHARE_PLATFORMS = [
  {
    name: "WhatsApp",
    icon: "/assets/svg/wa_icon.svg",
    link: "https://api.whatsapp.com/send?text=",
  },
  {
    name: "Facebook",
    icon: "/assets/svg/fb_icon.svg",
    link: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    name: "Instagram",
    icon: "/assets/svg/ig_icon.svg",
    link: "https://www.facebook.com/sharer/sharer.php?u=", // Instagram sharing might need a different link
  },
  {
    name: "Twitter",
    icon: "/assets/svg/tw_icon.svg",
    link: "https://twitter.com/intent/tweet?url=",
  },
  {
    name: "LinkedIn",
    icon: "/assets/svg/li_icon.svg",
    link: "https://www.linkedin.com/shareArticle?url=",
  },
];

const ShareDialog = () => {
  const handleCopyLink = () => {
    if(window){
      copy(window?.location?.href || "");
    }
  };

  const dispatch = useDispatch();
  const isShareDiloagOpen = useSelector((state) => state.config.isShareDiloagOpen);

  const handleShareDiloag = (e) => {
    e.preventDefault();
    dispatch(setShareDiloag(false));
  };

  return (
    <Dialog open={isShareDiloagOpen}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px 0px 0px",
          background: "#f6f6f6",
        }}
      >
        <DialogTitle>Share this article</DialogTitle>

        <IconButton
          sx={{
            background: "#ebebeb",
          }}
          onClick={handleShareDiloag}
        >
          <Close />
        </IconButton>
      </div>
      <DialogContent>
        <Box
          sx={{
            padding: "0px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflowX: "auto",
          }}
        >
          {SHARE_PLATFORMS.map((plat, index) => (
            <Tooltip key={index} title={plat.name}>
              <IconButton
                component="a"
                href={`${plat.link}${encodeURIComponent(window?.location?.href || "")}`}
                target="_blank"
              >
                <img
                  style={{
                    width: "44px",
                    height: "auto",
                  }}
                  src={plat.icon}
                  alt={plat.name}
                />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
        <Tooltip title="Copy link">
          <div
            className="share_link"
            onClick={handleCopyLink}
            style={{
              cursor: "pointer",
              width: "100%",
              padding: "20px",
              transition: "all 50ms ease-in-out",
            }}
          >
            <div
              className="share_bar"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                background: "#3a3a3a29",
                borderRadius: "9px",
                border: "1px solid #00000033",
              }}
            >
              <p
                className="link"
                style={{
                  fontSize: "16px",
                  color: "black",
                }}
              >
                {truncateText(window?.location?.href || "", 20)}
              </p>
              <IconButton>
                <CopyAllIcon />
              </IconButton>
            </div>
          </div>
        </Tooltip>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
