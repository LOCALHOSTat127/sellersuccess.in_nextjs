/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./style.scss";

import { useDispatch } from "react-redux";
import { setCallBackDiloagBox } from "../../store/configSlice";

const CallBackCard = () => {
  const dispatch = useDispatch();
  const handleDiloagBox = (e) => {
    dispatch(setCallBackDiloagBox(true));
  };
  return (
    <div className="cb_card">
      <span>
        <p>Feeling Lost?</p>
        <h4>Let&apos;s Connect.</h4>
        <p className="desc">
          Have questions or need help? Reach out to us via email or phone.
          We&apos;re here to assist you!
        </p>
      </span>

      <button onClick={handleDiloagBox} id="open_cb_">
        Get an Callback
        <img
          src="/assets/svg/msg_icon.svg"
          alt="request and callback"
          srcSet="/assets/svg/msg_icon.svg"
        />
      </button>
    </div>
  );
};

export default CallBackCard;
