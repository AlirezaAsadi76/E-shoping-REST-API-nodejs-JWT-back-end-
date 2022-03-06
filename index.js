const express = require('express');
const app=express();
const mongoose = require('mongoose');
const debug=require('debug')("app:main");
const dotenv= require('dotenv');
const apiRouter=require('./routes');
const cors =require('cors');
dotenv.config();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URL).then(()=>{
debug('mongodb connection');
}).catch(err => debug("faild connet to database"));

app.use('/api',apiRouter);

const port=process.env.PORT || 3000;
app.listen(port,() => {console.log(`listening on ${port}`);});