/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./style.scss";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIcon from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";

import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setCallBackDiloagBox } from "@/store/configSlice";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



import {emailHandler} from "../../../lib/utils";





const CustomDialog = styled(Dialog)(({ theme }) => ({
  ".MuiDialog-paper": {
    borderRadius: "9px",
    zIndex: '1500000'
  },
}));



const CallBackDialog = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



  const isCallBackDiloagBoxOpen = useSelector(
    (state) => state.config.isCallBackDiloagBoxOpen
  );
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSent, setSent] = useState(false);
  const [isRes, setRes] = useState({
    isErr: null,
    head: "",
    msg: "",
    err_clr: {
      clr: "#f79797",
    },
    succ_clr: {
      clr: "#ccffcc",
    },
  });



  const validateForm = (name, phone, email) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (name.length < 5) {
      return { isValid: false, msg: "Name must be at least 5 characters long." };
    }
    if (!phoneRegex.test(phone)) {
      return { isValid: false, msg: "Invalid phone number." };
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, msg: "Invalid email address." };
    }
    return { isValid: true };
  };


  const fetchNpushToLocalStorage = (ID = "CBREQUEST", obj = null, ope = null) => {
    if (ope === "FETCH") {
        if (ID === null) {
            return null; // Handle case where ID is not provided
        }
        const data = localStorage.getItem("CBREQUEST");
        return JSON.parse(data);
    } else if (ope === "PUSH") {
        if (ID === null || obj === null) {
            return false; // Handle cases where ID or obj is not provided
        }
        const stringObj = JSON.stringify(obj);
        localStorage.setItem("CBREQUEST",stringObj);
    }
};



const handleFormSubmit = async (e) => {

    e.preventDefault();
    const name = document.getElementById("full_name_cb").value;
    const phone = document.getElementById("phone_number_cb").value;
    const email = document.getElementById("email_id_cb").value;

    const validation = validateForm(name, phone, email);

    if (!validation.isValid) {
        setRes((re) => ({
            ...re,
            head: "Error",
            msg: validation.msg,
            isErr: true,
        }));
        setSent(true);
        setTimeout(() => setSent(false), 5000);
        return;
    }

    const currentTime = new Date().getTime(); // Current timestamp in milliseconds
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Check localStorage for existing entry
    const storedData = fetchNpushToLocalStorage("CBREQUEST", null, "FETCH");

    if (storedData) {
        // Calculate time difference
        const storedTime = new Date(storedData.timestamp).getTime();
        const timeDifference = currentTime - storedTime;

        if (timeDifference < twentyFourHours) {
            // Less than 24 hours
            setRes((re) => ({
                ...re,
                head: "Error",
                msg: "You can submit a new request after 24 hours.",
                isErr: true,
            }));
            setSent(true);
            setTimeout(() => setSent(false), 5000);
            return;
        } else {
            // More than 24 hours, remove old entry
            localStorage.removeItem("CBREQUEST");
        }
    }else{
     
          // Store new entry with current timestamp
        const formData = {
          name,
          phone,
          email,
          timestamp: new Date().toISOString(), // Store timestamp as ISO string
      };

      setSubmitting(true);
      try {
        const response = await emailHandler({
          e_type: 'NEWCB',
          template_: null, // Template is not used here
          file: null, // Not needed for callback requests
          c_details: {
            send_to: process.env.NEXT_PUBLIC_SERVICE_EMAIL, // or any other relevant email
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },

        });
        setRes((re) => ({
          ...re,
          head: "Success",
          msg: "Our Team Member Will Contact you.",
          isErr: false,
      }));
        fetchNpushToLocalStorage("CBREQUEST", formData, "PUSH")
        setSubmitting(false);
        setSent(true);

        setTimeout(() =>{
          dispatch(setCallBackDiloagBox(false));
        },3000);
      } catch (error) {
        setSubmitting(false);
        setRes((re) => ({
          ...re,
          head: "Error",
          msg: "Please Try After sometime.",
          isErr: true,
      }));
        console.log('Failed to send callback request: ' + error.message);
      }

      document.getElementById("full_name_cb").value = "";
      document.getElementById("phone_number_cb").value = "";
      document.getElementById("email_id_cb").value = ""; 
    }
};

  const handleDiloagClose = (e) => {
    e.preventDefault();
    dispatch(setCallBackDiloagBox(false));
  };
  
  return (
    <CustomDialog
    // {isMobile && fullScreen}
    fullScreen={isMobile && true}
     maxWidth={"700px"}
      fullWidth={false}
      open={isCallBackDiloagBoxOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="main_outer">
        <div className="banner_outer_dialog">
          <img src="/assets/img/cbimg.jpg" alt="Get An Call Back" />
        </div>
        <div className="contact_box">
          {isSubmitting && (
            <LinearProgress className="MuiLinearProgress-root" />
          )}
          <div className="head_contact_box">
            <span>
              <h2>GET IN TOUCH</h2>
              <p>24/7 Answers to your questions.</p>
            </span>
            <IconButton
            className="close_menu"
              disabled={isSubmitting}
              onClick={handleDiloagClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </div>
          <div className="feilds_contact_box">
            <TextField
              disabled={isSubmitting}
              placeholder="Full Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              id="full_name_cb"
              type="text"
            />
            <TextField
              disabled={isSubmitting}
              placeholder="Mobile Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              id="phone_number_cb"
              type="tel"
            />
            <TextField
              disabled={isSubmitting}
              placeholder="Email Address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              id="email_id_cb"
              type="email"
            />
            <Button
              TouchRippleProps={false}
              disableElevation
              disabled={isSubmitting}
              onClick={handleFormSubmit}
              id="submit_cb"
              variant="contained"
              endIcon={(isSubmitting && isMobile) === true ? <CircularProgress size={20} sx={{
                color : "black"
              }} /> : <SendIcon />}
              className={
                isSubmitting ? "MuiButton-root Mui-disabled" : "MuiButton-root"
              }
            >
              {isSubmitting ? "Submitting..." : "Request an Callback"}
            </Button>

            {isSent && (
              <>
                <div
                  style={{
                    background: `${
                      isRes.isErr === true
                        ? isRes.err_clr.clr
                        : isRes.succ_clr.clr
                    }`,
                    padding: "18px",
                    borderRadius: "6px",
                   
                  }}
                  className={`message_box ${isSent === true ? "show" : "hide"}`}
                >
                  <p
                    style={{
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      fontWeight: "700",
                    }}
                    className="head_text"
                  >
                    {isRes.head}
                  </p>
                  <p
                    style={{
                      textTransform: "capitalize",
                      fontSize: "0.85rem",
                    }}
                    className="message_text"
                  >
                    {isRes.msg}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default CallBackDialog;
