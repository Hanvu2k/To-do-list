import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';


import './TodoList.scss';
import Spin from 'components/Spin';
import ArrayToDo from 'components/ArrayToDo';
import AddGroupTask from 'components/AddGroupTask';

export default function ToDoList() {
  const [isLogOut, setIsLogOut] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    loadToken();
    loadListGroups();
  }, []);

  const loadToken = () => {
    const token = localStorage.getItem('jwt-todo');
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  };

  const loadListGroups = async () => {
    setSpinning(true);
    try {
      const { data } = await axios.get('task/group');
      if (data.success) setGroups(data.groups);
    } catch (error) {
      console.log(error);
      return error;
    }
    setSpinning(false);
  };

  const handleAddJob = async newJob => {

    if (!newJob) {
      alert('Missing input');
      return;
    } else {
      setSpinning(true);
      let res = await axios.post('task/', newJob);
      if (res) {
        setJobs([...jobs, newJob]);
      }
    }
    setSpinning(false);
  };

  const handleDelete = async id => {
    let currentJob = [...jobs];
    setSpinning(true);
    let res = await axios.delete(`task/${id}`);
    if (res) {
      currentJob = currentJob.filter(item => item._id !== id);
      setJobs(currentJob);
    }
    setSpinning(false);
  };

  const handleEditJob = async (editJob) => {

    let isEmpty = Object.keys(editJob).length === 0;
    setSpinning(true);
    let res = await axios.patch(`task/${editJob._id}`, editJob);
    if (res && !isEmpty) {
      let currentJob = [...jobs];
      let editIndex = currentJob.findIndex(item => item._id === editJob._id);
      currentJob[editIndex] = editJob
      setJobs(currentJob);
    }

    setSpinning(false);
  };

  const handleAddGroupTask = async (groupTask) => {
    if (!groupTask) {
      alert("Please type a group")
      return
    } else {
      setSpinning(true);
      let res = await axios.post('task/group/', groupTask);
      if (res) {
        setGroups([...groups, groupTask])
      }
    }
    setSpinning(false);
  }

  const handleLogOut = () => {
    setIsLogOut(true);
  };

  return (
    <Spin spinning={spinning}>
      {isLogOut && <Navigate to="/" replace={true} />}

      <div className="container-todo">
        {groups.map((group, idx) => {
          return <ArrayToDo key={idx}
            groups={groups}
            group={group}
            handleAddJob={handleAddJob}
            handleDelete={handleDelete}
            handleEditJob={handleEditJob}
            jobs={jobs} />;
        })}
        <AddGroupTask handleAddGroupTask={handleAddGroupTask} />
        <button className="logout" onClick={handleLogOut}>
          <AiOutlineLogout />
        </button>
      </div>
    </Spin>
  );
}
