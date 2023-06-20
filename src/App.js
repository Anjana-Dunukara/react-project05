import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import AddMovies from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoding(true);
    setError(null);

    try {
      const respons = await fetch(
        "https://react-project05-default-rtdb.firebaseio.com/movies.json"
      );

      if (!respons.ok) {
        throw new Error("Something went Wrong!!!");
      }

      const data = await respons.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoding(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const addMovieHandler = async (movie) => {
    const respons = await fetch(
      "https://react-project05-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log(respons);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={addMovieHandler} />
      </section>
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
