import { API_ENDPOINT } from "../../config/constants";

export const fetchProjects = async (dispatch) => {
    const token = localStorage.getItem("authToken") || "";

    try {
        dispatch({ type: "FETCH_PROJECTS_REQUEST" });
        const response = await fetch(`${API_ENDPOINT}/projects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: data });
    } catch (error) {
        console.log("Error fetching projects:", error);
        dispatch({
            type: "FETCH_PROJECTS_FAILURE",
            payload: "Unable to load projects",
        });
    }
};

export const addProject = async (dispatch, args) => {
    try {
        const token = localStorage.getItem("authToken") || "";
        const response = await fetch(`${API_ENDPOINT}/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(args),
        });
        if (!response.ok) {
            throw new Error("Failed to create project");
        }
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
            return { ok: false, error: data.errors[0].message };
        }

        dispatch({ type: "ADD_PROJECT_SUCCESS", payload: data });

        return { ok: true };
    } catch (error) {
        console.error("Operation failed:", error);
        return { ok: false, error };
    }
};
