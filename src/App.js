import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  async function fetchMovieHandler() {
    setIsLoding(true);
    const respons = await fetch("https://swapi.dev/api/films/");

    const data = await respons.json();

    const transforemedData = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        releaseDate: movieData.release_date,
        openingText: movieData.opening_crawl,
      };
    });

    setMovies(transforemedData);
    setIsLoding(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoding && movies.length === 0 && <p>No Movies.</p>}
        {isLoding && <p>Loding....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
