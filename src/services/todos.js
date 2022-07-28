import axios from 'axios';

export const fetchToDos = async (userId) => {
  const { data = [] } = await axios.get('https://jsonplaceholder.typicode.com/todos');

  return data.filter(toDo => toDo.userId === userId);
};
