import React, { useState } from "react";
import axios from "axios";

const SearchBox = ({ changeLocation }) => {
  const [location, setLocation] = useState(null);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeLocation(location);
  };

  return (
    <div id="main-message">
      <div id="message-container">
        <div id="main-message-left">
          Report if a store is out of toilet paper!
        </div>
      </div>
      <div id="search-box-container">
        <form onSubmit={handleSubmit} id="search-form">
          <input
            id="search-box"
            type="text"
            name="search"
            placeholder="what is your location?"
            onChange={handleChange}
          />
          <button id="search-button">Search</button>
        </form>
      </div>
      <div id="message-container">
        <div id="main-message-right">
          {" "}
          Help social distancing! Help those on the front line!
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
