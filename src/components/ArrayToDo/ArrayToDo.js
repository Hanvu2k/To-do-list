import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

import ToDoItem from './ToDoItem';
import AddJob from 'components/AddJob';
import './ArrayToDo.scss';

function ArrayToDo({ handleAddJob, handleDelete, handleEditJob, group, groups, jobs }) {
  const [tasks, setTasks] = useState([]);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    loadListTask();
  }, [jobs]);

  const loadListTask = async () => {
    setSpinning(true);
    try {
      const { data } = await axios.get(`task/${group._id}`);
      setTasks(data.tasks || []);
      setSpinning(false);
      return data;
    } catch (error) {
      console.log(error);
      setSpinning(false);
      return error;
    }
  };

  return (
    <div className="array-todo-wrapper">
      <header className="array-todo-title d-flex  justify-content-between">
        <div>
          {group.group_name} ({tasks.length})
        </div>
        <div className="array-todo-actions"
        >
          <AddJob onAdd={handleAddJob} group_id={group._id} />
        </div>
      </header>

      <div className={`array-todo  ${spinning ? 'd-flex  justify-content-center align-items-center' : ''} `}>
        {(!spinning &&
          tasks.map((item, idx) => {
            return <ToDoItem key={idx} data={item} onDelete={() => handleDelete(item._id)} onEdit={handleEditJob} groups={groups} group={group} />;
          })) || <Spinner animation="border" />}
      </div>
    </div>
  );
}

export default ArrayToDo;
