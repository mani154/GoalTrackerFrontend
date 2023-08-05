import axios from 'axios';

const BASE_URL = '/api/users';

const _setUserItem = async (userData, url) => {
    const res = await axios.post(url, userData);

    if(res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }
}
const register = userData => _setUserItem(userData, BASE_URL + '/register');

const login = userData => _setUserItem(userData, BASE_URL + '/login');

const logout = async () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
};

export default authService;