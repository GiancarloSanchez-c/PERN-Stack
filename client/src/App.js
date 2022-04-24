import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Navbar from './components/Navbar'
import './App.css';
import { Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>

          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<TaskForm />} />
          <Route path='/tasks/:id/edit' element={<TaskForm />} />
          
        </Routes>
      </Container>
    </>
  );
}

export default App;
