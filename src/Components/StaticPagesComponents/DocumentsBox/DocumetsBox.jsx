"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./style.scss";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import LinearProgress from "@mui/material/LinearProgress";
import DocIcon from "../../../../public/assets/svg/doc_icon.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { emailHandler } from "../../../../lib/utils";

const DOCUMENTS_TYPES = [
  { doc_name: "Private Limited Company", id: "123" },
  { doc_name: "One Person Company", id: "124" },
  { doc_name: "Public Limited Company", id: "125" },
];

const Documents = ({CONFIG}) => {
  const [DocType, SetDocType] = useState(null);
  const [isSubmittingDocReq, setSubmittingDocReq] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedDoc = DOCUMENTS_TYPES.find(doc => doc.id === selectedId);
    SetDocType(selectedDoc);
  };

  const validateForm = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, msg: "Invalid email address." };
    }
    return { isValid: true };
  };

  const handleFormSubmit = async () => {
    const emailInput = document.getElementById("email_id").value;
    const validation = validateForm(emailInput);

    if (!validation.isValid) {
      setSnackbarMessage(validation.msg);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (emailInput !== "" && DocType !== null) {
      const currentTime = new Date().getTime();
      const lastRequestTime = localStorage.getItem("lastRequestTime");

      if (lastRequestTime && currentTime - lastRequestTime < 24 * 60 * 60 * 1000) {
        setSnackbarMessage("You can only request a document once every 24 hours.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      setSubmittingDocReq(true);
      try {
        await emailHandler({
          e_type: 'DOCREQ',
          template_: null, // Template is not used here
          file: {
            name: DocType.doc_name,
            fID: DocType.id,
          },
          c_details: {
            send_to: emailInput,
            name: "",
            email: emailInput,
            phone: "",
          },
        });
        localStorage.setItem("lastRequestTime", currentTime.toString());
        setSnackbarMessage("Request submitted successfully!");
        setSnackbarSeverity("success");
      } catch (error) {
        setSnackbarMessage("Failed to submit request.");
        setSnackbarSeverity("error");
      } finally {
        setSubmittingDocReq(false);
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Please fill out all fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <section className="outer_">
      <div className="documents_">
        <div className="text_info">
          <div className="icon">
            <Image src={DocIcon} alt="Documents Required" />
          </div>
          <span>
            <h6>Documents Required</h6>
            <p>
              Here is the check list of documents required to register a private
              limited company.
            </p>
          </span>
          <ul className="documents">
            {CONFIG?.list.map((doc,index) => (
              <li key={index}>
                {doc}
              </li>
            ))}
          </ul>
        </div>

        <div className="form_input">
          {isSubmittingDocReq && (
            <LinearProgress
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                borderRadius: "16px",
              }}
            />
          )}
          <p>Get PDF Directly to Inbox</p>
          <div className="feilds">
            <FormControl
              style={{
                width: "100%",
              }}
            >
              <InputLabel id="select_doc_type">Select Document Type</InputLabel>
              <Select
                disabled={isSubmittingDocReq}
                style={{
                  width: "100%",
                  minWidth: "250px",
                }}
                labelId="select_doc_type"
                id="select_documents_type"
                value={DocType?.id || ""}
                onChange={handleChange}
                placeholder="Select"
                label="Select Document Type"
              >
                <MenuItem value="">
                  <em>Select Document Type</em>
                </MenuItem>
                {DOCUMENTS_TYPES.map((doc) => (
                  <MenuItem value={doc.id} key={doc.id}>
                    {doc.doc_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              style={{
                width: "100%",
              }}
              disabled={isSubmittingDocReq}
              label="Email ID"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              id="email_id"
              type="email"
              placeholder="Enter your email address"
            />

            <Button
              TouchRippleProps={false}
              disableElevation
              style={{
                width: "100%",
                background: `${
                  isSubmittingDocReq ? "#3f3cf67b" : "#403CF6"
                }`,
              }}
              disabled={isSubmittingDocReq}
              onClick={handleFormSubmit}
              id="submit_cb"
              variant="contained"
              endIcon={<SendIcon />}
            >
              {isSubmittingDocReq ? "Submitting..." : "Request a Callback"}
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Documents;
