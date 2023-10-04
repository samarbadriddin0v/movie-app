import axios from 'axios';

export const apiRequest = async (endpoint, params) => {
	const options = {
		method: 'GET',
		url: endpoint,
		params: params ? params : {},
	};

	try {
		const { data } = await axios.request(options);
		return data;
	} catch (error) {
		console.log('error', error);
		return error;
	}
};
