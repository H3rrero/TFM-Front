import config from 'config';
import { authHeader } from '../_helpers';

export const phaseService = {
    getAll,
    getById,
    createPhase,
    getByProject
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
    return fetch(`${config.apiUrl}/phases`, requestOptions).then(handleResponse);
}
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/phases/${id}`, requestOptions).then(handleResponse);
}
function createPhase(phase) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(phase)
    };
    return fetch(`${config.apiUrl}/phases`, requestOptions).then(handleResponse);
}
function getByProject(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/phasebyproject/${id}`, requestOptions).then(handleResponse);
}
function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
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