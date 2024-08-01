// Import necessary modules and styles
import { useState, useEffect } from "react";
import "./module.style.scss";
import config from "./config.json";
import Link from "next/link";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenuOpen } from "../../store/configSlice";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createSlug } from "../../../lib/commons";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

// Define your functional component
const Header = () => {
  const isMobileMenu = useSelector((state) => state.config.isMobileMenuOpen);
  const isCallBackDiloagBoxOpen = useSelector(
    (state) => state.config.isCallBackDiloagBoxOpen
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop <= lastScrollTop);
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const handleShowMenu = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleHideMenu = () => {
    setHoveredItem(null);
  };

  const handleMenu = () => {
    dispatch(setMobileMenuOpen(true));
  };

  return (
    <header
      style={{
        position: "sticky",
        display: `${
          isCallBackDiloagBoxOpen && isMobile ? "none" : "block"
        }`,
      }}
      className={`header ${isVisible ? "show active" : "hide"}`}
    >
      <MobileMenu />
      <div className="wrapper__header flex fdr aic jcsb">
        <Link id="logo" href="/">
          <img className="desktop" alt={config.alt} src={config.logo} />
          <img className="mobile" alt={config.alt} src={config.mobile_logo} />
        </Link>

        <nav className="flex fdr aic">
          <ul className="nav_items flex fdr aic jcsb">
            {config?.navigation.map((item) => (
              <li
                key={item.id}
                onMouseEnter={() => handleShowMenu(item.id)}
                onMouseLeave={handleHideMenu}
                className={`nav_item ${
                  hoveredItem === item.id ? "show_menu" : ""
                }`}
              >
                <div style={{
                  display : "flex",
                  alignItems : "center",
                  gap : "4px"
                }} className="item">
                  <p>{item.head}</p>
                  <KeyboardArrowDownIcon className="icon_arrow" />
                </div>
                {item.sub_list?.length > 0 && (
                  <div className="menu_outer">
                    <div className="mega_menu">
                      {item.sub_list.map((subItem) => (
                        <div key={subItem.id} className="part">
                          <h2>{subItem.subhead}</h2>
                    
                          <ul>
                            {subItem.sub_items.map((subMenuItem) => (
                              <Link
                                onClick={handleHideMenu}
                                href={`/article/${createSlug(
                                  subMenuItem.title
                                )}?id=${subMenuItem.id}`}
                                key={`${subItem.id}-${subMenuItem.id}`}
                              >
                                <li>{subMenuItem.item}</li>
                              </Link>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {item.list?.length > 0 && (
                  <div className="menu_outer">
                    <div className="mega_menu">
                      <ul>
                        {item.list.map((listItem) => (
                          <Link
                            onClick={handleHideMenu}
                            href={`/article/${createSlug(
                              listItem.title
                            )}?id=${listItem.id}`}
                            key={`${item.id}-${listItem.id}`}
                          >
                            <li>{listItem.item}</li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <Link href={config.cta.primary.target}>
            <button
              aria-label={config.cta.primary.text}
              id="cta_button"
              className="blogs"
            >
              <p>{config.cta.primary.text}</p>
              {/* <img src={config.cta.primary.icon} alt={config.cta.primary.text} /> */}
              <SearchIcon  className="search_icon" />
            </button>
          </Link>

          <div
            className={`hamburger-menu ${isMobileMenu ? "open" : ""}`}
            onClick={handleMenu}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
