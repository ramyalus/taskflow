import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const navigate = useNavigate();

  // 🔹 Handle Edit
  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setEditTaskId(task.id);
    setShowForm(true);
  };

  // 🔹 Check login + fetch tasks
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    } else {
      fetchTasks();
    }
  }, []);

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get('http://localhost:3000/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Create task
  const createTask = async () => {
    try {
      await axios.post(
        'http://localhost:3000/tasks',
        {
          title,
          description,
          status, // ✅ dynamic status
          user_id: 1
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      resetForm();
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Update task
  const updateTask = async () => {
    try {
      await axios.put(
        `http://localhost:3000/tasks/${editTaskId}`,
        {
          title,
          description,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      resetForm();
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Reset form
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('todo');
    setEditTaskId(null);
    setShowForm(false);
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <h2>Task Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Create Button */}
      <button
        className="btn btn-primary mt-3"
        onClick={() => setShowForm(!showForm)}
      >
        + Create Task
      </button>

      {/* Form */}
      {showForm && (
        <div className="card p-3 mt-3">
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <select
            className="form-control mb-2"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={editTaskId ? updateTask : createTask}
            >
              {editTaskId ? "Update Task" : "Create Task"}
            </button>

            <button
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="mt-4">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="card p-3 mb-2">
              <h5>{task.title}</h5>
              <p>{task.description}</p>

              {/* Status */}
              <span
                className={`badge ${
                  task.status === 'todo'
                    ? 'bg-secondary'
                    : task.status === 'in_progress'
                    ? 'bg-warning'
                    : 'bg-success'
                }`}
              >
                {task.status}
              </span>

              {/* Buttons */}
              <div className="mt-2">
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;