const { Router } = require('express')
const pool = require('../dbPostgres')
const router = Router();

const { getAllTask, getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks.controllers')


router.get('/tasks', getAllTask)

router.get('/tasks/:id', getTask)

router.post('/tasks', createTask)

router.put('/tasks/:id', updateTask )

router.delete('/tasks/:id', deleteTask )

module.exports = router;