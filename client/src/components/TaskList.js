import { Button, Card, CardContent, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function TaskList() {

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    loadTasks();
  }, [])

  const loadTasks = async () => {
    const response = await fetch('http://localhost:3001/tasks')
    const data = await response.json();
    setTasks(data);
  }

  const handleDelete = async (id) => {
    try {
     await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      })
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <h1>Task List</h1>
      {
        tasks.map((task) => (
          <Card key={task.id} style={{
            marginBottom: '.7rem',
            backgroundColor: '#AEB6BF'
          }} >
            <CardContent style={{
              display: 'flex',
              justifyContent: 'space-between'
            }} >
              <div style={{ color: '#1C2833' }} >
                <Typography> Title: {task.title} </Typography>
                <Typography> Description: {task.description} </Typography>
              </div>
              <div>
                <Button variant="contained" color="inherit" onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                  Edit
                </Button>
                <Button variant="contained" color="inherit" style={{ marginLeft: '0.5rem' }} onClick={() => handleDelete(task.id)} >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </>
  )
}