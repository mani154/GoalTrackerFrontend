import axios from 'axios';

const BASE_URL = '/api/goals';

const create = async (goalData, token) => {
  const url = BASE_URL + '/post';
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const res = await axios.post(url, goalData, config);
  return res.data;
};

const get = async token => {
  const url = BASE_URL + '/get';
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const res = await axios.get(url, config);
};

const goalService = {
  create,
  get
};

export default goalService;