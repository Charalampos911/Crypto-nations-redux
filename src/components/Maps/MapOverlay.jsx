import React from 'react';
import mapImage from '../../Styling/images/svgs/all_maps.jpg'; 
import { useSelector, useDispatch } from "react-redux";
import { setCurrentCountry} from '../../Redux/features/NationReducer';

const MapOverlay = () => { // Completed!!!
  const state=useSelector((state) => state);
  const Base=useSelector((state) => state.Base); 
  const Nation=useSelector((state) => state.Nation); 
  const dispatch = useDispatch();

  return (
    <>
    <span className='Welcome'>THE CRYPTO NATIONS</span>
    <div className="map-container">
      <img src={mapImage} alt="World Map" className="map-image" />

    {/* PC view - hoverable svg map overlay */}
      <div className='svgCont PC'>
        <svg width="1920" height="1080">
        {state && Base && Base.Flags && Base.Flags.map((item) => (
          <g key={item.Id} className="CountrySpecificOverlay" onClick={()=>(dispatch(setCurrentCountry(item)))}>
          <title>{item.Name}</title>
          {item.Path && item.Path.map((Path) => (
              <path d={Path} />
            ))}
          </g>
        ))}
        </svg>
      </div>
    {/* PHONE view - Simple flatlist of country flags */}
      <div className='Phone'>
      {state && Base && Base.Flags && Base.Flags.map((item) => (
          <div key={item.Id} className="MobileCountryItem" onClick={()=>(dispatch(setCurrentCountry(item)))}>
            <div><img src={Base.LoadedFlags[item.Id]} title='' /></div>
            <div className='FancyFlagName'><div>{item.Name}</div></div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default MapOverlay;