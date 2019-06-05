import config from 'config';
import { authHeader } from '../_helpers';

export const projectService = {
    getAll,
    getById,
    createProject,
    update,
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
    return fetch(`${config.apiUrl}/projects`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/projects/${id}`, requestOptions).then(handleResponse);
}

function remove(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/projects/${id}`, requestOptions).then(handleResponse);
}

function createProject(project) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(project)
    };
    return fetch(`${config.apiUrl}/projects`, requestOptions).then(handleResponse);
}

function update(project) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(project)
    };
    return fetch(`${config.apiUrl}/projects/${project.id}`, requestOptions).then(handleResponse);
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