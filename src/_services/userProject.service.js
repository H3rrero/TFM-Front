import config from 'config';
import { authHeader } from '../_helpers';

export const userProjectService = {
    getAll,
    getProjectByUser,
    getUserByProject,
    getByUserAndProject,
    changeUserProject,
    createUserProject,
    deleteUserAndProject,
    getUserWithoutProject
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
    return fetch(`${config.apiUrl}/userEvents`, requestOptions).then(handleResponse);
}
function getProjectByUser(idUser) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/userProjects/projects/${idUser}`, requestOptions).then(handleResponse);
}
function getUserByProject(idProject) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/userProjects/users/${idProject}`, requestOptions).then(handleResponse);
}
function getUserWithoutProject() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/usersWithoutProject`, requestOptions).then(handleResponse);
}
function getByUserAndProject(idUser,idProject) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/userProjects/users/${idUser}/${idProject}`, requestOptions).then(handleResponse);
}
function deleteUserAndProject(idUser,idProject) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/userProjects/users/${idUser}/${idProject}`, requestOptions).then(handleResponse);
}
function changeUserProject(idUser,idProject,userProject) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(userProject)
    };
    return fetch(`${config.apiUrl}/userProjects/users/${idUser}/${idProject}`, requestOptions).then(handleResponse);
}

function createUserProject(userProject) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(userProject)
    };
    return fetch(`${config.apiUrl}/userProjects`, requestOptions).then(handleResponse);
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