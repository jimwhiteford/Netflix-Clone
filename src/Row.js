// "rfce" snippet for this code.
// this is a component to be used in the appplication.

import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

// This function controls the rows in app.js
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
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

  const opts = {
    height: "390",
    width: "100%",
    playersVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || " ")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  //this is state, short term memory in React. useState is the hook creating an empty movie array.
  // .map iterates through the movies array and gets each index.
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opt={opts} />}
    </div>
  );
}

export default Row;
