import { combineReducers } from 'redux';
import sessionReducer from './session';
import placesReducer from './places';
import selectedPlaceReducer from './selectedPlace';
const rootReducer = combineReducers({
  sessionState: sessionReducer,
  placesState: placesReducer,
  selectedPlaceState: selectedPlaceReducer
});
export default rootReducer;
