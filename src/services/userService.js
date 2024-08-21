import axios from 'axios';

const API_BASE_URL = 'https://raw.githubusercontent.com/Phangster/Accredify-FE-Interview-Endpoint/main';

const fetchUser1 = () => {
    return axios.get(`${API_BASE_URL}/user.json`);
};

const fetchUser2 = () => {
    return axios.get(`${API_BASE_URL}/user-personal.json`);
};

export default {
    fetchUser1,
    fetchUser2
};
