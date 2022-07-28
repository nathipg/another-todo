import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Menu } from '../components/Menu';

import { selectToDoById } from '../store/slices/todosSlice';

export const TodoDetails = () => {
  const navigate = useNavigate();

  const { toDoId = null } = useParams();

  const toDo = useSelector(selectToDoById(+toDoId));

  useEffect(() => {
    if(!toDo) {
      return navigate('/');
    }
  }, [navigate, toDo]);

  return (
    <>
      <h1>Todo Details</h1>
      <Menu />
      <p>Id: {toDo?.id}</p>
      <p>Title: {toDo?.title}</p>
    </>
  );
};
