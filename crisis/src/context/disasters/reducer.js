const initialState = {
    projects: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PROJECTS_REQUEST":
            return {
                ...state,
                isLoading: true,
            };
        case "FETCH_PROJECTS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                projects: action.payload,
            };
        case "FETCH_PROJECTS_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload,
            };
        case "ADD_PROJECT_SUCCESS":
            return { ...state, projects: [...state.projects, action.payload] };
        default:
            return state;
    }
};
