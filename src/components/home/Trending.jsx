import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import Movie from "../Movie";

const StyledTrending = styled.section`
    margin-top: 3rem;
    @media screen and (min-width: 1536px) {
        margin-top: 5rem;
    }
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .heading {
            font-size: 2rem;
            @media screen and (min-width: 1536px) {
                font-size: 3rem;
            }
        }
        .next {
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
                content: ">";
            }
        }
    }
    .container {
        margin-top: 1rem;
        padding-bottom: 2rem;
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        @media screen and (min-width: 1536px) {
            margin-top: 3rem;
            padding-bottom: 3rem;
        }
        &::-webkit-scrollbar {
            display: unset;
            background-color: var(--second-bg);
            height: 7px;
            border-radius: 50px;
        }
        &::-webkit-scrollbar-thumb {
            height: 100%;
            background-color: var(--accent);
            border-radius: 50px;
        }
        .movie a {
            @media screen and (min-width: 768px) {
                height: 18rem;
            }
        }
    }
`;

const Trending = () => {
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1000);

    const fetchTrending = async () => {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/trending/movie/day?api_key=92e591f8bdb7a6295f41fe7f684ecdfb&page=${page}`);

        setTrending(trending.concat(data.results));
        setTotalPages(data.total_pages);
    };

    useEffect(() => {
        fetchTrending();
    }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledTrending>
            <div className="controls">
                <h1 className="heading">Trending</h1>
                <button
                    className="next"
                    onClick={() => {
                        if (page >= totalPages) {
                            return;
                        }

                        setPage(page + 1);
                    }}
                ></button>
            </div>
            <div className="container">
                {trending.map(({ title, poster_path, id, genre_ids }) => (
                    <Movie
                        key={title}
                        id={id}
                        title={title}
                        poster={poster_path}
                        genreIds={genre_ids}
                    />
                ))}
            </div>
        </StyledTrending>
    );
};

export default Trending;
