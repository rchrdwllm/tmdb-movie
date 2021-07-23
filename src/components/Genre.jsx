import styled from "styled-components";
import axios from "axios";
import { useWidth } from "../hooks/useWidth";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useGenres } from "../hooks/useGenres";
import TopBar from "./TopBar";
import Movie from "./Movie";
import Footer from "./Footer";

const StyledGenre = styled.div`
    width: 100%;
    padding: 6rem 1rem 1rem;
    overflow-x: hidden;
    @media screen and (min-width: 640px) {
        padding: 5rem 3rem 3rem;
    }
    @media screen and (min-width: 768px) {
        padding: 8rem 3rem 3rem;
    }
    @media screen and (min-width: 1024px) {
        height: 100vh;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 5rem 2rem 2rem;
    }
    @media screen and (min-width: 1536px) {
        padding: 8rem 3rem 3rem;
    }
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        button {
            position: relative;
            background-color: var(--second-bg);
            border-radius: 50%;
            padding: 1.5rem;
            cursor: pointer;
            &:hover {
                background-color: var(--accent);
                color: #ffffff;
            }
            &::before {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            &.prev::before {
                content: "<";
            }
            &.next::before {
                content: ">";
            }
        }
    }
    .movie-container {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        @media screen and (min-width: 864px) {
            gap: 2rem;
        }
        @media screen and (min-width: 1024px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 1rem;
        }
        @media screen and (min-width: 1280px) {
            gap: 2rem;
        }
        .movie {
            margin: 0;
            a {
                width: 100%;
            }
            .details {
                @media screen and (min-width: 768px) {
                    padding: 2rem;
                }
                @media screen and (min-width: 1024px) {
                    padding: 1rem;
                }
                .title {
                    @media screen and (min-width: 768px) {
                        font-size: 3rem;
                    }
                    @media screen and (min-width: 864px) {
                        font-size: 3.25rem;
                    }
                    @media screen and (min-width: 1024px) {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
`;

const Genre = () => {
    const [genreMovies, setGenreMovies] = useState([]);
    const [id, setId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(500);
    const { name } = useParams();
    const width = useWidth();
    const genres = useGenres();

    const fetchGenreMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=92e591f8bdb7a6295f41fe7f684ecdfb&with_genres=${id}&page=${page}`
        );

        setGenreMovies(data.results);
        setTotalPages(data.total_pages);
    };

    useEffect(() => {
        if (id) {
            fetchGenreMovies();
        }
    }, [id, page]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (genres) {
            setId(
                genres.filter(
                    (genre) => genre.name.toLowerCase() === name.toLowerCase()
                )[0].id
            );
        }
    }, [genres, name]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledGenre>
            {width >= 1024 ? (
                <TopBar
                    genreName={name.charAt(0).toUpperCase() + name.slice(1)}
                />
            ) : (
                ""
            )}
            {width < 1024 ? (
                <h1 className="heading">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </h1>
            ) : (
                ""
            )}
            <div className="controls">
                <button
                    className="prev"
                    onClick={() => {
                        if (page <= 1) {
                            setPage(totalPages);
                        } else {
                            setPage(page - 1);
                        }
                    }}
                ></button>
                <p className="page">
                    Page {page} / {totalPages}
                </p>
                <button
                    className="next"
                    onClick={() => {
                        if (page >= totalPages) {
                            setPage(1);
                        } else {
                            setPage(page + 1);
                        }
                    }}
                ></button>
            </div>
            <div className="movie-container">
                {genreMovies.map(({ title, poster_path, id, genre_ids }) => (
                    <Movie
                        key={title}
                        id={id}
                        title={title}
                        poster={poster_path}
                        genreIds={genre_ids}
                    />
                ))}
            </div>
            <Footer />
        </StyledGenre>
    );
};

export default Genre;
