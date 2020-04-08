import { GET_PlACE, GET_PLACES } from '../constants/action_types';

// src/reducers/reports.js
const INITIAL_STATE = {
  allPlaces: [],
  selectedPlace: {},
  mapCenter: {lat: 52.536228, lng:13.42606}
};

function placesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_PLACES": {
      // console.log(action)
      // return { authUser: action.authUser, loading: false };
    }
    case "SET_MAP_CENTER": {
      // console.log(action.locale)
      return {
        ...state,
        mapCenter: action.locale
      }
      // return { authUser: action.authUser, loading: false };
    }
    case "ADD_PLACE": {
      // console.log(action.place)
      return {
        ...state,
        allPlaces: [...state.allPlaces, action.place]
      };
    }
    case "CLEAR_PLACES": {
      // console.log(action.place)
      return {
        ...state,
        allPlaces: []
      };
    }
    case "ADD_REPORT": {
      // console.log(action.report)
      // console.log('old state', state.allPlaces)
      let place = state.allPlaces.find(place=> {
        return place.id === action.marker.id
      })
      // console.log('ye olde place', place)
      let newPlace 
      newPlace = !place.reports ? newPlace = { ...place, reports:  [action.report.data.addReport]} : newPlace = {...place, reports: [...place.reports, action.report.data.addReport]}
      // place.reports.length > 0 ? newPlace.reports = [...place.reports, action.report.data.addReport] : newPlace.reports = [action.report.data.addReport] 
      // console.log('ye neweth place', newPlace/)
      const newAllPlaces = state.allPlaces.filter(place=>{
        return place.id != action.marker.id
      })
      // console.log('all the new places', newAllPlaces)
      return {
        ...state,
        allPlaces: [...newAllPlaces, newPlace]
      };
    }
    default: return state;
  }
}
export default placesReducer;
