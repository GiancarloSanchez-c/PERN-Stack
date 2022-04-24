const pool = require('../dbPostgres');


const getAllTask = async (req, res,next) => {

  try {
    const allTasks = await pool.query('SELECT * FROM task')
    res.send(allTasks.rows)
  } catch (err) {
    console.log(err.message)
  }
}

const getTask = async (req, res,next) => {

  try {
    
    const { id } = req.params
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err)
  }
}

const createTask = async (req, res,next) => {
  const { title, description } = req.body

  try {
    const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [title, description])

    res.send(result.rows[0])
  } catch (err) {
    next(err)
  }
}

const deleteTask = async (req, res,next) => {
  try {
    const { id } = req.params

    const result = await pool.query('DELETE FROM task WHERE id = $1', [id])

    if (result.rowCount === 0) return res.status(404).json({ message: 'Task not found' })

    res.sendStatus(204);

  } catch (err) {
    next(err)
  }
}

const updateTask = async (req, res,next) => {

  try {
    const { id } = req.params
    const { title, description } = req.body;

    const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING * ', [title, description, id])

    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' })

    return res.json(result.rows[0])
  }
  catch (err) {
    next(err)
  }

}

module.exports = {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask
}