
import { useEffect, useState } from "react";
import ModernGreyStyling from "./Styling/ModernGreyStyling"; //Loading `ModernGrey`
import Flags from "./Styling/images/svgs/TableContext.json";
import LoadedFlags from "./Styling/images/ImageLoader"
import MapsRoom from "./components/Maps/MapsRoom"
import { setIsMobile,setFlags,setLoadedFlags} from './Redux/features/BaseReducer';
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from 'react-device-detect';

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setFlags(Flags))
    dispatch(setLoadedFlags(LoadedFlags()))
    dispatch(setIsMobile(isMobile))
  }, []);

  return (
    <>
      <MapsRoom State={state}/>
    </>
  );
}
export default App;