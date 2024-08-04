import express, { Request, Response } from 'express'
import { Task } from '../model/task'
import data from '../data.json'

const router = express.Router()
let tasks: Task[] = data

// create task
router.post('/tasks', (req: Request, res: Response) => {
  const task: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  }

  tasks.push(task)
  res.status(201).json(task)
})

// get tasks
router.get('/tasks', (req: Request, res: Response) => {
  res.status(200).json(tasks)
})

// get single task
router.get('/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id))
  console.log(task)

  if (!task) res.status(404).send('Task not found')

  res.status(200).json(task)
})

// update task
router.patch('/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id))

  if (!task) {
    res.status(404).send('Task not found')
  } else {
    task.title = req.body.title || task.title
    task.description = req.body.description || task.description
    task.completed = req.body.completed || task.completed

    res.status(200).json(task)
  }
})

// delete task
router.delete('/tasks/:id', (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id))

  if (index === -1) {
    res.status(404).send('Task not found')
  } else {
    tasks.splice(index, 1)
    res.status(204).json({ success: true, message: 'task deleted' })
  }
})

export default router
