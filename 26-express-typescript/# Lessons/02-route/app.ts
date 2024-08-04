/*
  Model vs Route
  1. model/task.ts
  2. routes/task.ts


****************************


*/

import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
