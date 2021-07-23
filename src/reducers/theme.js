import { lightTheme, darkTheme } from "../styles/themes";

const theme = (state = lightTheme, action) => {
    switch (action.type) {
        case "LIGHT_THEME":
            return (state = lightTheme);
        case "DARK_THEME":
            return (state = darkTheme);
        default:
            return state;
    }
};

export default theme;
