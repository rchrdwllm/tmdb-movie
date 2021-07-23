import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWidth } from "../hooks/useWidth";
import { NavLink } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TopBar from "./TopBar";
import Cast from "./Cast";
import Footer from "./Footer";

const StyledDetails = styled.div`
    padding: 4rem 0 0;
    @media screen and (min-width: 640px) {
        padding: 5rem 0 0;
    }
    @media screen and (min-width: 1024px) {
        height: 100vh;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 3rem 0 0;
    }
    @media screen and (min-width: 1536px) {
        padding: 6rem 0 0;
    }
    header {
        position: relative;
        width: 100%;
        height: 60vh;
        pointer-events: none;
        @media screen and (min-width: 768px) {
            height: 75vh;
        }
        @media screen and (min-width: 864px) {
            height: 85vh;
        }
        .skeleton-movie {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .backdrop {
            height: 100%;
            width: 100%;
            object-fit: cover;
            opacity: 0;
            &.loaded {
                opacity: 1;
            }
        }
        .title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3.5rem;
            text-align: center;
            z-index: 1;
            @media screen and (min-width: 1536px) {
                font-size: 4.5rem;
            }
        }
        &::before {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
            content: "";
            background-image: var(--gradient);
            transition: 0.5s height ease-out;
        }
    }
    .main-details {
        margin-top: 2rem;
        padding: 0 1rem;
        position: relative;
        z-index: 1;
        @media screen and (min-width: 640px) {
            margin-top: -5rem;
            padding: 0 3rem;
        }
        @media screen and (min-width: 1024px) {
            padding: 0 5rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            place-items: center;
        }
        @media screen and (min-width: 1536px) {
            padding: 0 7rem;
        }
        .poster-container {
            position: relative;
            width: 80%;
            margin: auto;
            @media screen and (min-width: 1024px) {
                width: 100%;
            }
            .skeleton-movie {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 16px;
                z-index: 1;
            }
            .poster {
                display: block;
                width: 100%;
                border-radius: 16px;
                opacity: 0;
                &.loaded {
                    opacity: 1;
                }
            }
        }
        .overview-content {
            margin-top: 5rem;
            @media screen and (min-width: 1024px) {
                margin: 0;
            }
            .tagline {
                font-size: 2.5rem;
                @media screen and (min-width: 640px) {
                    font-size: 3rem;
                }
            }
            .minor-details {
                line-height: 175%;
                margin-top: 1rem;
                color: var(--text-opacity);
            }
            .overview {
                line-height: 175%;
                margin-top: 1rem;
            }
            .genre-containers {
                margin-top: 1rem;
                display: flex;
                flex-wrap: wrap;
                .genre {
                    border-radius: 6px;
                    background-color: var(--second-bg);
                    padding: 0.5rem 1rem;
                    margin: 0.25rem;
                    &:hover {
                        background-color: var(--accent);
                        color: #ffffff;
                    }
                }
            }
        }
    }
    .trailer {
        padding: 0 1rem;
        margin-top: 3rem;
        @media screen and (min-width: 640px) {
            padding: 0 3rem;
            margin-top: 5rem;
        }
        @media screen and (min-width: 1024px) {
            padding: 0 5rem;
            margin-top: 7rem;
        }
        @media screen and (min-width: 1536px) {
            padding: 0 7rem;
            margin-top: 10rem;
        }
        .trailer-title {
            font-size: 2.5rem;
            @media screen and (min-width: 640px) {
                font-size: 3rem;
            }
            @media screen and (min-width: 1024px) {
                font-size: 4rem;
            }
        }
        iframe {
            height: 50vh;
            width: 100%;
            margin-top: 1rem;
            @media screen and (min-width: 640px) {
                height: 75vh;
            }
        }
    }
    .casts {
        padding: 0 1rem 1rem;
        margin-top: 3rem;
        @media screen and (min-width: 640px) {
            padding: 0 3rem 3rem;
            margin-top: 5rem;
        }
        @media screen and (min-width: 864px) {
            gap: 2rem;
            grid-template-columns: 1fr 1fr 1fr;
        }
        @media screen and (min-width: 1024px) {
            grid-template-columns: 1fr 1fr;
            margin-top: 7rem;
        }
        @media screen and (min-width: 1280px) {
            padding: 0 5rem 5rem;
            grid-template-columns: 1fr 1fr 1fr;
        }
        @media screen and (min-width: 1536px) {
            padding: 0 7rem 7rem;
            margin-top: 10rem;
        }
        .cast-heading {
            font-size: 2.5rem;
            @media screen and (min-width: 640px) {
                font-size: 3rem;
            }
            @media screen and (min-width: 1024px) {
                font-size: 4rem;
            }
        }
        .cast-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-top: 1rem;
            @media screen and (min-width: 864px) {
                grid-template-columns: 1fr 1fr 1fr;
            }
            @media screen and (min-width: 1024px) {
                grid-template-columns: 1fr 1fr;
            }
            @media screen and (min-width: 1280px) {
                grid-template-columns: 1fr 1fr 1fr;
            }
        }
    }
`;

const Details = () => {
    const [movieData, setMovieData] = useState({});
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const width = useWidth();

    const fetchData = async () => {
        const { data } = await axios.get(
            `http://api.themoviedb.org/3/movie/${id}?api_key=92e591f8bdb7a6295f41fe7f684ecdfb&append_to_response=videos`
        );

        setMovieData(data);
    };

    const fetchCast = async () => {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/movie/${id}/credits?api_key=92e591f8bdb7a6295f41fe7f684ecdfb&language=en-US`);
        const filtered = data.cast
            .filter(
                ({ known_for_department }) => known_for_department === "Acting"
            )
            .filter(({ order }) => order <= 11);

        setCast(filtered);
    };

    useEffect(() => {
        fetchData();
        fetchCast();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const imagesLoaded = require("imagesloaded");
        const images = document.querySelectorAll("img");

        if (movieData.backdrop_path) {
            imagesLoaded(images, () => setLoading(false));
        }
    }, [movieData]);

    if (!movieData.videos || !movieData) {
        return "";
    }

    return (
        <StyledDetails>
            {width >= 1024 ? <TopBar /> : ""}
            <header>
                <SkeletonTheme
                    color="var(--skeleton-color)"
                    highlightColor="var(--skeleton-highlight)"
                >
                    {loading ? (
                        <Skeleton className="skeleton-movie"></Skeleton>
                    ) : (
                        ""
                    )}
                </SkeletonTheme>
                <img
                    src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
                    alt="movie backdrop"
                    className={"backdrop" + (!loading ? " loaded" : "")}
                />
                <h1 className="title">{movieData.title}</h1>
            </header>
            <div className="main-details">
                <div className="poster-container">
                    <SkeletonTheme
                        color="var(--skeleton-color)"
                        highlightColor="var(--skeleton-highlight)"
                    >
                        {loading ? (
                            <Skeleton className="skeleton-movie"></Skeleton>
                        ) : (
                            ""
                        )}
                    </SkeletonTheme>
                    <img
                        src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
                        alt="movie poster"
                        className={"poster" + (!loading ? " loaded" : "")}
                    />
                </div>
                <div className="overview-content">
                    <h1 className="tagline">
                        {movieData.tagline
                            ? movieData.tagline
                            : "No tagline provided for this movie"}
                    </h1>
                    <p className="minor-details">
                        {movieData.release_date} · {movieData.status} ·{" "}
                        {movieData.vote_average.toString()} rating
                    </p>
                    <p className="overview">{movieData.overview}</p>
                    <div className="genre-containers">
                        {movieData.genres.map(({ name, id }) => (
                            <NavLink
                                exact
                                to={`/genres/${name.toLowerCase()}`}
                                className="genre"
                                key={id}
                            >
                                {name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
            <div className="trailer">
                {movieData.videos.results.length ? (
                    <>
                        <h1 className="trailer-title">
                            {movieData.videos.results[0]
                                ? movieData.videos.results[0].name
                                : movieData.videos.results[1]
                                ? movieData.videos.results[1].name
                                : movieData.videos.results[2].name}
                        </h1>
                        <iframe
                            src={`https://www.youtube.com/embed/${movieData.videos.results[0].key}`}
                            title={
                                movieData.videos.results[0]
                                    ? movieData.videos.results[0].name
                                    : movieData.videos.results[1]
                                    ? movieData.videos.results[1].name
                                    : movieData.videos.results[2].name
                            }
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </>
                ) : (
                    ""
                )}
            </div>
            {cast.length ? (
                <div className="casts">
                    <h1 className="cast-heading">Casts</h1>
                    <div className="cast-container">
                        {cast.map(({ name, profile_path, character, id }) => (
                            <Cast
                                key={id}
                                name={name}
                                profile={profile_path}
                                character={character}
                            />
                        ))}
                    </div>
                    <Footer />
                </div>
            ) : (
                ""
            )}
        </StyledDetails>
    );
};

export default Details;
