import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
// This file creates and exports a map component
// Docs: https://tomchentw.github.io/react-google-maps
const MapWithAMarker = withScriptjs(
  withGoogleMap(
    ({
      setSelectedPlace, // To select a place if a marker is clicked
      selectedPlace, // id of the selected place, if set then show info
      filteredPlaces, // list of places to show on the map
      selectedPlaceImg, // image URL for the selected place
      selectedPlaceBounce, // true if the selected place should bounce
      selectedPlaceImgError // true if fetching URL failed
    }) => (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 47.497316, lng: 19.056935 }}
      >
        {/*Show markers for all of the places in filteredPlaces*/}
        {filteredPlaces.map(place => (
          <Marker
            key={place.id}
            position={{ lat: place.position[0], lng: place.position[1] }}
            onClick={() => setSelectedPlace(place.id)}
            animation={place.id === selectedPlace && selectedPlaceBounce && 1}
          >
            {/*If image URL can't be fetched then show error text*/}
            {/*If the place is selected and its image URL is fetched then show info*/}
            {/*If the info window is closed, then reset the selected place to null*/}
            {place.id === selectedPlace &&
              (selectedPlaceImg || selectedPlaceImgError) && (
                <InfoWindow onCloseClick={() => setSelectedPlace(null)}>
                  <div className="infoWindow">
                    <h2>{place.name}</h2>
                    {selectedPlaceImgError ? (
                      <p className="imageError">
                        Error: Image can not be loaded
                      </p>
                    ) : (
                      <img
                        className="infoWindowImg"
                        alt={place.name}
                        src={selectedPlaceImg}
                      />
                    )}
                  </div>
                </InfoWindow>
              )}
          </Marker>
        ))}
      </GoogleMap>
    )
  )
);
// This is a container component for our map
const Map = ({
  setSelectedPlace,
  selectedPlace,
  filteredPlaces,
  selectedPlaceImg,
  selectedPlaceBounce,
  selectedPlaceImgError
}) => (
  <div role="application" className="map">
    <MapWithAMarker
      selectedPlaceBounce={selectedPlaceBounce}
      selectedPlaceImg={selectedPlaceImg}
      filteredPlaces={filteredPlaces}
      setSelectedPlace={setSelectedPlace}
      selectedPlace={selectedPlace}
      selectedPlaceImgError={selectedPlaceImgError}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIX8Vl7u_9qHj4Jm-iIMrDkPXaNpDysK4&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div className="mapContainer" />}
      containerElement={<div className="mapContainer" />}
      mapElement={<div className="mapContainer" />}
    />
  </div>
);
export default Map;
