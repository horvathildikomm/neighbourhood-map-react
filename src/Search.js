import React, { Component } from "react";
// This is the Search / Place list component
class Search extends Component {
  render() {
    const {
      places,
      filteredPlaces,
      onSelectChange,
      setSelectedPlace,
      selectedPlace
    } = this.props;
    return (
      <div className="search">
        <div className="searchSelect">
          {/*When the select state is changed call function to change filtered Places*/}
          <select onChange={onSelectChange}>
            <option>all</option>
            {/*Map place categories, use reduce to remove duplicates, create options for categories*/}
            {places
              .map(i => i.category)
              .reduce(
                (acc, curr) =>
                  acc.indexOf(curr) === -1 ? [...acc, curr] : acc,
                []
              )
              .map(category => <option key={category}>{category}</option>)}
          </select>
        </div>
        {/* Create a list of places with the selected category, set selected place when clicked*/}
        <div className="filteredPlaces">
          {filteredPlaces.map(place => (
            <div
              key={place.id}
              className={
                place.id === selectedPlace
                  ? "filteredPlace selected"
                  : "filteredPlace"
              }
              onClick={() => setSelectedPlace(place.id)}
            >
              {place.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
