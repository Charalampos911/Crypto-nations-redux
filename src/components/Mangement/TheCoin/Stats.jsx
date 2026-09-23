import React, { useState,useRef,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { UpdateProperty,calculateProperties} from '../../../Redux/features/PortfolioReducer';
import { FaArrowLeft } from "react-icons/fa";
export default function Stats(props) {
    const Nation=useSelector((state) => state.Nation);
    const Portfolio=useSelector((state) => state.Portfolio);
    // [0]=owner, 
    // [1]=acro,
    // [2]=coinName,
    // [3]=holdingAmount
    // [4]=forSaleAmount,
    // [5]=foreignHolding,
    // [6]=inflationRate,
    // [7]=inCirculation
    // [8]=availableReserves,
    // [9]=maxSupply,
    // [10]=reservedForPayments,
    // [11]=bankingDept,
    // [12]=investmentDept
    var MyCoin = Portfolio.Portfolios.find(
        (item) => item.Id === Nation.CurrentCountry.Id
      ).MyCoin;
   return (
    <>
    <div className="ChangeSelection" onClick={()=>props.ChangeSelection()}><FaArrowLeft /></div>
       <div className="Status">
        <div>
            <label>STATUS</label>
            <div>
                <div>
                    <span>Coin inflation:</span>
                    <span>Coin Reserves:</span> 
                    <span>Total supply:</span>
                    <span>Current balance:</span>
                    <span>Into circulation:</span> 
                    <span>Reserved for expenses:</span> 
                    <span>Loaned to Banks:</span> 
                    <span>Loaned to Investors:</span>
                    <span>Up for sale:</span>
                    <span>Held by foreigners:</span> 
                </div>
                <div>
                    <span>{MyCoin.Inflation}</span> 
                    <span>{MyCoin.AvailableReseves}</span> 
                    <span>{MyCoin.MaxSupply}</span> 
                    <span>{MyCoin.HoldingAmount}</span> 
                    <span>{MyCoin.IniCirculation}</span> 
                    <span>{MyCoin.ReservedForPayments}</span> 
                    <span>{MyCoin.BankingDept}</span> 
                    <span>{MyCoin.InvestmentDept}</span> 
                    <span>{MyCoin.ForSaleAmount}</span> 
                    <span>{MyCoin.ForeignHolding}</span> 

                </div>
            </div>
        </div>
       </div>
    </>
)
}
