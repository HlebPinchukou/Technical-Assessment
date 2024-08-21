import axios from 'axios';

const API_URL = 'https://raw.githubusercontent.com/Phangster/Accredify-FE-Interview-Endpoint/main/goals.json';

const goalService = {
    fetchGoals: () => axios.get(API_URL),
};

export default goalService;
