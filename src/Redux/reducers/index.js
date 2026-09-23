// reducers/index.js
import { combineReducers } from 'redux';

import BaseReducer from '../features/BaseReducer';
import NationReducer from '../features/NationReducer';
import PortfolioReducer from '../features/PortfolioReducer';

// Import other slices if you have them

const rootReducer = combineReducers({

  Base: BaseReducer,
  Nation: NationReducer,
  Portfolio: PortfolioReducer,

  // Add other reducers here
});

export default rootReducer;