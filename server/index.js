const express = require('express')
const cors = require('cors');
const router = require('./routes/routes.js')
const userRouter = require('./routes/userRoutes.js');






const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend to access the API
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Specify allowed methods
    credentials: true // If you need to allow credentials
  }));
app.use('/todos',router);
app.use('/user',userRouter);



app.listen(process.env.PORT,()=>{
    console.log(`this server is running on ${process.env.PORT}`)
})