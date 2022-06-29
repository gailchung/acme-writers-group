
const axios = require('axios');



const createUser = async(user)=> {
    const response = await axios.post('/api/users', user);
    return response.data;
};

const deleteUser = (user)=> {
    const response=axios.delete(`/api/users/${user.id}`);
    return response.data
  };
  const deleteStory = (id)=> {
    return axios.delete(`/api/stories/${id}`);
  }

  export {
    deleteUser,
    createUser,
    deleteStory
  }