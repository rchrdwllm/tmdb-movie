import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGenres } from "../hooks/useGenres";
import { useAnimations } from "../hooks/useAnimations";
import { NavLink } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const StyledMovie = styled(motion.div)`
    position: relative;
    display: block;
    &:not(:first-child) {
        margin-left: 1rem;
    }
    a {
        position: relative;
        display: block;
        width: 12rem;
        height: 18rem;
        @media screen and (min-width: 768px) {
            height: 30rem;
        }
        @media screen and (min-width: 1024px) {
            height: 18rem;
        }
        @media screen and (min-width: 1536px) {
            width: 15rem;
            height: 22rem;
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
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            border-radius: 16px;
            &.loaded {
                opacity: 1;
            }
        }
    }
    .details {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 1rem;
        z-index: 1;
        pointer-events: none;
        .genres {
            margin-top: 0.5rem;
            color: var(--text-opacity);
        }
    }
    .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 75%;
        background-image: var(--gradient);
        border-radius: 16px;
        pointer-events: none;
    }
`;

const Movie = ({ id, title, poster, genreIds }) => {
    const [loading, setLoading] = useState(true);
    const [movieGenres, setMovieGenres] = useState([]);
    const genres = useGenres();
    const { opacityReveal } = useAnimations();

    const filterGenres = () => {
        const filtered = genres.filter(({ id }) => genreIds.includes(id));

        setMovieGenres(filtered);
    };

    useEffect(() => {
        setLoading(true);

        const imagesLoaded = require("imagesloaded");
        const images = document.querySelectorAll("img");

        if (genres) {
            filterGenres();
        }

        if (poster) {
            imagesLoaded(images, () => setLoading(false));
        }
    }, [genres]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!poster) {
        return "";
    }

    return (
        <StyledMovie
            initial="initial"
            animate="initial"
            whileHover="animate"
            className="movie"
        >
            <NavLink exact to={`/movie/${id}`}>
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
                    src={`https://image.tmdb.org/t/p/w185${poster}`}
                    alt="movie poster"
                    className={"poster" + (!loading ? " loaded" : "")}
                    loading="lazy"
                />
            </NavLink>
            <motion.div className="details" variants={opacityReveal}>
                <h1 className="title">{title}</h1>
                <div className="genres">
                    {movieGenres.map(({ id, name }, i) => (
                        <span className="genre" key={id}>
                            {i !== movieGenres.length - 1 ? `${name} · ` : name}
                        </span>
                    ))}
                </div>
            </motion.div>
            <motion.div
                className="overlay"
                variants={opacityReveal}
            ></motion.div>
        </StyledMovie>
    );
};

export default Movie;
