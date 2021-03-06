import config from 'config';
import { authHeader } from '../_helpers';

export const stateService = {
    getAll,
    getByProject,
    update,
    createState,
    remove
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
    return fetch(`${config.apiUrl}/states`, requestOptions).then(handleResponse);
}
function getByProject(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/states/byproject/${id}`, requestOptions).then(handleResponse);
}
function update(state) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(state)
    };
    return fetch(`${config.apiUrl}/states/${state.id}`, requestOptions).then(handleResponse);
}
function createState(state) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(state)
    };
    return fetch(`${config.apiUrl}/states`, requestOptions).then(handleResponse);
}
function remove(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/states/${id}`, requestOptions).then(handleResponse);
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