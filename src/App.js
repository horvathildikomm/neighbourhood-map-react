import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import Search from "./Search";
import Header from "./Header";
import places from "./places";
// This function fetches a 400px wide thumbnail link for a place
const fetchWikiThumbnail = name =>
// Fetch the correct name for the place
  fetch(
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${name}&limit=1&namespace=0&format=json&origin=*`
  )
    .then(res => res.json()) // Get body data
    .then(res => encodeURI(res[0])) // Get the name of the first found page and encode it
    .then(uri => // Fetch thumbnail
      fetch(
        `http://en.wikipedia.org/w/api.php?action=query&titles=${uri}&prop=pageimages&format=json&pithumbsize=400&origin=*`
      )
    )
    .then(res => res.json()) // Get body data
    .then(data => data.query.pages) // Get result pages
    // Get the thumbnail of the first page result
    .then(pages => pages[Object.keys(pages)[0]].thumbnail.source);

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
      selectedPlaceImgError: false
    });
    // Stop the bouncing of the marker after 1s
    setTimeout(() => this.setState({ selectedPlaceBounce: false }), 1000);
    // Get the place with matching id to fetch image from wikipedia
    const place = places.filter(p => p.id === id)[0];
    place &&
      fetchWikiThumbnail(place.wiki)
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
        <Header />
        <Search
          places={places}
          filteredPlaces={this.state.filteredPlaces}
          onSelectChange={this.onSelectChange}
          setSelectedPlace={this.setSelectedPlace}
          selectedPlace={this.state.selectedPlace}
        />
        <Map
          selectedPlaceBounce={this.state.selectedPlaceBounce}
          selectedPlaceImg={this.state.selectedPlaceImg}
          setSelectedPlace={this.setSelectedPlace}
          selectedPlace={this.state.selectedPlace}
          filteredPlaces={this.state.filteredPlaces}
          selectedPlaceImgError={this.state.selectedPlaceImgError}
        />
      </div>
    );
  }
}

export default App;
