process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Remove in production

const axios = require('axios');

const callApi = async () => {
    try {
        const response = await axios.post('https://bloxberg-qa-traefik.mpdl.mpg.de/api/update-validators-details');
    } catch (error) {
        console.log('Error calling API:', error);
    }
};

callApi();