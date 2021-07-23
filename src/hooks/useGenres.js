import axios from "axios";
import { useState, useEffect } from "react";

export const useGenres = (id, page) => {
    const [genres, setGenres] = useState(null);

    const fetchGenreMovies = async () => {};

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=92e591f8bdb7a6295f41fe7f684ecdfb&language=en-US`
        );

        setGenres(data.genres);
    };

    useEffect(() => {
        if (id) {
            fetchGenreMovies();
        } else {
            fetchGenres();
        }
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    return genres;
};
