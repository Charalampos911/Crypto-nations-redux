import React, { useState,useRef,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { UpdateNationParams } from '../../Redux/features/NationReducer';
import { IoSave } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
export default function TheGreatSlider(props) {

    const Base=useSelector((state) => state.Base); 
    const Nation=useSelector((state) => state.Nation); 
    const dispatch = useDispatch();

    const [Gains, setGains] = useState(0);
    const [value, setValue] = useState(0);
    const [loading, setloading] = useState(false);
    const [loadingItem, setLoadingItem] = useState(null);
    
    var InitatedNation = Nation.InitiatedCountries.find(
        (item) => item.Id === Nation.CurrentCountry.Id
    )

    const createIndexedObject = (data) => {
        const indexedObject = {};
      
        Object.keys(data).forEach(category => {
          data[category].forEach(item => {
            indexedObject[`${category}${item.Class}`] = 0;
          });
        });
      
        return indexedObject;
      };
    const [TempVals, setTempVals] = useState(createIndexedObject(Base.InitialParams.Default.NationParams));

    const handleChange = (event,Items,Category,index) => {
        const newValue = event.target.value<100?Number(event.target.value)+1:Number(event.target.value);
        setTempVals(prevState => ({
            ...prevState,
            [Category+index]: newValue
          }));
        let newGains = 0;

        // Loop through the items and calculate the gains
        Items.set.forEach((item) => {
            if (item.MinLimit <= newValue && newValue <= item.MaxLimit) {
                newGains = item.NewPoints;
            }
        });

        setGains(newGains);
        setValue(newValue);
    };

    const getColor = (NewPoints) => {
        if (NewPoints < 100) return 'red';
        if (NewPoints === 100) return 'orange';
        return 'green';
    };
  if(props.params){
    const SaveVal = (local, thisItem) => {
        
        // Validate inputs
        if (!local || !thisItem) {
            console.warn("Invalid parameters:", { local, thisItem });
            return;
        }
    
        // Ensure InitatedNation and NationParams are properly structured
        const nationParams = InitatedNation?.Slider?.NationParams?.[local.id];
        if (!nationParams) {
            console.error("Invalid InitatedNation structure for id:", local.id);
            return;
        }
    
        const matchedItem = nationParams.find(item => item.Class === thisItem.Class);
    
        if (matchedItem) {
            dispatch(UpdateNationParams([local.id, thisItem.Class, value, Gains]));
        } else {
            console.warn(`No match found for Class: ${thisItem.Class}`);
        }
    };


  

    return (
        <>
        <div className="ChangeSelection" onClick={()=>props.ChangeSelection()}><FaArrowLeft /></div>
        <label>{props.Categ}</label>
            {props.params.Type=="A"?
             <>
                {props.params.Items.map((Items, index) => (
                    <div id={props.id} className="Slider-cont Type-A " style={{ pointerEvents: props.params.Enabled ? 'auto' : 'none' }}>
                    <div className="InfoLabel">{Items.Name}</div>
                    <div className="TheGreatSlider">
                        <div>
                            <input   
                                style={{  
                                    border: 'none',  // Remove all borders
                                    borderBottomWidth: '0px',  // Set the width for the bottom border
                                    borderBottomStyle: 'solid',  // Make the bottom border solid
                                    borderImage: `linear-gradient(to right, 
                                    ${getColor(Items.set[0].NewPoints)} ${Items.set[0].MinLimit}%, 
                                    ${getColor(Items.set[0].NewPoints)} ${Items.set[0].MaxLimit}%, 
                                    ${getColor(Items.set[1].NewPoints)} ${Items.set[1].MinLimit}%, 
                                    ${getColor(Items.set[1].NewPoints)} ${Items.set[1].MaxLimit}%, 
                                    ${getColor(Items.set[2].NewPoints)} ${Items.set[2].MinLimit}%, 
                                    ${getColor(Items.set[2].NewPoints)} ${Items.set[2].MaxLimit}%) 1 / 0 0 2px 0`
                                }} 
                                type="range"
                                min="0"
                                max="100"
                                
                                defaultValue={Items.Value}
                                // value={value}
                                onChange={(e)=>handleChange(e,Items,props.id,(index+1))}
                            />
                            <div className="btnSave" onClick={()=>TempVals[props.id+(index+1)] && TempVals[props.id+(index+1)] != Items.Value?SaveVal(props,Items):console.log('User attempt to update before choosing')}><div><IoSave /></div></div>
                            {/* <div className="val Golden Name">{Items.Name}</div> */}
                            <div className="val Golden value">{Items.Value}&nbsp;%&nbsp;</div>
                            <div className="val Golden temp">{TempVals[props.id+(index+1)]==0?Items.Value:TempVals[props.id+(index+1)]}&nbsp;%</div>
                            <div className="val Golden ps">{Items.Gains}PS</div>
                        </div>
                        </div>
                    </div>
                    ))}
                </>
            :null}
            {props.params.Type=="B"?
                <>
                    {props.params.Items.map((Items, index) => (
                            <div id={props.id} className="Slider-cont Type-B " style={{ pointerEvents: props.params.Enabled ? 'auto' : 'none' }}>
                            <div className="InfoLabel">{Items.Name}</div>
                            <div className="TheGreatSlider">
                                <div>
                                    <input   
                                        style={{  
                                            border: 'none',  // Remove all borders
                                            borderBottomWidth: '0px',  // Set the width for the bottom border
                                            borderBottomStyle: 'solid',  // Make the bottom border solid
                                            borderImage: `linear-gradient(to right, 
                                            #ff6f6f ${Items.set[0].MinLimit}%, 
                                            red ${Items.set[0].MaxLimit}%, 
                                            orange ${Items.set[1].MinLimit}%, 
                                            orange ${Items.set[1].MaxLimit}%, 
                                            green ${Items.set[2].MinLimit}%, 
                                            #5dff5d ${Items.set[2].MaxLimit}%) 1 / 0 0 2px 0`
                                        }} 
                                        type="range"
                                        min="0"
                                        max="100"
                                        defaultValue={Items.Value}
                                        onChange={(e)=>handleChange(e,Items,props.id,(index+1))}
                                    />
                                    <div className="btnSave" onClick={()=>TempVals[props.id+(index+1)] && TempVals[props.id+(index+1)] != Items.Value?SaveVal(props,Items):console.log('User attempt to update before choosing')}><div><IoSave /></div></div>
                                    <div className="val Golden value">{Items.Value/10}</div>
                                    <div className="val Golden temp">{(value/10)}</div>
                                    <div className="val Golden ps">{Items.Gains}&nbsp;PS</div>
                                </div>
                            </div>
                        </div>   
                    ))}
                </>
            :null}
        </>
        )
    }
}