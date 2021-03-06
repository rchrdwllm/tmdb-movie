import styled from "styled-components";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const StyledCast = styled.div`
    a {
        height: 100%;
        width: 100%;
        .cast-img-container {
            position: relative;
            width: 100%;
            .skeleton-cast {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 16px;
                z-index: 1;
            }
            .cast-img {
                opacity: 0;
                border-radius: 16px;
                &.loaded {
                    opacity: 1;
                }
            }
        }
        .no-cast-img {
            height: 85%;
            width: 100%;
            background-color: var(--skeleton-color);
            border-radius: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            h1 {
                color: var(--text);
            }
        }
        .cast-details {
            height: 1fr;
            margin-top: 1rem;
            .name {
                font-size: 1rem;
            }
            .character {
                margin-top: 0.5rem;
                color: var(--text-opacity);
            }
        }
    }
`;

const Cast = ({ name, profile, character, id }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const imagesLoaded = require("imagesloaded");
        const images = document.querySelectorAll("img");

        if (profile) {
            imagesLoaded(images, () => setLoading(false));
        }
    }, [profile]);

    return (
        <StyledCast>
            <NavLink exact to={`/people/${id}`}>
                <div className="cast-img-container">
                    <SkeletonTheme
                        color="var(--skeleton-color)"
                        highlightColor="var(--skeleton-highlight)"
                    >
                        {loading ? (
                            <Skeleton className="skeleton-cast"></Skeleton>
                        ) : (
                            ""
                        )}
                    </SkeletonTheme>
                    {profile ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w185${profile}`}
                            alt="cast"
                            className={"cast-img " + (!loading ? "loaded" : "")}
                            loading="lazy"
                        />
                    ) : (
                        ""
                    )}
                </div>
                {!profile ? (
                    <div className="no-cast-img">
                        <h1>No image</h1>
                    </div>
                ) : (
                    ""
                )}
                <div className="cast-details">
                    <h1 className="name">{name}</h1>
                    {character ? <p className="character">{character}</p> : ""}
                </div>
            </NavLink>
        </StyledCast>
    );
};

export default Cast;
