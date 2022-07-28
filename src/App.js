import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { TodoDetails } from './containers/TodoDetails';
import { TodoList } from './containers/TodoList';

import { ErrorMessage } from './components/ErrorMessage';

import { selectError, setError } from './store/slices/errorSlice';
import { login, selectLoggedUser } from './store/slices/loginSlice';
import { fetchToDos } from './store/slices/todosSlice';
import { fetchUsers, selectAllUsers, selectUsersError, selectUsersStatus } from './store/slices/usersSlice';

import { REQUEST_STATUS } from './shared/constants';

export const App = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectError);

  const loggedUser = useSelector(selectLoggedUser);

  const users = useSelector(selectAllUsers);
  const usersError = useSelector(selectUsersError);
  const usersStatus = useSelector(selectUsersStatus);

  useEffect(() => {
    if (usersStatus === REQUEST_STATUS.FAILED) {
      const payload = {
        code: 500,
        message: usersError,
      };

      dispatch(setError(payload));
    }
  }, [dispatch, usersError, usersStatus]);

  useEffect(() => {
    if(usersStatus === REQUEST_STATUS.IDLE) {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  useEffect(() => {
    if(usersStatus === REQUEST_STATUS.SUCCEEDED) {
      const firstUser = users[0] ?? null;
  
      dispatch(login(firstUser));
    }
  }, [dispatch, users, usersStatus]);

  useEffect(() => {
    if(loggedUser) {
      dispatch(fetchToDos(loggedUser.id));
    }
  }, [dispatch, loggedUser]);

  return (
    <BrowserRouter>
      <Routes>
        {error.code && <Route path="*" element={<ErrorMessage error={error} />} />}
        {!error.code && (
          <>
            <Route path="/details/:toDoId" element={<TodoDetails />} />
            <Route path="/" element={<TodoList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
