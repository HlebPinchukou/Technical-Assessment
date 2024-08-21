import axios from 'axios';

const API_URL = 'https://raw.githubusercontent.com/Phangster/Accredify-FE-Interview-Endpoint/main/documents.json';

const documentService = {
    fetchDocuments: () => axios.get(API_URL),
};

export default documentService;
