/*
  Validators
  - npm install express-validator @types/express-validator

    -> use in controller


*/

import express, { Request, Response } from 'express'
import morgan from 'morgan'
import taskRouter from './routes/task'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(morgan('tiny'))

app.use('/api', taskRouter) // mount task API routes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!')
})

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Page not found' })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
