import config from 'config';
import { authHeader } from '../_helpers';
import 'whatwg-fetch'; 

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    getByProject,
    getByUserAndMail,
    checkAnswer,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.removeItem('loginError');
            }

            return user;
        }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function getByProject(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/usersbyproject/${id}`, requestOptions).then(handleResponse);
}

function getByUserAndMail(user,mail) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/checkmail/${user}/${mail}`, requestOptions).then(handleResponse);
}
function checkAnswer(user,mail) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/checkanswer/${user}/${mail}`, requestOptions).then(handleResponse);
}
function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401  ) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            if(response.status === 429 || response.status === 400){
                logout();
                location.reload(true);
                localStorage.setItem('loginError', JSON.stringify(data));
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}