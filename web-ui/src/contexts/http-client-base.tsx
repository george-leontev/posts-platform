import axios from 'axios';
import routes from '../constants/app-api-routes';

const httpClientBase = axios.create({
    baseURL: routes.host,
});

export { httpClientBase };
