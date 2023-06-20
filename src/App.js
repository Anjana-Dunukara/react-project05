import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoding(true);
    setError(null);

    try {
      const respons = await fetch("https://swapi.dev/api/films/");

      if (!respons.ok) {
        throw new Error("Something went Wrong!!!");
      }

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
    } catch (error) {
      setError(error.message);
    }
    setIsLoding(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoding && movies.length === 0 && !error && <p>No Movies.</p>}
        {isLoding && <p>Loding....</p>}
        {!isLoding && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
