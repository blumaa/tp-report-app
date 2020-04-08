import React from "react";
import MapContainer from "../MapContainer/MapContainer";
import SearchBox from "../SearchBox/SearchBox";

import axios from "axios";

import { useDispatch } from "redux-react-hook";
import * as actions from "../../constants/action_types";

import Geocode from "react-geocode";
import Map from '../MapContainer/MapTest'

const NonAuthHome = () => {
  const dispatch = useDispatch();


  const geoCodeLocation = (loc) => {
    Geocode.setApiKey("AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ");

    Geocode.fromAddress(loc).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
        // this.fetchMarkers(lat, lng);
        const locale = {lat, lng}
       
        dispatch({ type: actions.SET_MAP_CENTER, locale });
        dispatch({ type: actions.CLEAR_PLACES });
        
        // this.setState({
        //   locationLat: lat,
        //   locationLng: lng,
        // });
        fetchPlaces(loc, lat, lng)
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const getPlaceData = async (place) => {
    // console.log(place)
    const requestBody = {
      query: `
      query FetchPlace($googleId: String!){
        place(googleId: $googleId){
          name
          googleId
          reports{
            id
            itemName
            googleId
            dateTime
            status
          }
        }
      }
      `,
      variables: { googleId: `${place.id}` },
    };

    const { data } = await axios.post(
      "http://localhost:8000/graphql",
      requestBody
    );
    // console.log(data.data.place);
    return data.data.place;
  };

  const triggerLocationChange = (location) => {
    geoCodeLocation(location);
  }

  const fetchPlaces = async (location, lat, lng) => {

    const headers = {
      "X-Requested-With": "XMLHttpRequest",
    };
    const uri = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=supermarket&key=AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ`;
    // console.log("uri", uri);
    const response = await fetch(uri, headers);
    const json = await response.json();
    // console.log("map data from json", json.results);

    
    json.results.forEach(element => {
      // console.log(element)
      getPlaceData(element).then((dbPlace) => {
        // console.log(dbPlace)
          if (dbPlace === null) {
            // console.log("hi");
            dispatch({ type: actions.ADD_PLACE, place: element });
            
            // newMarkers.push(element)
          } else {
            let newPlace;
            
            newPlace = { ...element, reports: dbPlace.reports };
            dispatch({ type: actions.ADD_PLACE, place: newPlace });
            // console.log(newPlace);
            // newMarkers.push(newPlace)
            // console.log(newMarkers)
          }
      })
    });
    
  };
  return (
    <div id="main">
      <SearchBox changeLocation={triggerLocationChange} />
      <MapContainer />
    </div>
  );
};
export default NonAuthHome;
