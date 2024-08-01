"use client"
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { useDispatch } from 'react-redux';
import {setCallBackDiloagBox} from "../store/configSlice";

const CallBackBtn = ({text}) => {
    const dispatch = useDispatch();
    
    const handleDiloagBox = (e) =>{
        e.preventDefault()
        dispatch(setCallBackDiloagBox(true));
    }

    return (
    <button onClick={handleDiloagBox} className="cta_hero primary ">
    <AddIcCallIcon className='icon'/>
    {text}
    </button>
  )
}

export default CallBackBtn