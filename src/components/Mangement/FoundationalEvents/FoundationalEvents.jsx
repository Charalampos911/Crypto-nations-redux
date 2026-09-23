import React, { useState,useRef,useEffect } from 'react';
import { UpdateNationFundationalEvents } from '../../../Redux/features/NationReducer';
import { useSelector, useDispatch } from "react-redux";
import { BiLoaderCircle } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa"
export default function FoundationalEvents(props) {
    const [loading, setLoading] = useState(false);
    const Base=useSelector((state) => state.Base); 
    const Nation=useSelector((state) => state.Nation); 
    const dispatch = useDispatch();
    const [CountryType, setCountryType] = useState(0);
    const [GunControlType, setGunControlType] = useState(0);
    const [AllianceType, setAllianceType] = useState(0);


    var InitatedNation = Nation.InitiatedCountries.find(
      (item) => item.Id === Nation.CurrentCountry.Id
    )

    var IsReady = (CountryType !==0 && CountryType[0]!==InitatedNation.CountryType) || (GunControlType !==0 && GunControlType[0]!==InitatedNation.GunControlType) || (AllianceType!==0 && AllianceType[0]!==InitatedNation.AllianceType);
    
    const HandleEvent =(e)=>{
      console.log("HandleEvent==",e)
      switch (e[0]) { //Purposefully needlessly separated
          case 'CountryType':
              dispatch(UpdateNationFundationalEvents(e)) 
              break;
          case 'GunControl':
              dispatch(UpdateNationFundationalEvents(e))
              break;
          case 'Alliance':
              dispatch(UpdateNationFundationalEvents(e))
              break;
          default:
              break;
      }
  };

   return (
    <div className="Foundational-events">
              <div className="ChangeSelection" onClick={()=>props.ChangeSelection()}><FaArrowLeft /></div>
              <label>FOUNDATIONAL EVENTS</label>
              <div className="Options">
              <div onClick={()=>setCountryType([Base.AllCountryTypes[0].Type[0],Base.AllCountryTypes[0].Type[1],Base.AllCountryTypes[0].Type[2]])} className={ (CountryType==0 && InitatedNation.CountryType==1) || CountryType[0]==1?"Selected Civil":"Civil"}>
                  <div>
                    <div>
                    <span style={{ transform: "rotate(-55deg)" }}>D</span>
                    <span style={{ transform: "rotate(-45deg)" }}>i</span>
                    <span style={{ transform: "rotate(-35deg)" }}>c</span>
                    <span style={{ transform: "rotate(-25deg)" }}>t</span>
                    <span style={{ transform: "rotate(-15deg)" }}>a</span>
                    <span style={{ transform: "rotate(-5deg)" }}>t</span>
                    <span style={{ transform: "rotate(5deg)" }}>o</span>
                    <span style={{ transform: "rotate(15deg)" }}>r</span>
                    <span style={{ transform: "rotate(25deg)" }}>s</span>
                    <span style={{ transform: "rotate(35deg)" }}>h</span>
                    <span style={{ transform: "rotate(45deg)" }}>i</span>
                    <span style={{ transform: "rotate(55deg)" }}>p</span>
                    </div>
                  </div>
                </div>

                <div onClick={()=>setCountryType([Base.AllCountryTypes[1].Type[0],Base.AllCountryTypes[1].Type[1],Base.AllCountryTypes[1].Type[2]])} className={(CountryType==0 && InitatedNation.CountryType==2) || CountryType[0]==2?"Selected Civil":"Civil"}>
                  <div>
                    <div>
                      <span style={{ transform: "rotate(-40deg)" }}>D</span>
                      <span style={{ transform: "rotate(-30deg)" }}>e</span>
                      <span style={{ transform: "rotate(-20deg)" }}>m</span>
                      <span style={{ transform: "rotate(-10deg)" }}>o</span>
                      <span style={{ transform: "rotate(0deg)" }}>c</span>
                      <span style={{ transform: "rotate(10deg)" }}>r</span>
                      <span style={{ transform: "rotate(20deg)" }}>a</span>
                      <span style={{ transform: "rotate(30deg)" }}>c</span>
                      <span style={{ transform: "rotate(40deg)" }}>y</span>
                    </div>
                  </div>
                </div>
                <div onClick={()=>setCountryType([Base.AllCountryTypes[2].Type[0],Base.AllCountryTypes[2].Type[1],Base.AllCountryTypes[2].Type[2]])} className={(CountryType==0 && InitatedNation.CountryType==3) || CountryType[0]==3?"Selected Civil":"Civil"}>
                  <div>
                  <div>
                      <span style={{ transform: "rotate(-35deg)" }}>R</span>
                      <span style={{ transform: "rotate(-25deg)" }}>e</span>
                      <span style={{ transform: "rotate(-15deg)" }}>p</span>
                      <span style={{ transform: "rotate(-5deg)" }}>u</span>
                      <span style={{ transform: "rotate(5deg)" }}>b</span>
                      <span style={{ transform: "rotate(15deg)" }}>l</span>
                      <span style={{ transform: "rotate(25deg)" }}>i</span>
                      <span style={{ transform: "rotate(35deg)" }}>c</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Options">
                <div onClick={()=>setGunControlType([Base.AllGunControlTypes[0].Type[0],Base.AllGunControlTypes[0].Type[1],Base.AllGunControlTypes[0].Type[2]])} className={( GunControlType==0 && InitatedNation.GunControlType==1) || GunControlType[0]==1?"Selected Guns":"Guns"}>
                  <div>
                    <div>
                      <span style={{ transform: "rotate(-40deg)" }}>T</span>
                      <span style={{ transform: "rotate(-30deg)" }}>o</span>
                      <span style={{ transform: "rotate(-20deg)" }}>t</span>
                      <span style={{ transform: "rotate(-10deg)" }}>a</span>
                      <span style={{ transform: "rotate(0deg)" }}>l</span>
                      <span style={{ transform: "rotate(10deg)" }}></span>
                      <span style={{ transform: "rotate(20deg)" }}>b</span>
                      <span style={{ transform: "rotate(30deg)" }}>a</span>
                      <span style={{ transform: "rotate(40deg)" }}>n</span>
                    </div>
                  </div>
                </div>
                <div onClick={()=>setGunControlType([Base.AllGunControlTypes[1].Type[0],Base.AllGunControlTypes[1].Type[1],Base.AllGunControlTypes[1].Type[2]])} className={( GunControlType==0 && InitatedNation.GunControlType==2) || GunControlType[0]==2?"Selected Guns":"Guns"}>
                  <div>
                    <div>
                        <span style={{ transform: "rotate(-30deg)" }}>L</span>
                        <span style={{ transform: "rotate(-20deg)" }}>i</span>
                        <span style={{ transform: "rotate(-10deg)" }}>m</span>
                        <span style={{ transform: "rotate(0deg)" }}>i</span>
                        <span style={{ transform: "rotate(10deg)" }}>t</span>
                        <span style={{ transform: "rotate(20deg)" }}>e</span>
                        <span style={{ transform: "rotate(30deg)" }}>d</span>
                      </div>
                    </div>
                  </div>
                <div onClick={()=>setGunControlType([Base.AllGunControlTypes[2].Type[0],Base.AllGunControlTypes[2].Type[1],Base.AllGunControlTypes[2].Type[2]])} className={( GunControlType==0 && InitatedNation.GunControlType==3) || GunControlType[0]==3?"Selected Guns":"Guns"}>
                  <div>
                    <div>
                        <span style={{ transform: "rotate(-40deg)" }}>U</span>
                        <span style={{ transform: "rotate(-30deg)" }}>n</span>
                        <span style={{ transform: "rotate(-20deg)" }}>l</span>
                        <span style={{ transform: "rotate(-10deg)" }}>i</span>
                        <span style={{ transform: "rotate(0deg)" }}>m</span>
                        <span style={{ transform: "rotate(10deg)" }}>i</span>
                        <span style={{ transform: "rotate(20deg)" }}>t</span>
                        <span style={{ transform: "rotate(30deg)" }}>e</span>
                        <span style={{ transform: "rotate(40deg)" }}>d</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Options">
                <div onClick={()=>setAllianceType([Base.AllAllianceType[0].Type[0],Base.AllAllianceType[0].Type[1],Base.AllAllianceType[0].Type[2]])} className={( AllianceType==0 && InitatedNation.AllianceType==1) || AllianceType[0]==1?"Selected Allies":"Allies"}>
                  <div>
                  <div>
                      <span style={{ transform: "rotate(-15deg)" }}>S</span>
                      <span style={{ transform: "rotate(-5deg)" }}>o</span>
                      <span style={{ transform: "rotate(5deg)" }}>l</span>
                      <span style={{ transform: "rotate(15deg)" }}>o</span>
                  </div>
                  </div>
                </div>
                <div onClick={()=>setAllianceType([Base.AllAllianceType[1].Type[0],Base.AllAllianceType[1].Type[1],Base.AllAllianceType[1].Type[2]])} className={( AllianceType==0 && InitatedNation.AllianceType==2) || AllianceType[0]==2?"Selected Allies":"Allies"}>
                  <div>
                    <div>
                      <span style={{ transform: "rotate(-25deg)" }}>L</span>
                      <span style={{ transform: "rotate(-15deg)" }}>e</span>
                      <span style={{ transform: "rotate(-5deg)" }}>a</span>
                      <span style={{ transform: "rotate(5deg)" }}>g</span>
                      <span style={{ transform: "rotate(15deg)" }}>u</span>
                      <span style={{ transform: "rotate(25deg)" }}>e</span>
                    </div>
                  </div>
                </div>
                <div onClick={()=>setAllianceType([Base.AllAllianceType[2].Type[0],Base.AllAllianceType[2].Type[1],Base.AllAllianceType[2].Type[2]])} className={( AllianceType==0 && InitatedNation.AllianceType==3) || AllianceType[0]==3?"Selected Allies":"Allies"}>
                  <div>
                    <div>
                      <span style={{ transform: "rotate(-25deg)" }}>T</span>
                      <span style={{ transform: "rotate(-15deg)" }}>r</span>
                      <span style={{ transform: "rotate(-5deg)" }}>e</span>
                      <span style={{ transform: "rotate(5deg)" }}>a</span>
                      <span style={{ transform: "rotate(15deg)" }}>t</span>
                      <span style={{ transform: "rotate(25deg)" }}>y</span>
                    </div>
                  </div>
                </div>
              </div>
            <div className="UpdateFundationalEvents Process-Button">
              <div className={IsReady?"Ready":"NoEvents"} onClick={IsReady?()=>(CountryType !==0?HandleEvent(["CountryType",...CountryType]):null,GunControlType !==0?HandleEvent(["GunControl",...GunControlType]):null,AllianceType !==0?HandleEvent(["Alliance",...AllianceType]):null):null}>
                  <div>{!IsReady? "Waiting for selection":"Process"}</div>
              </div>
            </div>
    </div>)
}