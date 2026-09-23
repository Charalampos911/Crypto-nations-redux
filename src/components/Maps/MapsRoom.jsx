import React, { useState,useRef,useEffect } from 'react';
import MapOverlay from './MapOverlay';
import { useSelector, useDispatch } from "react-redux";
import NationalManagementForm from '../Forms/NationalManagementForm';
import NationInitiationForm from '../Forms/NationInitiationForm'
import { setCurrentCountry } from '../../Redux/features/NationReducer';

export default function MapChart({State}) { 
  const state = useSelector((state) => state);
  const Nation=useSelector((state) => state.Nation);
  const dispatch = useDispatch();
  const handleChangeSelection=(e)=>{
    dispatch(setCurrentCountry(false))
  }
  var CurrentCountry = Nation.CurrentCountry;
  var CurrentCountryExists = Nation.InitiatedCountries.find((item)=>
    item.Id === CurrentCountry.Id
  )
    return (
      <div className='ProjectContainer'>
        {Nation.CurrentCountry===false?
        <div className='MapOutter'>
            <MapOverlay state={state}/>
        </div>
        :
        <div className="ManagementPanelsOutter">
            {CurrentCountryExists ?
              <NationalManagementForm 
                ChangeSelection={handleChangeSelection}
              />
              :
              <NationInitiationForm 
                ChangeSelection={handleChangeSelection} 
              />
            }
        </div>
        }
      </div>
    );
  }