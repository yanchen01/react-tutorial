import { useState, useCallback } from 'react';

const useHTTP = (reqConfig, applyData) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState(null);

	const sendRequest = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(reqConfig.url, {
				method: reqConfig.method ? reqConfig.method : 'GET',
				headers: reqConfig.headers ? reqConfig.headers : {},
				body: reqConfig.body ? JSON.stringify(reqConfig.body) : null
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();

			applyData(data);
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	}, [reqConfig, applyData]);

	return {
		isLoading,
		error,
		sendRequest
	};
};

export default useHTTP;
