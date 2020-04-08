import { SET_SELECTED_MARKER } from "../constants/action_types";

// src/reducers/reports.js
const INITIAL_STATE = {
  selectedPlace: {},
};

function selectedPlaceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_SELECTED_MARKER": {
      console.log('selected place', action)
      return { selectedPlace: action.marker };
    }

    default:
      return state;
  }
}
export default selectedPlaceReducer;
