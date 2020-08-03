import axios from 'axios';

// Cliente axios para petiones rest
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default axiosClient;