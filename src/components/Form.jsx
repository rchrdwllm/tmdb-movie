import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateQuery } from "../actions/updateQuery";

const StyledForm = styled.form`
    padding: 1rem;
    @media screen and (min-width: 640px) {
        padding: 1rem 3rem;
    }
    @media screen and (min-width: 1024px) {
        padding: 0;
        margin-top: 1rem;
    }
    @media screen and (min-width: 1536px) {
        margin-top: 3rem;
    }
    .search-movies {
        padding: 0.5rem;
        width: 100%;
        border-radius: 8px;
        background-color: var(--second-bg-opacity);
    }
`;

const Form = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const sendOff = (value) => {
        dispatch(updateQuery(value));

        if (value) {
            history.push(`/search/${value}`);
        } else {
            history.push("/");
        }
    };

    return (
        <StyledForm
            className="search-form"
            onSubmit={(e) => {
                e.preventDefault();
                sendOff(e.target[0].value);
            }}
        >
            <input
                type="text"
                className="search-movies"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </StyledForm>
    );
};

export default Form;
