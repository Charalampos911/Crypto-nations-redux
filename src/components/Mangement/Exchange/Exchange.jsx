import React, { useState,useRef,useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { BiLoaderCircle } from "react-icons/bi";

import { HiMiniMinusSmall } from "react-icons/hi2";
import { BiDownArrow } from "react-icons/bi";
import { HiSelector } from "react-icons/hi";
import { TiInfoOutline } from "react-icons/ti";
import { UpdateProperty,ExchangeCoinAtoCoinB,SellOtherHolding} from '../../../Redux/features/PortfolioReducer';

export default function Exchange(props) {
    
   const [ActiveTab, setActiveTab] = useState(0);

   const [CoinA, setCoinA] = useState(null);  
   const [ForSaleAmount, setForSaleAmount] = useState(null);  //Used in Selling orders
   const [AmountA, setAmountA] = useState(null);  //Used in Exchanges
   const [ValuationA, setValuationA] = useState(null); 

   const [CoinB, setCoinB] = useState(null); 
   const [AmountB, setAmountB] = useState(null); 
   const [ValuationB, setValuationB] = useState(null); 

   const [SelectingA, setSelectingA] = useState(null); 

   const [SelectingB, setSelectingB] = useState(null); 
   const [TempA, SetTempA] = useState(0); 


   const Nation=useSelector((state) => state.Nation);
   const Portfolio=useSelector((state) => state.Portfolio);
   const dispatch = useDispatch();

    const SellCoinA=()=>{
        if(CoinA.Id==Nation.CurrentCountry.Id){
            dispatch(UpdateProperty(["+",Nation.CurrentCountry.Id,'ForSaleAmount',ForSaleAmount,"MyCoin"]))
        }
        if(CoinA.Id!==Nation.CurrentCountry.Id){
            dispatch(SellOtherHolding([Nation.CurrentCountry.Id,CoinA.Id,ForSaleAmount]))
        }
        setActiveTab(1)
        setCoinA(null)
        setForSaleAmount(null)
    }
    const PrepareExchange=(AmountA,CoinA,CoinB,Nation,Portfolio)=>{

        var CoinAorigin = Nation.InitiatedCountries.find((item)=>item.Id == CoinA.Id)
        var CoinAoriginalPortfolio = Portfolio.Portfolios.find((item)=>item.MyCoin.Id == CoinA.Id)
        var CoinBorigin = Nation.InitiatedCountries.find((item)=>item.Id == CoinB[0]) //CoinB ===> [product.Id,product.MyCoin]
        var CoinBoriginalPortfolio = Portfolio.Portfolios.find((item)=>item.MyCoin.Id == CoinB[0])
        const cryptoA = [AmountA, CoinAoriginalPortfolio.MyCoin.Inflation, CoinAorigin.InternationalStanding]; // [amount, inflation, prestige]
        const cryptoB = [CoinBoriginalPortfolio.MyCoin.Inflation, CoinBorigin.InternationalStanding];     // [inflation, prestige]
        console.clear();
        console.log("AmountA==",AmountA);
        console.log("CoinA==",CoinA);
        console.log("CoinB==",CoinB);
        console.log("CoinAorigin==",CoinAorigin);
        console.log("CoinAoriginalPortfolio==",CoinAoriginalPortfolio);
        console.log("CoinBorigin==",CoinBorigin)
        console.log("CoinBoriginalPortfolio==",CoinBoriginalPortfolio)

        console.log("cryptoA==",cryptoA)
        console.log("cryptoB==",cryptoB)
        const [valuationA,valuationB,amountB] = tradeCrypto(cryptoA, cryptoB);
        setAmountB(amountB)
        setAmountA(AmountA)
        setValuationA(valuationA)
        setValuationB(valuationB)

    }
    var UserPortfolio   = Portfolio.Portfolios.find((item)=>item.Id == Nation.CurrentCountry.Id);
    var OthersPortfolio = Portfolio.Portfolios.filter(
        (item) => item.Id !== Nation.CurrentCountry.Id
      );
    const TradeCoinAtoCoinB=(AmountA,AmountB,CoinA,CoinB,Nation,Portfolio)=>{
        dispatch(ExchangeCoinAtoCoinB(
            [
                Nation,AmountA,AmountB,CoinA,CoinB
            ]))
    }
    const AllClear=(X)=>{

        setAmountA(null)
        setAmountB(null)
        setValuationA(null)
        setValuationB(null)
        
        if(X=="AB"){
            SetTempA(0)
            setCoinA(null) 
            setCoinB(null)
            // setValuationA(null)
            // setValuationB(null)
        }
    }
    var MyCoin = UserPortfolio.MyCoin;
   return (
<>

        {ActiveTab==0?<label>MARKET</label>:null}
        {ActiveTab==1?<label>PORTFOLIO</label>:null}
        {ActiveTab==10?<label>SELL</label>:null}
        {ActiveTab==2?<label>OWN ORDERS</label>:null}
        {ActiveTab==3?<label>GLOBAL ORDERS</label>:null}
        {ActiveTab==4?<label>EXCHANGE</label>:null}
        <div className="Market">
        <div className="ChangeSelection" onClick={()=>ActiveTab==10?(setActiveTab(1),setCoinA(null)):ActiveTab==0?props.ChangeSelection():setActiveTab(0)}><FaArrowLeft /></div>
            <div>
                {ActiveTab==0?
                <>
                <div className="Main-button" onClick={()=>setActiveTab(1)}>PORTFOLIO</div>
                <div className="Main-button" onClick={()=>setActiveTab(2)}>OWN ORDERS</div>
                <div className="Main-button" onClick={()=>setActiveTab(3)}>GLOBAL ORDERS</div>
                <div className="Main-button" onClick={()=>(setActiveTab(4),setCoinA(null))}>EXCHANGE</div>
                </>
                :null}

                {ActiveTab==1?
                <>
                <div className="Portfolio">
                    {UserPortfolio.MyCoin.HoldingAmount>0?
                        <div className={CoinA && CoinA.Id==UserPortfolio.MyCoin.Id?'Selected':''} onClick={()=>setCoinA(UserPortfolio.MyCoin)}>
                            <div> {UserPortfolio.MyCoin.HoldingAmount} <HiMiniMinusSmall /> {UserPortfolio.MyCoin.Acro}</div>
                        </div>
                        :null}                            {UserPortfolio.OtherHolding.map((product,index) => (
                        <div className={CoinA && CoinA.Id==product.Id?'Selected':''}>
                            <div onClick={()=>setCoinA(product)}> {product.HoldingAmount} {product.Acro}</div>
                        </div> 
                    ))}
                </div>
                {CoinA?
                <div className="Main-button" onClick={()=>setActiveTab(10)}>Sell</div>
                :null}
                </>
                :null}
                {ActiveTab==10?
                <div>
                    <div>
                            <input type="text" maxlength="4" value={ForSaleAmount}
                            onChange={(e) => setForSaleAmount(Number(e.target.value)) }/> {"/ "+CoinA.HoldingAmount +" "+ CoinA.Acro}
                    </div>
                    <div className="Process">
                        <div className={ForSaleAmount>0?"Ready":"NoEvents"} onClick={ForSaleAmount>0?()=>SellCoinA():null}>
                            <div>{!ForSaleAmount>0? "Waiting for amount" :"Process"}</div>
                        </div>
                    </div>
                </div>
                :null}
                



                
                {ActiveTab==2?
                <div className='OwnSellOrders'>
                        {UserPortfolio.MyCoin.ForSaleAmount>0?
                        <div>
                            <div>
                            <div>{UserPortfolio.MyCoin.Name}</div>
                            <div>{UserPortfolio.MyCoin.ForSaleAmount} 
                                 <HiMiniMinusSmall /> 
                                 {UserPortfolio.MyCoin.Acro}
                            </div>
                            </div>
                        </div>
                        :null}
                        {UserPortfolio.OtherHolding.map((HoldingsForSale) => (
                            <React.Fragment key={HoldingsForSale.Id}>
                            {HoldingsForSale.ForSaleAmount > 0 ? 
                                <div>
                                    <div>
                                    <div>{HoldingsForSale.Name}</div><div>{HoldingsForSale.ForSaleAmount} {HoldingsForSale.Acro}</div>
                                    </div>
                                </div>
                            :null}
                            </React.Fragment>
                        ))}
                    
                    {/* :"You are not selling at the time"} */}
                </div>
                :null}
                {ActiveTab==3?
                <div className='GlobalSellOrders OwnSellOrders'>
                    {OthersPortfolio && OthersPortfolio.map((product) => (
                        <React.Fragment key={product.MyCoin.Id}>
                        {product.MyCoin.ForSaleAmount> 0 ? (
                            <div 
                            // className={CoinB && CoinB[0].Id==product.Id?'Selected':''}
                            >
                            <div 
                            // onClick={() => setCoinB([product.Id,product.MyCoin])}
                            >
                                <div>
                                    {Nation.InitiatedCountries.find((item)=>item.Id == product.Id).Name}
                                     - 
                                     {product.MyCoin.Name}</div>
                                <div>
                                    {product.MyCoin.ForSaleAmount
                                    //  - product.MyCoin.ForeignHolding
                                     } {product.MyCoin.Acro}
                                </div>
                            </div>
                            </div>
                        ) : (
                            null
                        )}

                        {product.OtherHolding.map((HoldingsForSale) => (
                            <React.Fragment key={HoldingsForSale.Id}>
                            {HoldingsForSale.ForSaleAmount > 0 ? (
                                <div 
                                // className={CoinB && CoinB[1]==product.Id && CoinB[1].Id==HoldingsForSale.Id?'Selected':''}
                                >
                                <div 
                                // onClick={() => setCoinB([HoldingsForSale.Id,HoldingsForSale])}
                                >
                                    <div>
                                    {Nation.InitiatedCountries.find((item)=>item.Id == product.Id).Name}
                                    - 
                                        {HoldingsForSale.Name}</div>
                                    <div>
                                        {HoldingsForSale.ForSaleAmount} {HoldingsForSale.Acro}
                                    </div>
                                </div>
                                </div>
                            ) : (
                                null
                            )}
                            </React.Fragment>
                        ))}
                        </React.Fragment>
                    ))}
                </div>
                :null}






                {ActiveTab==4?
                <div className="CoinToCoin">
                    <div>
                        <div className='Drop Front'>
                        {SelectingA?<HiSelector onClick={()=>setSelectingA(!SelectingA)}/>:<BiDownArrow onClick={()=>setSelectingA(!SelectingA)}/>}
                        <div className={CoinA?'Selected':'Placeholder'} onClick={()=>(setSelectingA(!SelectingA),setSelectingB(false),console.log("CoinA=",CoinA))}>
                                <div >{CoinA?<>{Number(CoinA.HoldingAmount).toFixed(5)} <HiMiniMinusSmall /> {CoinA.Acro}</>:"Portfolio"}</div>
                        </div> 
                        <div className={SelectingA?"Selecting":""} >
                        <div>
                        {UserPortfolio.MyCoin.HoldingAmount>0?
                        <div className={CoinA && CoinA.Id==UserPortfolio.MyCoin.Id?'CurrentlySelected':''} onClick={()=>(AllClear("AB"),setCoinA(UserPortfolio.MyCoin),setSelectingA(false))}>
                                <div > {Number(UserPortfolio.MyCoin.HoldingAmount).toFixed(5) } <HiMiniMinusSmall /> {UserPortfolio.MyCoin.Acro}</div>
                        </div> 
                        :null}  
                        {UserPortfolio.OtherHolding && UserPortfolio.OtherHolding.map((product,index) => (
                            <>
                            {product.HoldingAmount>0?
                            <div className={CoinA && CoinA.Id==product.Id?'CurrentlySelected':''} onClick={()=>(AllClear("AB"),setCoinA(product),setSelectingA(false))}>
                                <span>{index+1}</span>
                                <div > {Number(product.HoldingAmount).toFixed(5)} <HiMiniMinusSmall /> {product.Acro}</div>
                            </div> 
                            :null}
                            </>
                         ))}
                         </div>
                         </div>
                        </div>


                        <div className='Drop Large'>
                        {SelectingB?<HiSelector onClick={()=>setSelectingB(!SelectingB)}/>:<BiDownArrow onClick={()=>setSelectingB(!SelectingB)}/>}
                        <div className={CoinB?'Selected':'Placeholder'} onClick={()=>(setSelectingB(!SelectingB),setSelectingA(false))}>
                        {CoinB?
                            <div className='OtherSellOrders '> 
                                <div>
                                    {CoinB[1].Name}
                                </div>
                                <div>
                                    {Number(CoinB[1].ForSaleAmount).toFixed(5)} &nbsp; 
                                    {CoinB[1].Acro}
                                </div>
                            </div>
                            :"Global orders"}
                        </div> 
                        <div className={SelectingB?"Selecting":""}>
                        <div>
                        {OthersPortfolio && OthersPortfolio.map((product,index) => (
                            <>
                            {product.MyCoin.ForSaleAmount>0?
                            <div className={CoinB && CoinB[0].Id==product.MyCoin.Id?'CurrentlySelected':'AAA'} onClick={()=>(AllClear()
                            ,setCoinB([product.Id,product.MyCoin])
                                ,setSelectingB(false))}>
                                <span>{index+1}</span>
                                <div className='OtherSellOrders'> 
                                    <div>
                                        {product.MyCoin.Name}
                                        {/* <HiMiniMinusSmall />  */}
                                        {/* {product[2]} */}
                                    </div>
                                    <div>
                                        {Number(product.MyCoin.ForSaleAmount).toFixed(5)} &nbsp; 
                                        {product.MyCoin.Acro}
                                    </div>
                                </div>

                            </div> 
                            :null}
                        
                        {product.OtherHolding.map((HoldingsForSale,index) => (
                            <>
                            {HoldingsForSale.ForSaleAmount>0?
                            <div className={CoinB && CoinB[0].Id==HoldingsForSale.Id?'CurrentlySelected':''} onClick={()=>(AllClear(),setCoinB([product.Id,HoldingsForSale]),setSelectingB(false))}>
                                <span>{index+1}</span>
                                <div className='OtherSellOrders'> 
                                    <div>
                                        {Nation.InitiatedCountries.find((item)=>item.Id == product.Id).Name}
                                        {/* <HiMiniMinusSmall />  */}
                                        {/* {product[2]} */}
                                    </div>
                                    <div>
                                        {Number(HoldingsForSale.ForSaleAmount).toFixed(5)} &nbsp; 
                                        {HoldingsForSale.Acro}
                                    </div>
                                </div>

                            </div> 
                            :null}
                            </>
                         ))}
                         </>
                        ))}
                         </div>
                         
                         </div>
                        </div>
                    </div>


                    {CoinA && CoinB?
                    <div className='Exchange-Phase-AB'>
                        <div>
                            <div>Amount:</div> 
                            <div>Price:</div>
                            <div>Amount:</div>
                            <div>Price:</div>
                        </div> 
                        <div>     
                            <div>
                                <input 
                                    type="text" 
                                    style={{minWidth:63}}
                                    placeholder={0}
                                    value={TempA}
                                    onChange={(e) => (e.target.value.length==0?(AllClear(),SetTempA(null)):SetTempA(e.target.value),PrepareExchange(Number(e.target.value),CoinA,CoinB,Nation,Portfolio)) } 
                                /> {CoinA.Acro}
                            </div>
               
                             <div style={{widtminWidthh:67}}>{(Number(ValuationA)/100).toFixed(5)}</div>
                
                             <div><div style={{minWidth:67,maxWidth:100,overflowY: 'hidden'}}>{AmountB}</div> {CoinB[1].Acro}</div>
                 
                             <div>{(Number(ValuationB)/100).toFixed(5)}</div>
                        </div>
                    </div>
                    :<div className='msg-0'><TiInfoOutline/> Please select assets to preceed</div>}
                    <div className="Process">
                        <div className={AmountB>0?"Ready":"NoEvents"} onClick={()=>AmountB?CoinA.Id == CoinB[1].Id?alert("Can not trade "+CoinA.name+" for "+ CoinB.name):TradeCoinAtoCoinB(AmountA,AmountB,CoinA,CoinB,Nation,Portfolio):null}>
                            <div>{!AmountB>0? "Waiting for amount":"Process"}</div>
                        </div>
                    </div>
                </div>
                :null}
            </div>
        </div>
    </>
    )
}

function tradeCrypto
(cryptoA, cryptoB) {
    const [amountA, inflationA, prestigeA] = cryptoA; // Destructure CryptoA inputs
    const [inflationB, prestigeB] = cryptoB;         // Destructure CryptoB inputs

    // Helper function to calculate value based on inflation and prestige
    const calculateValue = (inflation, prestige) => {
        const inflationImpact = 1 - (inflation / 1000);
        const prestigeImpact = (prestige - 2070) / (2820 - 2070);
        return inflationImpact * prestigeImpact;
    };

    // Calculate valuations
    const valuationA = calculateValue(inflationA, prestigeA);
    const valuationB = calculateValue(inflationB, prestigeB);

    // Total value of CryptoA
    const totalValueA = amountA * valuationA;

    // Amount of CryptoB received
    const amountB = totalValueA / valuationB;

    // Return the results
    return [valuationA,
        valuationB,
        amountB]
    ;
}