import { Link } from 'react-router-dom';

import styles from './ToDoItem.module.scss';

export const ToDoItem = (props) => {
  const { toDo, onClickHandler } = props;

  const classes = [styles.ToDoItem];

  if (toDo.completed) {
    classes.push(styles.Completed);
  }

  return <li className={classes.join(' ')}>
    <span onClick={onClickHandler}>{toDo.title}</span>
    <Link to={`/details/${toDo.id}`}>[details]</Link>
  </li>;
};
