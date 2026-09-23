import React, { useState,useRef,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { SiBitcoincash } from "react-icons/si";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import { GoInfo } from "react-icons/go";
import { RiInformationOffLine } from "react-icons/ri";

import { AddInitiatedCountry} from '../../Redux/features/NationReducer';
import {InitiatePortfolio } from '../../Redux/features/PortfolioReducer';

export default function NationInitiationForm(props) { // Completed!!!
  const state=useSelector((state) => state);
  const Base=useSelector((state) => state.Base); 
  const Nation=useSelector((state) => state.Nation); 
  const dispatch = useDispatch(); 

  const [info, setInfo] = useState(false);
  
  const [CountryType, setCountryType] = useState(0);
  const [GunControlType, setGunControlType] = useState(0);
  const [AllianceType, setAllianceType] = useState(0);

  var IsReady = CountryType!==0 && GunControlType !=0 && AllianceType!=0;

  const ReadyToInitiate=( Base,Country,CountryType,GunControlType,AllianceType)=>{
    dispatch(AddInitiatedCountry([{
      CountryType:CountryType[0],
      CountryName:CountryType[1],
      CountryGains:CountryType[2],
      GunControlType:GunControlType[0],
      GunControlName:GunControlType[1],
      GunControlGains:GunControlType[2],
      AllianceType:AllianceType[0],
      AllianceName:AllianceType[1],
      AllianceGains:AllianceType[2],
    },{
      NationParams: Base.InitialParams.Default.NationParams
    }]))
    var CalcLocToken = Base.InitialParams.Default.Token;
    var CalcLocCoin = Base.InitialParams.Default.Coin;
    dispatch(InitiatePortfolio({
            Id: Country.Id, 
            MyToken:{
              Id: Country.Id,
              Acro: Country.TokenAcro,
              Name: Country.Token, 
              HoldingAmount:CalcLocToken.PrintedBalance-CalcLocToken.IniCirculation-CalcLocToken.ReservedForPayments,
              ForSaleAmount: 0, 
              ForeignHolding:0,
              Inflation: CalcLocToken.PrintedBalance,
              IniCirculation: CalcLocToken.IniCirculation,
              AvailableReseves:CalcLocToken.AvailableReseves,
              MaxSupply:CalcLocToken.MaxSupply,
              ReservedForPayments:CalcLocToken.ReservedForPayments,
              BankingDept:0,
              InvestmentDept:0,
            },
            MyCoin:{
              Id: Country.Id,
              Acro: Country.TokenAcro,
              Name: Country.Token,
              HoldingAmount:CalcLocCoin.PrintedBalance-CalcLocCoin.IniCirculation-CalcLocCoin.ReservedForPayments,
              ForSaleAmount: 0, 
              ForeignHolding:0,
              Inflation: 80,
              IniCirculation: CalcLocCoin.IniCirculation,
              AvailableReseves:CalcLocCoin.AvailableReseves,
              MaxSupply:CalcLocCoin.MaxSupply,
              ReservedForPayments:CalcLocCoin.ReservedForPayments,
              BankingDept:0,
              InvestmentDept:0,
            },
            OtherHolding:[]
    }))
  }

  return (
    <div className='NationInitiationForm'>
      
      <div className="NationInitiationFormInner">
      <div className="ChangeSelection" onClick={()=>props.ChangeSelection()}><FaArrowLeft /></div>
        <div className="FlagCont">
          <div className="Title">Create account</div>
          <div className="TopFlag">
            <div>
            <img src={Base.LoadedFlags[Nation.CurrentCountry.Id]} title='' /><div>{Nation.CurrentCountry.Name}</div>
              <div className='DesInfo'>{!info?
                <GoInfo className='info' onClick={()=>setInfo(true)}/>
                :
                <RiInformationOffLine className='uninfo' onClick={()=>setInfo(false)}/>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="InitiationExplanations">

        
        <div className={info?"TheMainCrypto ShowInfo":"TheMainCrypto HideInfo"}>
          <div>
          <div className="Acro"><SiBitcoincash />{Nation.CurrentCountry.TokenAcro}</div>
          <div className="Information">
            <p>The main national crypto of {Nation.CurrentCountry.Name} will be named the "{Nation.CurrentCountry.Token} COIN"</p>
            <p>This coin, will be used by everyone for all daily transactions</p>
          </div>
          <div className="Information">
            <p>The support national crypto of {Nation.CurrentCountry.Name} will be named the "{Nation.CurrentCountry.Token} TOKEN"</p>
            <p>This token, will be used by poorer people for all basic needs like healthcare, education and groceries</p>
          </div>
          <div className="ExtraMessage"><BsFillQuestionDiamondFill />Default parameters will be applied. They can be changed latter on!</div>
          </div>
        </div>
        <div className="InitiaFixedlParams">
          <div style={{position:"relative"}}>
            <div className="Param-1">
              <div className="Options">

                <div onClick={()=>setCountryType([Base.AllCountryTypes[0].Type[0],Base.AllCountryTypes[0].Type[1],Base.AllCountryTypes[0].Type[2]])} className={CountryType[0]==1?"Selected Civil":"Civil"}>
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

                <div onClick={()=>setCountryType([Base.AllCountryTypes[1].Type[0],Base.AllCountryTypes[1].Type[1],Base.AllCountryTypes[1].Type[2]])} className={CountryType[0]==2?"Selected Civil":"Civil"}>
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
                <div onClick={()=>setCountryType([Base.AllCountryTypes[2].Type[0],Base.AllCountryTypes[2].Type[1],Base.AllCountryTypes[2].Type[2]])} className={CountryType[0]==3?"Selected Civil":"Civil"}>
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
            </div>
            <div className="Param-2">
              <div className="Options">
                <div onClick={()=>setGunControlType([Base.AllGunControlTypes[0].Type[0],Base.AllGunControlTypes[0].Type[1],Base.AllGunControlTypes[0].Type[2]])} className={GunControlType[0]==1?"Selected Guns":"Guns"}>
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
                <div onClick={()=>setGunControlType([Base.AllGunControlTypes[1].Type[0],Base.AllGunControlTypes[1].Type[1],Base.AllGunControlTypes[1].Type[2]])} className={GunControlType[0]==2?"Selected Guns":"Guns"}>
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
                <div onClick={()=>setGunControlType([Base.AllGunControlTypes[2].Type[0],Base.AllGunControlTypes[2].Type[1],Base.AllGunControlTypes[2].Type[2]])} className={GunControlType[0]==3?"Selected Guns":"Guns"}>
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
            </div>
            <div className="Param-3">
              <div className="Options">
                <div onClick={()=>setAllianceType([Base.AllAllianceType[0].Type[0],Base.AllAllianceType[0].Type[1],Base.AllAllianceType[0].Type[2]])} className={AllianceType[0]==1?"Selected Allies":"Allies"}>
                  <div>
                  <div>
                      <span style={{ transform: "rotate(-15deg)" }}>S</span>
                      <span style={{ transform: "rotate(-5deg)" }}>o</span>
                      <span style={{ transform: "rotate(5deg)" }}>l</span>
                      <span style={{ transform: "rotate(15deg)" }}>o</span>
                  </div>
                  </div>
                </div>
                <div onClick={()=>setAllianceType([Base.AllAllianceType[1].Type[0],Base.AllAllianceType[1].Type[1],Base.AllAllianceType[1].Type[2]])} className={AllianceType[0]==2?"Selected Allies":"Allies"}>
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
                <div onClick={()=>setAllianceType([Base.AllAllianceType[2].Type[0],Base.AllAllianceType[2].Type[1],Base.AllAllianceType[2].Type[2]])} className={AllianceType[0]==3?"Selected Allies":"Allies"}>
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
            </div>
          </div>
        </div>
        <div className="InitiateTheNation">
          <div className={IsReady?"Ready":"NoEvents"} onClick={IsReady?()=>ReadyToInitiate(Base,Nation.CurrentCountry,CountryType,GunControlType,AllianceType):null}>
            <div>{!IsReady? "Waiting for selection" :"Process"}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );

}


