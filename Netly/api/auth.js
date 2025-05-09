import axios from './axios.js';

export const registerRequest = user =>  axios.post('/api/register', user);
export const loginRequest = user =>  axios.post('/api/login', user);
export const logoutRequest = () =>  axios.post('/api/logout');
export const deleteAuthRequest = () =>  axios.delete('/api/delete-auth');
export const verifyTokenRequest = () =>  axios.get('/api/verify');