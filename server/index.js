const express = require('express')
const cors = require('cors');
const router = require('./routes/routes.js')






const app = express();

app.use(express.json());
app.use(cors());
app.use('/',router);



app.listen(process.env.PORT,()=>{
    console.log(`this server is running on ${process.env.PORT}`)
})