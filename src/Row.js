// "rfce" snippet for this code.
// this is a component to be used in the appplication.

import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

// This function controls the rows in app.js
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  // A snippet of code which runs when Row() loads based on a specific condition. it will fetch from the api.
  useEffect(() => {
    // if [] is blank, run once when the row loads, and dosent run again.
    // cant run async in useEffect so have to use a function and call it.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // have to include fetchUrl as its a variable created outside of useEffect.
  }, [fetchUrl]);

  //this is state, short term memory in React. useState is the hook creating an empty movie array.
  // .map iterates through the movies array and gets each index.
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* row_poster*/}

        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* container -> posters*/}
    </div>
  );
}

export default Row;
