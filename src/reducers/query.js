const query = (state = "", action) => {
    switch (action.type) {
        case "UPDATE_QUERY":
            return (state = action.query);
        default:
            return state;
    }
};

export default query;
