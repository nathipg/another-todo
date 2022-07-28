import axios from 'axios';

export const fetchUsers = async () => {
  const { data = [] } = await axios.get('https://jsonplaceholder.typicode.com/users');

  return data.map(user => {
    const { id, name } = user;

    return {
      id,
      name,
    };
  });
};
