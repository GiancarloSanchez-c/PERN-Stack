import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress, } from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskForm() {

  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);



  const navigate = useNavigate();
  const params = useParams();

  const loadTask = async (id) => {
    const response = await fetch(`http://localhost:3001/tasks/${id}`)
    const data = await response.json();
    setTask({ title: data.title, description: data.description })
    setEditing(true);

  }

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id])

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      if (editing) {
        const response = await fetch(`http://localhost:3001/tasks/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" }

        });
        await response.json();
      } else {
        await fetch('http://localhost:3001/tasks', {
          method: "POST",
          body: JSON.stringify(task),
          headers: { 'Content-Type': 'application/json' }
        })
      }
      setLoading(false);
      navigate('/')

    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = e =>
    setTask({ ...task, [e.target.name]: e.target.value })


  return (
    <Grid container direction='column' alignItems='center' justifyContent='center' >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }} style={{ backgroundColor: '#AEB6BF', padding: '1rem' }}>
          <Typography variant='5' textAlign='center' color='white' >
            {editing ? "Edit Task" : "Create Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit} >

              <TextField variant='filled' label='Write your title'
                sx={{ display: 'block', margin: '.5rem 0' }}

                name='title'
                value={task.title}
                onChange={handleChange}
                inputprops={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField variant='filled' label='Write your description' multiline rows={4}
                sx={{ display: 'block', margin: '.5rem 0' }}

                value={task.description}
                name='description'
                onChange={handleChange}

                InputLabelProps={{ style: { color: 'white' } }}
                inputprops={{ style: { color: 'white' } }} />

              <Button variant='contained' color='primary' type='submit' disabled={!task.title || !task.description} >
                {loading ? (
                  <CircularProgress color='inherit' size={24} />
                ) : ('Save'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}