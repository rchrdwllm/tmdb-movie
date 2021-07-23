import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useWidth } from "../hooks/useWidth";
import TopBar from "./TopBar";
import Movie from "./Movie";
import Footer from "./Footer";

const StyledResults = styled.div`
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
        margin-top: 2rem;
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
    .no-results {
        padding: 5rem 0;
        display: flex
        justify-content: center;
        align-items: center;
        h1 {
            color: var(--text-opacity);
            font-size: 2rem;
            text-align: center;
        }
    }
`;

const Results = () => {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(500);
    const [noResults, setNoResults] = useState(false);
    const width = useWidth();
    const { query } = useParams();

    const fetchResults = async () => {
        const { data } = await axios.get(
            `
            https://api.themoviedb.org/3/search/movie?api_key=92e591f8bdb7a6295f41fe7f684ecdfb&language=en-US&query=${query}&page=${page}&include_adult=false`
        );

        if (!data.results.length) {
            setNoResults(true);

            return;
        }

        setResults(data.results);
        setTotalPages(data.total_pages);
    };

    useEffect(() => {
        fetchResults();
    }, [query, page]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledResults>
            {width >= 1024 ? <TopBar /> : ""}
            <h3 className="heading">Showing results for: {query}</h3>
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
                {results.map(({ title, poster_path, id, genre_ids }, i) => (
                    <Movie
                        key={i}
                        id={id}
                        title={title}
                        poster={poster_path}
                        genreIds={genre_ids}
                    />
                ))}
            </div>
            {noResults ? (
                <div className="no-results">
                    <h1>No results for: {query}</h1>
                </div>
            ) : !results.length ? (
                <div className="no-results">
                    <h1>Searching for: {query}</h1>
                </div>
            ) : (
                ""
            )}
            <Footer />
        </StyledResults>
    );
};

export default Results;
