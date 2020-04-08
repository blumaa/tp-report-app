import React, { Component, useCallback } from "react";
import { useMappedState } from "redux-react-hook";

const MapContainer2 = () => {
  

  const mapState = useCallback(
    (state) => ({
      places: state.placesState,
    }),
    []
  );

  const { places } = useMappedState(mapState);
  console.log(places)
  return <div>MainContainer</div>;
};

// class MapContainer2 extends Component {
//   // this component should be the container for the map and the list of markers
//   // this component should useQuery to fetch data
//   // fetch data is based on props.location
//   // first fetch from google maps api
//   // then, based on returned data (place.id), search backend for matches
//   // use spread operator to overlay backend data onto [markers, setMarkers] = useState([])

//   //option 2: fetch from google api here
//   //send data to map for display and list for display
//   // each report component does individual fetching to backend to check for reports

//   state = { markers: [], locationLat: 52.536228, locationLng: 13.42606 };

//   addReportToMarker = (report) => {
//     // find the corresponding marker

//     // add report to marker's reports array

//     // update state
//     console.log("new report", report);
//     console.log("new report to add", report.data.addReport.googleId);

//     let prevStateMarkers = this.state.markers;

//     console.log(prevStateMarkers);

//     const targetMarker = prevStateMarkers.find((marker) => {
//       // console.log(marker.id)
//       return marker.id == report.data.addReport.googleId;
//     });

//     console.log(targetMarker);

//     // this.setState((prevState, props) => {
//     //   this.state.markers.filter(marker=>{
//     //     marker.googleId === report.googleId
//     //   })
//     // });
//   };

//   componentWillReceiveProps = (nextProps) => {
//     // console.log(nextProps);
//     this.geoCodeLocation(nextProps.location);
//   };

//   geoCodeLocation = (loc) => {
//     Geocode.setApiKey("AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ");

//     Geocode.fromAddress(loc).then(
//       (response) => {
//         const { lat, lng } = response.results[0].geometry.location;
//         // console.log(lat, lng);
//         this.fetchMarkers(lat, lng);
//         this.setState({
//           locationLat: lat,
//           locationLng: lng,
//         });
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   };

//   fetchMarkers = async (lat, lng) => {
//     try {
//       // console.log(lat, lng)
//       const headers = {
//         "X-Requested-With": "XMLHttpRequest",
//       };
//       const uri = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=supermarket&key=AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ`;
//       // console.log("uri", uri);
//       const response = await fetch(uri, headers);
//       const json = await response.json();
//       // console.log("map data from json", json);

//       this.setState({ markers: [...json.results] });
//       let newPlaces = [];
//       let newMarkers = this.state.markers;

//       json.results.map((place) => {
//         // console.log(place);
//         // console.log(place.id);

//         const operation = {
//           query: gql`
//             query FetchPlace($googleId: String!) {
//               place(googleId: $googleId) {
//                 name
//                 googleId
//                 reports {
//                   itemName
//                   status
//                 }
//               }
//             }
//           `,
//           variables: { googleId: `${place.id}` },
//           context: {
//             headers: {
//               "X-Requested-With": "XMLHttpRequest",
//             },
//           },
//         };

//         makePromise(execute(link, operation))
//           .then((res) => {
//             // console.log(res.data.place)
//             if (res.data.place != null) {
//               // console.log('res data place', res.data.place)
//               let newPlace;

//               newPlace = { ...place, reports: res.data.place.reports };

//               // console.log(res.data);
//               newPlaces.push(newPlace);
//               // console.log('this is the new place', newPlace)

//               newMarkers = newMarkers.map((mark) => {
//                 // console.log(newPlace.reports)
//                 // console.log(mark)
//                 if (mark.id === newPlace.id) {
//                   const newMark = {
//                     ...mark,
//                     reports: newPlace.reports,
//                   };
//                   return newMark;
//                   // console.log('if statement console', newMark)
//                 } else {
//                   return mark;
//                 }
//               });
//               console.log("in theory this is the new state", newMarkers);
//             }
//           })
//           .catch((error) => console.log(`received error ${error}`));
//       });

//       console.log("new new markers", newMarkers);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   render() {
//     // console.log(this.props.location);

//     const MappedMarkers = this.state.markers.map((marker) => {
//       // console.log(marker);
//       return (
//         <MapMarker
//           key={marker.id}
//           lat={marker.geometry.location.lat}
//           lng={marker.geometry.location.lng}
//           marker={marker}
//           addReportToMarker={this.addReportToMarker}
//         />
//       );
//     });

//     // console.log(this.state.locationLat)

//     if (this.state.markers < 1) {
//       return (
//         <div style={{ height: "70vh", width: "100%" }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{
//               key: "AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ",
//             }}
//             center={{
//               lat: this.state.locationLat,
//               lng: this.state.locationLng,
//             }}
//             defaultZoom={14}
//           >
//             <TempMarker
//               lat={this.state.locationLat}
//               lng={this.state.locationLng}
//             />
//           </GoogleMapReact>
//         </div>
//       );
//     } else {
//       // console.log(this.state.locationLat, this.state.locationLng)
//       return (
//         <div style={{ height: "70vh", width: "100%" }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{
//               key: "AIzaSyBJhyN7v8TJyfUU1HEMiQ1lTs4mXHJ1LtQ",
//             }}
//             center={{
//               lat: this.state.locationLat,
//               lng: this.state.locationLng,
//             }}
//             defaultZoom={14}
//           >
//             {MappedMarkers}
//           </GoogleMapReact>
//         </div>
//       );
//     }
//   }
// }

export default MapContainer2;

// import React, { Component } from "react";
// import GoogleMapReact from "google-map-react";
// import Geocode from "react-geocode";

// class MapContainer2 extends Component {
//     state = { markers: [], locationLat: 52.536228, locationLng: 13.42606 };

//   // this component should be the container for the map and the list of markers

//   //option 2: fetch from google api here
//   //send data to map for display and list for display
//   // each report component does individual fetching to backend to check for reports
//   render() {
//       console.log(this.props.location)
//     return <div>map container</div>;
//   }
// }

// export default MapContainer2;
