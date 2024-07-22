import * as React from 'react';
/**
 * @param {Function} fetchFunction
 * @param {...any} params 
 * @returns {Object} - { data, loading, error, refetch: fetchData}
 */
export const useFetchData = (fetchFunction, ...params) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction(...params);
            setData(result);
        } catch (error) {
            if (error.message === 'Not Found') {
                setData([]);
            } else {
                setError(error.message || 'An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, [fetchFunction, ...params]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
