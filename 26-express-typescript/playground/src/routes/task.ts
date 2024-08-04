import express, { Request, Response } from 'express'
import { Task } from '../model/task'
import data from '../data.json'
import { body, validationResult } from 'express-validator'

const router = express.Router()

let tasks: Task[] = data

// 1.
const taskValidationRules = [
  body('title').notEmpty().withMessage('"title" is required'),
  body('description').notEmpty().withMessage('"title" is required'),
  body('completed').isBoolean().withMessage('"completed" must be a boolean'),
]

// create task
router.post('/tasks', taskValidationRules, (req: Request, res: Response) => {
  // 2a.
  const errors = validationResult(req)

  // 2b.
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const task: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  }

  tasks.push(task)
  res.status(201).json(task)
})

router.get('/tasks', (req: Request, res: Response) => {
  res.status(200).json(tasks)
})

router.get('/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id))
  console.log(task)

  if (!task) res.status(404).send('Task not found')

  res.status(200).json(task)
})

router.patch('/tasks/:id', (req: Request, res: Response) => {
  const errors = validationResult(req) // 3a.

  // 3b.
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

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
