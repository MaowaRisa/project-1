import express, { NextFunction, Request, Response } from 'express'
const app = express()
const port = 3000
// Parsers
app.use(express.json())
app.use(express.text())

// Routing in express
const userRouter = express.Router();
const courseRouter = express.Router();

app.use('/api/v1/users', userRouter)
app.use('/api/v1/courses', courseRouter)

userRouter.get(
  '/create-user',
  (req: Request, res: Response) =>{
    const user = req.body;
    console.log(user);
    res.json({
      success: true,
      message: "User is successfully created.",
      data: user
    })
  }
)
courseRouter.post(
  '/create-course',
  (req: Request, res: Response) =>{
    const course = req.body
    console.log(course)

    res.json({
      success: true,
      message: "Successfully created",
      data: course
    })
  }
)
// Middleware
const logger = (req: Request, res:Request, next: NextFunction) =>{
  console.log(req.url, req.method, req.hostname);
  next();
}

app.get('/',logger,async(req : Request, res: Response, next: NextFunction) => {
  try{
    // res.send('Hello World Rocks!')
    res.send(something)
  }catch(err){
    next(err) // it will pass the error to the global error handler
    // console.log(err)
    // res.status(400).json({
    //   success: false,
    //   message: "failed to get data"
    // })
  }
})
app.post('/', (req: Request, res:Response)=>{
  console.log(req.body)
  res.send('Got data')
})

// For invalid route 
app.all("*", (req: Request, res: Response)=>{
  res.status(400).json({
    success: false,
    message: "Route is not found"
  })
})

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction)=>{
  if(error){
    res.status(400).json({
      success : false,
      message: "Something went wrong"
    })
  }
})
export default app;
