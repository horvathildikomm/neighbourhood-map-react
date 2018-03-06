import React, { Component } from "react";
import wiki from "wikijs";
import "./App.css";
import Map from "./Map";
import Search from "./Search";
import Header from "./Header";
import places from "./places";

class App extends Component {
  state = {
    filteredPlaces: places,
    selectedPlace: null,
    selectedPlaceSummary: ""
  };
  onSelectChange = event => {
    this.setState({
      selectedPlace: null,
      filteredPlaces:
        event.target.value === "all"
          ? places
          : places.filter(place => place.category === event.target.value)
    });
  };

  setSelectedPlace = id => {
    this.setState({
      selectedPlace: id,
      selectedPlaceSummary: ""
    });
    const place=places.filter(p=>p.id===id)[0];
    place && wiki().page(place.wiki)
    .then(i => i.mainImage()).then(summary => this.setState({selectedPlaceSummary:summary}))
  };

  render() {
      return (
      <div className="App">
        <Map
          selectedPlaceSummary={this.state.selectedPlaceSummary}
          setSelectedPlace={this.setSelectedPlace}
          selectedPlace={this.state.selectedPlace}
          filteredPlaces={this.state.filteredPlaces}
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
