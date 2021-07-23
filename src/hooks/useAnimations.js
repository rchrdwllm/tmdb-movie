import { useSelector } from "react-redux";

export const useAnimations = () => {
    const currentTheme = useSelector((state) => state.theme);

    const transition = {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
    };

    const menuReveal = {
        initial: {
            height: 0,
            transition: transition,
        },
        animate: {
            height: "90vh",
            transition: transition,
        },
    };

    const navOpacity = {
        initial: {
            backgroundColor: currentTheme.bgOpacity,
            transition: transition,
        },
        animate: {
            backgroundColor: currentTheme.bgOpacity2,
            transition: transition,
        },
    };

    const opacityReveal = {
        initial: { opacity: 0, transition: { ...transition, duration: 0.5 } },
        animate: { opacity: 1, transition: { ...transition, duration: 0.5 } },
    };

    return {
        transition,
        menuReveal,
        navOpacity,
        opacityReveal,
    };
};
