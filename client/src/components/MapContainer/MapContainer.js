import React, { useCallback, useState, useMemo } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import MapMarker from "../MapMarker/MapMarker";
import gql from "graphql-tag";
import { createApolloFetch } from "apollo-fetch";
import { HttpLink } from "apollo-link-http";
import { execute, makePromise } from "apollo-link";

import { useMappedState } from "redux-react-hook";

import { useDispatch } from "redux-react-hook";
import * as actions from "../../constants/action_types";




const MapContainer = () => {
  const [lat, setLat] = useState(52.536228);
  const [lng, setLng] = useState(13.42606);
  const dispatch = useDispatch();

  const mapState = useCallback((state) => {
    return {
      places: state.placesState.allPlaces,
      mapCenter: state.placesState.mapCenter,
    };
  }, []);

  const { places, mapCenter } = useMappedState(mapState);

  const TempMarker = () => {
    // return <MapMarker locationInfo={locationInfo} />;
    
    return (
        <div id="init-map-message">
    <div id="init-map-message-text">User search bar to find toilet paper nearby.</div>
  </div>
    );
  };



  // console.log("check here", places, mapCenter);

  const MappedMarkers = places.map((marker) => {
    // console.log(marker);
    return (
      <MapMarker
        key={marker.id}
        lat={marker.geometry.location.lat}
        lng={marker.geometry.location.lng}
        marker={marker}
        
      />
    );
  });

  if (places < 1) {
    return (
      <div id="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ",
          }}
          center={{
            lat: mapCenter.lat,
            lng: mapCenter.lng,
          }}
          defaultZoom={14}
        >
          <TempMarker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    );
  } else {
    // console.log(lat, lng)
    return (
      <div id="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ",
          }}
          center={{
            lat: mapCenter.lat,
            lng: mapCenter.lng,
          }}
          defaultZoom={14}
        >
          {MappedMarkers}
        </GoogleMapReact>
      </div>
    );
  }
};

export default MapContainer;
