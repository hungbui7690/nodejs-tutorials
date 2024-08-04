/*
  Setup
  1.  npm init -y

  2.  npm install express @types/express --save-dev
      npm install typescript @types/node --save-dev

  3.  npx tsc --init -> create tsconfig.json


  - @types/express: TypeScript declaration files for Express.
  - The --save-dev flag ensures that these dependencies are saved as devDependencies, as they are only required during the development process


******************

  - To run ts project:
  
      @@ npm install -g tsx
      -> tsx app.ts
      -> tsx watch app.ts


  - package.json

      "scripts": {
        "dev": "tsx watch app.ts",
        "start": "tsx app.ts"
      }


*/

// 1. with TS, we will need to import type as well
import express, { type Request, type Response } from 'express'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
