import React, { Component } from "react";
import wiki from "wikijs";
import "./App.css";
import Map from "./Map";
import Search from "./Search";
import Header from "./Header";
import places from "./places";

class App extends Component {
  state = {
    filteredPlaces: places, // List of places matching the current filter
    selectedPlace: null, // The place we want more info on
    selectedPlaceImg: "", // The image URL of the selected place from wikipedia
    selectedPlaceBounce: false, // Sets bouncing of the selected place's marker
    selectedPlaceImgError: false // True if we have an error with Wikipedia API
  };
  // This function handles the change of filtering
  onSelectChange = event => {
    this.setState({
      selectedPlace: null, // unset selected place if filter changes
      filteredPlaces:
        event.target.value === "all"
          ? places // If the value is all show all places
          : // otherwise show only the places matching the selected category
            places.filter(place => place.category === event.target.value)
    });
  };
  // This function selects the place we want more info on
  setSelectedPlace = id => {
    this.setState({
      selectedPlaceBounce: true, // start bouncing
      selectedPlace: id,
      selectedPlaceImg: "",
      selectedPlaceImgError: false,
    });
    // Stop the bouncing of the marker after 1s
    setTimeout(() => this.setState({ selectedPlaceBounce: false }), 1000);
    // Get the place with matching id to fetch image from wikipedia
    const place = places.filter(p => p.id === id)[0];
    place &&
      wiki()
        .page(place.wiki)
        .then(i => i.mainImage()) // Fetch image
        // Set the image url of selected place
        .then(imgUrl =>
          this.setState({
            selectedPlaceImg: imgUrl,
            selectedPlaceImgError: false
          })
        )
        .catch(() => this.setState({ selectedPlaceImgError: true }));
  };

  render() {
    // Layout is handled with css grid
    return (
      <div className="App">
        <Map
          selectedPlaceBounce={this.state.selectedPlaceBounce}
          selectedPlaceImg={this.state.selectedPlaceImg}
          setSelectedPlace={this.setSelectedPlace}
          selectedPlace={this.state.selectedPlace}
          filteredPlaces={this.state.filteredPlaces}
          selectedPlaceImgError={this.state.selectedPlaceImgError}
        />
        <Search
          places={places}
          filteredPlaces={this.state.filteredPlaces}
          onSelectChange={this.onSelectChange}
          setSelectedPlace={this.setSelectedPlace}
          selectedPlace={this.state.selectedPlace}
        />
        <Header />
      </div>
    );
  }
}

export default App;
