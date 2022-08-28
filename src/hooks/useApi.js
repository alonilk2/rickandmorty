import { useState } from "react";

/**
 * A hook that handles API requests with error and load management.
 * @param {*} apiFunc The API function to use 
 * @returns Object contains data, error, loading and request function.
 */
const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        try {
            const result = await apiFunc(...args);
            setData(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        request
    };
};

export default useApi;