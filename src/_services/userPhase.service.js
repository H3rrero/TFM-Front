import config from 'config';
import { authHeader } from '../_helpers';

export const userPhaseService = {
    getAll,
    getHoursUser,
    changeUserPhase,
    createUserProject,
    getByUserAndPhase
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
    return fetch(`${config.apiUrl}/userPhases`, requestOptions).then(handleResponse);
}
function getHoursUser(idUser) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/userPhases/${idUser}`, requestOptions).then(handleResponse);
}
function changeUserPhase(idUser,idPhase,userPhase) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(userPhase)
    };
    return fetch(`${config.apiUrl}/userPhases/${idUser}/${idPhase}`, requestOptions).then(handleResponse);
}

function createUserProject(userPhase) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(userPhase)
    };
    return fetch(`${config.apiUrl}/userPhases`, requestOptions).then(handleResponse);
}
function getByUserAndPhase(idUser,idPhase) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/userPhases/${idUser}/${idPhase}`, requestOptions).then(handleResponse);
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