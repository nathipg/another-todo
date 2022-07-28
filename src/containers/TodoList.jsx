import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorMessage } from '../components/ErrorMessage';
import { Menu } from '../components/Menu';
import { ToDoItem } from '../components/ToDoItem';

import { REQUEST_STATUS } from '../shared/constants';

import { selectAllToDos, selectToDosError, selectToDoStatus, toggleToDo } from '../store/slices/todosSlice';

export const TodoList = () => {
  const dispatch = useDispatch();

  const toDos = useSelector(selectAllToDos);
  const toDosStatus = useSelector(selectToDoStatus);
  const toDosError = useSelector(selectToDosError);

  const toDoClickHandler = useCallback((toDo) => () => {
    const payload = {
      id: toDo.id,
      completed: toDo.completed
    };
    dispatch(toggleToDo(payload));
  }, [dispatch]);

  const renderToDos = () => {
    if(!toDos.length) {
      return <li>Nothing to do today, have fun!</li>;
    }

    const sortedToDos = [...toDos].sort((a, b) => +a.completed - +b.completed);

    return sortedToDos.map(toDo => <ToDoItem key={`toDo${toDo.id}`} toDo={toDo} onClickHandler={toDoClickHandler(toDo)} />);
  };

  const CONTENT_MAPPER = {
    [REQUEST_STATUS.LOADING]: <span>Loading...</span>,
    [REQUEST_STATUS.FAILED]: <ErrorMessage message={toDosError} />,
    [REQUEST_STATUS.SUCCEEDED]: (
      <>
        <ul>
          {renderToDos()}
        </ul>
      </>
    ),
  };

  return (
    <>
      <h1>ToDo List</h1>
      <Menu />
      {CONTENT_MAPPER[toDosStatus]}
    </>
  );
};
