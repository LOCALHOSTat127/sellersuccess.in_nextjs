
import React from 'react'
import config from "../../../content/pages_static/homepage.json"
import "./style.scss";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BottomBar from '../BottomBar/BottomBar';
import CallBackDialog from '../CallBackDialog/CallBackDialog';
import CallBackBtn from '@/SmComponetns/CallBackBtn';



const Hero = () => {
   

  return (
    <section 
    
    className='hero__'>
            <CallBackDialog/>
           <div className="outer_wrapper">
           <div className="wrapper ">
            <div className="content">
                <h1 className="title">
                Simplify your <span>Taxation</span> & <span>Compliance</span>.
                </h1>
                <p className="description">
                    {config.herosection.description}
                </p>
                <div className="ctat flex fdr aic jcfs">
                    <CallBackBtn text={config.herosection.cts.primary.text}/>
                    <a href="#popular_serivces_section">
                    <button  className="cta_hero secondary">
                    {config.herosection.cts.secondary.text}
                    <KeyboardArrowDownIcon className='icon'/>
                    </button>
                    </a>
                </div>
                </div>
            </div>
           </div>
        <BottomBar/>
         
    </section>
  )
}

export default Hero