import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toggleLight, toggleDark } from "../actions/toggleTheme";

const StyledBtn = styled.div`
    margin: 1rem;
    width: 28px;
    padding: 2px;
    background-color: var(--text-opacity);
    border-radius: 50px;
    cursor: pointer;
    @media screen and (min-width: 640px) {
        margin: 1rem 3rem;
    }
    @media screen and (min-width: 1024px) {
        margin: 0;
    }
    .inner-circle {
        background-color: var(--bg);
        border-radius: 50%;
        height: 12px;
        width: 12px;
        pointer-events: none;
        &.toggled {
            margin-left: auto;
        }
    }
`;

const ThemeBtn = () => {
    const currentTheme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    return (
        <StyledBtn
            className="theme-btn"
            onClick={() => {
                if (currentTheme.name === "dark") {
                    dispatch(toggleLight());
                } else {
                    dispatch(toggleDark());
                }
            }}
        >
            <div
                className={
                    "inner-circle " +
                    (currentTheme.name === "light" ? "" : "toggled")
                }
            ></div>
        </StyledBtn>
    );
};

export default ThemeBtn;
