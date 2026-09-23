import React, { useState,useRef,useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { UpdateProperty} from '../../../Redux/features/PortfolioReducer';
export default function Currency(props) {
    const [ActiveTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const [Inflate, setInflate] = useState(0);
    const [Deflate, setDeflate] = useState(0);

    const Nation=useSelector((state) => state.Nation);
    const Portfolio=useSelector((state) => state.Portfolio);
    const dispatch = useDispatch();

   return (
    <>
        {ActiveTab==0?<label>CURRENCY</label>:null}
        {ActiveTab==1?<label>INFLATE</label>:null}
        {ActiveTab==2?<label>DEFLATE</label>:null}

        <div className="Currency">
        <div className="ChangeSelection" onClick={()=>ActiveTab==0?props.ChangeSelection():setActiveTab(0)}><FaArrowLeft /></div>
            <div>
                {ActiveTab==0?
                <>
                
                
                <div className="Main-button" onClick={()=>setActiveTab(1)}>INFLATE</div>
                <div className="Main-button" onClick={()=>setActiveTab(2)}>DEFLATE</div>
                </>
                :null}

                {ActiveTab==1?
                <div className="Inflate">
                    <div>
                            <span>Amount:</span> 
                            <input type="text" maxlength="4" value={Inflate}
                            onChange={(e)=>handleInputChange(e,setInflate)}/>
                    </div>
                    <div className="Process">
                        <div className={Inflate>0 && !loading?"Ready":"NoEvents"} onClick={Inflate>0?()=>
                            dispatch(UpdateProperty(["+",Nation.CurrentCountry.Id,'Inflation',Inflate,"MyCoin"]))
                            :null}>
                            <div>{!Inflate>0? "Waiting for amount" :loading?<>Processing <BiLoaderCircle/></>:"Process"}</div>
                        </div>
                    </div>
                </div>
                :null}
                {ActiveTab==2?
                <div className="Deflate">
                    <div>
                            <span>Amount:</span> 
                            <input type="text" maxlength="4" value={Deflate}
                            onChange={(e)=>handleInputChange(e,setDeflate)}/>
                    </div>
                    <div className="Process">
                        <div className={Deflate>0 && !loading?"Ready":"NoEvents"} onClick={Deflate>0?()=>
                            dispatch(UpdateProperty(["-",Nation.CurrentCountry.Id,"Inflation",Deflate,"MyCoin"]))
                            :null}>
                            <div>{!Deflate>0? "Waiting for amount" :loading?<>Processing <BiLoaderCircle/></>:"Process"}</div>
                        </div>
                    </div>
                </div>
                :null}
            </div>
        </div>
    </>
    )
}

//Generic handling of input change
const handleInputChange= (e,set) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');  // Allow only numbers
    set(newValue);
  };