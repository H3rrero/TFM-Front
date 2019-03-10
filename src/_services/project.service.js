import config from 'config';
import { authHeader } from '../_helpers';

export const projectService = {
    getAll,
    getById
};


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("service projects");
    return fetch(`${config.apiUrl}/projects`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("service projects");
    return fetch(`${config.apiUrl}/projects/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                console.log(response);
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}