import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useGenres } from "../../hooks/useGenres";
import { useWidth } from "../../hooks/useWidth";
import { NavLink } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const StyledFeatured = styled.section`
    overflow: hidden;
    .heading {
        font-size: 3rem;
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
        .carousel-indicators {
            display: flex;
            justify-content: center;
            align-items: center;
            .indicator {
                margin: 0 0.5rem;
                background-color: var(--skeleton-color);
                width: 7px;
                height: 7px;
                border-radius: 50%;
                transition: 0.5s background-color;
                cursor: pointer;
                &.active-indicator {
                    background-color: var(--text);
                }
            }
        }
    }
    .featured-container {
        display: flex;
        margin-top: 2rem;
        flex-wrap: nowrap;
        width: 100%;
        transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        a {
            position: relative;
            display: block;
            border-radius: 16px;
            width: 100%;
            flex-shrink: 0;
            &:not(:first-child) {
                margin-left: 1rem;
            }
            @media screen and (min-width: 1024px) {
                margin: 0;
            }
            .skeleton-featured {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 16px;
                z-index: 1;
            }
            .backdrop {
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0;
                filter: brightness(65%);
                &.loaded {
                    border-radius: 16px;
                    opacity: 1;
                }
            }
            .details {
                position: absolute;
                bottom: 0;
                left: 0;
                padding: 1rem;
                color: #ffffff;
                z-index: 1;
                @media screen and (min-width: 768px) {
                    padding: 2rem;
                }
                @media screen and (min-width: 1280px) {
                    padding: 3rem;
                }
                .title {
                    font-size: 2rem;
                    @media screen and (min-width: 768px) {
                        font-size: 3rem;
                    }
                    @media screen and (min-width: 1536px) {
                        font-size: 5rem;
                    }
                }
                .overview {
                    margin-top: 1rem;
                    line-height: 175%;
                }
            }
        }
    }
`;

const Featured = () => {
    const [featured, setFeatured] = useState([]);
    const [currentFeatured, setCurrentFeatured] = useState(0);
    const [loading, setLoading] = useState(true);
    const carousel = useRef();
    const genres = useGenres();
    const width = useWidth();

    const fetchFeatured = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=92e591f8bdb7a6295f41fe7f684ecdfb&language=en-US&page=1`
        );
        data.results.splice(10);

        setFeatured(data.results);
    };

    const changeFeatured = (index) => {
        const img = document.querySelectorAll(".backdrop")[currentFeatured];
        const size = img.clientWidth;

        if (index || index === 0) {
            setCurrentFeatured(index);

            const img = document.querySelectorAll(".backdrop")[currentFeatured];
            const size = img.clientWidth;

            carousel.current.style.transform = `translateX(calc(${
                -size * index
            }px - calc(1rem * ${index})))`;
        } else {
            if (currentFeatured >= featured.length - 1) {
                setCurrentFeatured(0);
            } else {
                setCurrentFeatured(currentFeatured + 1);
            }

            let i = currentFeatured + 1;

            if (i >= featured.length) {
                i = 0;
            }

            carousel.current.style.transform = `translateX(calc(${
                -size * i
            }px - calc(1rem * ${i})))`;
        }
    };

    useEffect(() => {
        fetchFeatured();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const interval = setInterval(
            changeFeatured,
            width >= 1024 ? 17000 : 5000
        );

        return () => clearInterval(interval);
    }, [featured, currentFeatured]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const imagesLoaded = require("imagesloaded");
        const images = document.querySelectorAll("img");

        if (featured.length) {
            if (featured[currentFeatured].backdrop_path) {
                imagesLoaded(images, () => setLoading(false));
            }
        }
    }, [featured]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!genres || !featured[currentFeatured]) {
        return "";
    }

    return (
        <StyledFeatured>
            {width < 1024 ? <h1 className="heading">Discover</h1> : ""}
            <div className="controls">
                <button
                    className="prev"
                    onClick={() => {
                        if (currentFeatured <= 0) {
                            changeFeatured(featured.length - 1);
                        } else {
                            changeFeatured(currentFeatured - 1);
                        }
                    }}
                ></button>
                <div className="carousel-indicators">
                    {featured.map((featured, i) => (
                        <div
                            className={
                                "indicator " +
                                (i === currentFeatured
                                    ? "active-indicator"
                                    : "")
                            }
                            key={featured.id}
                            onClick={() => changeFeatured(i)}
                        ></div>
                    ))}
                </div>
                <button
                    className="next"
                    onClick={() => {
                        if (currentFeatured >= featured.length - 1) {
                            changeFeatured(0);
                        } else {
                            changeFeatured(currentFeatured + 1);
                        }
                    }}
                ></button>
            </div>
            <div className="featured-container" ref={carousel}>
                {featured.map((featured) => {
                    return (
                        <NavLink
                            exact
                            to={`/movie/${featured.id}`}
                            className={!loading ? "loaded" : ""}
                            key={featured.id}
                        >
                            <>
                                <SkeletonTheme
                                    color="var(--skeleton-color)"
                                    highlightColor="var(--skeleton-highlight)"
                                >
                                    {loading ? (
                                        <Skeleton className="skeleton-featured"></Skeleton>
                                    ) : (
                                        ""
                                    )}
                                </SkeletonTheme>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
                                    alt="movie backdrop"
                                    className={
                                        "backdrop" + (!loading ? " loaded" : "")
                                    }
                                />
                                <div className="details">
                                    {!loading ? (
                                        <>
                                            <h1 className="title">
                                                {featured.title}
                                            </h1>
                                            {width >= 864 ? (
                                                <p className="overview">
                                                    {featured.overview}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </>
                        </NavLink>
                    );
                })}
            </div>
        </StyledFeatured>
    );
};

export default Featured;
