import config from 'config';
import { authHeader } from '../_helpers';

export const taskService = {
    getAll,
    changeTask,
    getByPhase,
    createTask
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
    console.log("service task");
    return fetch(`${config.apiUrl}/tasks`, requestOptions).then(handleResponse);
}
function getByPhase(idPhase) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("service task");
    return fetch(`${config.apiUrl}/tasks/tasksByPhase/${idPhase}`, requestOptions).then(handleResponse);
}
function changeTask(task) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(task)
    };
    console.log(task);
    return fetch(`${config.apiUrl}/tasks/${task.id}`, requestOptions).then(handleResponse);
}
function createTask(task) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(task)
    };
    console.log(task);
    return fetch(`${config.apiUrl}/tasks/register`, requestOptions).then(handleResponse);
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