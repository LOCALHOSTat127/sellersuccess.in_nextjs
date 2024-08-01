"use client"
import React from 'react'
import "./style.scss";
import { useDispatch } from "react-redux";
import {setCallBackDiloagBox} from "../../store/configSlice";

import AddIcCallIcon from '@mui/icons-material/AddIcCall';
const MobileBottomBar = () => {
    const dispatch = useDispatch();
    const handleDiloagBox = (e) =>{
      dispatch(setCallBackDiloagBox(true));
  }
  return (
    <div className='mobile_bottom_bar'>
    
    <button 
      onClick={handleDiloagBox}
      id="open_cb_">
         Get an Callback
        <AddIcCallIcon/>
      </button>
    </div>
  )
}

export default MobileBottomBar