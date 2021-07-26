import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWidth } from "../hooks/useWidth";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TopBar from "./TopBar";
import Movie from "./Movie";
import Footer from "./Footer";

const StyledPerson = styled.div`
    width: 100%;
    padding: 0 1rem 1rem;
    overflow-x: hidden;
    @media screen and (min-width: 640px) {
        padding: 0 3rem 3rem;
    }
    @media screen and (min-width: 768px) {
        padding: 0 3rem 3rem;
    }
    @media screen and (min-width: 1024px) {
        height: 100vh;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0 2rem 2rem;
    }
    @media screen and (min-width: 1536px) {
        padding: 0 3rem 3rem;
    }
    header {
        width: 100%;
        height: 100vh;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .wrapper {
            position: relative;
            height: 70%;
            width: 80%;
            margin: auto;
            @media screen and (min-width: 1024px) {
                width: 65%;
            }
            @media screen and (min-width: 1280px) {
                width: 45%;
                height: 75%;
            }
            .skeleton-movie {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                border-radius: 16px;
            }
            .poster {
                height: 100%;
                width: 100%;
                object-fit: cover;
                opacity: 0;
                border-radius: 16px;
                &.loaded {
                    opacity: 1;
                }
            }
        }
    }
    .main-details {
        .name {
            font-size: 2.5rem;
            @media screen and (min-width: 640px) {
                font-size: 3rem;
            }
            @media screen and (min-width: 1024px) {
                font-size: 4rem;
            }
        }
        .biography {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 10;
            overflow: hidden;
            line-height: 175%;
            margin-top: 1rem;
            &.shown {
                -webkit-line-clamp: unset;
            }
        }
        .see-more {
            color: var(--text-opacity);
            margin-top: 1rem;
            display: inline-block;
            transition: 0.25s color;
            cursor: pointer;
            &:hover {
                color: var(--text);
            }
        }
    }
    .movie {
        margin-top: 5rem;
        .movie-heading {
            font-size: 2.5rem;
            @media screen and (min-width: 640px) {
                font-size: 3rem;
            }
            @media screen and (min-width: 1024px) {
                font-size: 4rem;
            }
        }
        .movie-container {
            margin-top: 1rem;
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
    }
`;

const Person = () => {
    const [personData, setPersonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [shouldShow, setShouldShow] = useState(false);
    const { id } = useParams();
    const width = useWidth();

    const fetchData = async () => {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/person/${id}?api_key=92e591f8bdb7a6295f41fe7f684ecdfb&language=en-US&append_to_response=movie_credits`);
        // data.movie_credits.cast.splice(20);

        setPersonData(data);
    };

    useEffect(() => {
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const imagesLoaded = require("imagesloaded"); // eslint-disable-line global-require
        const images = document.querySelectorAll("img");

        if (personData.profile_path) {
            imagesLoaded(images, () => setLoading(false));
        }
    }, [personData]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!personData.movie_credits || !personData) {
        return "";
    }

    return (
        <StyledPerson>
            {width >= 1024 ? <TopBar /> : ""}
            <header>
                <div className="wrapper">
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
                        src={`https://image.tmdb.org/t/p/original${personData.profile_path}`}
                        alt="person poster"
                        className={"poster" + (!loading ? " loaded" : "")}
                    />
                </div>
            </header>
            <div className="main-details">
                <h1 className="name">{personData.name}</h1>
                <p className={"biography" + (shouldShow ? " shown" : "")}>
                    {personData.biography}
                </p>
                <button
                    className="see-more"
                    onClick={() => setShouldShow(!shouldShow)}
                >
                    See {shouldShow ? "less" : "more"}...
                </button>
            </div>
            <div className="movie">
                <h1 className="movie-heading">Known for:</h1>
                <div className="movie-container">
                    {personData.movie_credits.cast.map(
                        ({ title, poster_path, id, genre_ids }) => (
                            <Movie
                                key={title}
                                id={id}
                                title={title}
                                poster={poster_path}
                                genreIds={genre_ids}
                            />
                        )
                    )}
                </div>
            </div>
            <Footer />
        </StyledPerson>
    );
};

export default Person;
