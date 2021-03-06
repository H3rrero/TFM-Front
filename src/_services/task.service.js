import config from 'config';
import { authHeader } from '../_helpers';

export const taskService = {
    getAll,
    changeTask,
    getByPhase,
    createTask,
    getByProject,
    getByPhaseAndProject
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
    return fetch(`${config.apiUrl}/tasks`, requestOptions).then(handleResponse);
}
function getByPhase(idPhase) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/taskbyphase/${idPhase}`, requestOptions).then(handleResponse);
}
function changeTask(task) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(task)
    };
    return fetch(`${config.apiUrl}/tasks/${task.id}`, requestOptions).then(handleResponse);
}

function getByProject(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/taskbyproject/${id}`, requestOptions).then(handleResponse);
}
function getByPhaseAndProject(idProject,idPhase) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/taskbyphaseandproject/${idPhase}/${idProject}`, requestOptions).then(handleResponse);
}
function createTask(task) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(task)
    };
    return fetch(`${config.apiUrl}/tasks`, requestOptions).then(handleResponse);
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