/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "./module.style.scss";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Link from "next/link";
import config from "../Header/config.json";
import {  useDispatch } from "react-redux";
import { setMobileMenuOpen } from "../../store/configSlice";
import { createSlug } from "../../../lib/commons";
const MultiLevelAccordion = () => {
  const [openItems, setOpenItems] = useState({});
  const dispatch = useDispatch();
  const handleMenu = () => {
    dispatch(setMobileMenuOpen(false));
  };

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };



  return (
    <div className="accordion">
      {config?.navigation?.map((item,index) => (
        <div key={index} className="accordionItem">
          <div className="accordionHeader" onClick={() => toggleItem(item.id)}>
            <img
              className="item_icon"
              style={{
                width: "20px",
                height: "auto",
              }}
              src={item.icons || ""}
              alt="Menu Item Icon"
            />
            <h3 className={item.isBold ? "bold" : ""}>{item.head}</h3>
          </div>

          {item?.sub_list?.length > 0 && (
            <div
              className={`accordionContent ${openItems[item.id] ? "open" : ""}`}
            >
              {item.sub_list.map((subItem) => (
                <div key={subItem.id} className="subItem">
                  <div
                    className="subHeader"
                    onClick={() => toggleItem(subItem.id)}
                  >
                    <HorizontalRuleIcon />
                    <h4>{subItem.subhead}</h4>
                  </div>
                  <div
                    className={`subContent ${
                      openItems[subItem.id] ? "open" : ""
                    }`}
                  >
                    <ul>
                      {subItem.sub_items.map((subSubItem, index) => (
                        <Link
                        key={subSubItem.id || index}
                        onClick={handleMenu}
                          href={`/article/${createSlug(subSubItem.title)}?id=${
                            subSubItem.id
                          }`}
                        >
                          <li >
                            {subSubItem.item}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {item?.list?.length > 0 && (
            <div
              className={`accordionContent ${openItems[item.id] ? "open" : ""}`}
            >
              <ul>
                {item.list.map((listItem, index) => (
                  <Link
                  key={listItem.id || index}
                  onClick={handleMenu}
                    href={`${createSlug(listItem.title)}?id=${
                      listItem.id
                    }`}
                  >
                    <li >{listItem.item}</li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiLevelAccordion;
