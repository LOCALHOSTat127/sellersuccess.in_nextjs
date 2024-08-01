"use client";
import Image from "next/image";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import config from "../Header/config.json";

import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


import { useSelector, useDispatch } from "react-redux";
import { setMobileMenuOpen } from "../../store/configSlice";


import LogoDark from "../../../public/assets/svg/logo_dark.svg";
import MultiLevelAccordion from "./MultiMenuAccordain";

// Social_meadi_icons_array
const socialMediaIcons = [
  {
    icon: "/assets/svg/logo-facebook.svg",
    alt_tag: "Follow us on Facebook",
    className: "facebook icon_sm",
  },
  {
    icon: "/assets/svg/logo-instagram.svg",
    alt_tag: "Follow us on Instagram",
    className: "twitter icon_sm",
  },
  {
    icon: "/assets/svg/logo-youtube.svg",
    alt_tag: "Follow us on YouTube",
    className: "youtube icon_sm",
  },
  {
    icon: "/assets/svg/logo-linkedin.svg",
    alt_tag: "Follow us on LinkedIn",
    className: "linkedin icon_sm",
  },
];


const MobileMenu = () => {
  const isMobileMenu = useSelector((state) => state.config.isMobileMenuOpen);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const dispatch = useDispatch();
  const handleMenu = () => {
    dispatch(setMobileMenuOpen(false));
  };

  return (
    <Drawer
      anchor="right"
      sx={{
        background: "#3c3c3cbd",
        zIndex: "100000",
        "& .MuiDrawer-paper": {
          width: isMobile ? "100%" : isTablet ? 300 : "100%",
          background: "#f7f7f7",
          height: "100%", // Fixed height of the drawer
          overflow : "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        },
      }}
      open={isMobileMenu}
    >
      <div
        style={{
          padding: "18px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          alt="icon"
          style={{
            maxWidth: "120px",
            height: "auto",
          }}
          src={LogoDark}
        />
        <IconButton
          onClick={handleMenu}
          sx={{
            background: "#f9f9f9",
            "&:hover": {
              background: "rgb(213 211 211)",
            },
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />

      <MultiLevelAccordion menuItems={config?.navigation} />
      <Divider />
      <div className="buttonsContainer">
          <p>Follow Us On : </p>
          <div className="icons">
          {
            socialMediaIcons.map((icon,index) => (
                <img src={icon.icon} alt={icon.alt_tag} key={index} className="social_icon" />
            ))
          }
          </div>
      </div>
    </Drawer>
  );
};

export default MobileMenu;
