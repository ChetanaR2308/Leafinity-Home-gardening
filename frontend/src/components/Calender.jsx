import React, { useState, useEffect } from 'react';

const Calender = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    date: '',
    type: 'watering',
    description: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const taskTypes = {
    watering: { icon: '💧', color: '#2e8b57' },
    maintenance: { icon: '🛠️', color: '#c19a00' },
    planting: { icon: '🌱', color: '#228b22' },
    harvesting: { icon: '🥕', color: '#ff8c00' }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/calender');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.title && newTask.date) {
      try {
        const response = await fetch('http://localhost:5000/api/calender', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
        });
        if (response.ok) {
          const savedTask = await response.json();
          setTasks([...tasks, savedTask]);
          setNewTask({ title: '', date: '', type: 'watering', description: '' });
          setSubmitStatus('success');
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        setSubmitStatus('error');
      }
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: '"Segoe UI", sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#006400',
      marginBottom: '8px',
    },
    subtitle: {
      color: '#555',
      fontSize: '18px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '30px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    taskItem: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '12px',
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      marginBottom: '12px',
    },
    icon: (color) => ({
      fontSize: '24px',
      color: color,
      marginRight: '15px',
      marginTop: '4px',
    }),
    taskText: {
      flexGrow: 1,
    },
    taskTitle: {
      fontWeight: '600',
      fontSize: '16px',
    },
    taskDate: {
      fontSize: '13px',
      color: '#888',
    },
    taskDesc: {
      marginTop: '4px',
      color: '#444',
      fontSize: '14px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#333',
      marginBottom: '5px',
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '14px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#006400',
      color: 'white',
      fontWeight: '600',
      fontSize: '15px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#004d00',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🌿 Plant Care Calendar</h1>
        <p style={styles.subtitle}>Keep track of your gardening routine with ease.</p>
      </div>

      <div style={styles.grid}>
        {/* Upcoming Tasks */}
        <div style={styles.card}>
          <h2 style={{ ...styles.title, fontSize: '24px', color: '#2e8b57', marginBottom: '20px' }}>Upcoming Tasks</h2>
          {tasks
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((task) => (
              <div key={task._id || task.id} style={styles.taskItem}>
                <div style={styles.icon(taskTypes[task.type]?.color || '#000')}>{taskTypes[task.type]?.icon || '🗓️'}</div>
                <div style={styles.taskText}>
                  <div style={styles.taskTitle}>{task.title}</div>
                  <div style={styles.taskDate}>{task.date}</div>
                  <div style={styles.taskDesc}>{task.description}</div>
                </div>
              </div>
            ))}
        </div>

        {/* Add Task Form */}
        <div style={styles.card}>
          <h2 style={{ ...styles.title, fontSize: '24px', color: '#2e8b57', marginBottom: '20px' }}>Add New Task</h2>
          <form onSubmit={handleAddTask}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Task Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                style={styles.input}
                placeholder="e.g. Fertilize Basil"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                value={newTask.date}
                onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Task Type</label>
              <select
                value={newTask.type}
                onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                style={styles.input}
              >
                <option value="watering">Watering</option>
                <option value="maintenance">Maintenance</option>
                <option value="planting">Planting</option>
                <option value="harvesting">Harvesting</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                rows="3"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                style={{ ...styles.input, resize: 'vertical' }}
                placeholder="Brief description..."
                required
              ></textarea>
            </div>

            <button type="submit" style={styles.button}>
              ➕ Add Task
            </button>
          </form>
          {submitStatus === 'success' && <p style={{ color: 'green' }}>Task added successfully!</p>}
          {submitStatus === 'error' && <p style={{ color: 'red' }}>Failed to add task. Please try again.</p>}
        </div>
      </div>
    </div>
  );
};

export default Calender;
