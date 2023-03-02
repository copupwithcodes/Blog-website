// import express from express;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogRouter = require("./routes/blog-routes");
const  router  = require("./routes/user-routes");
mongoose.set('strictQuery', true);
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/users",router) ;
app.use("/api/blog",blogRouter);

mongoose
.connect("mongodb+srv://admin:RR0R835acTzzUHuP@cluster0.x5lcyjo.mongodb.net/Blog?retryWrites=true&w=majority")
.then(()=> app.listen(3000))
.then(()=> 
  console.log("Connected to database and listening to port 3000")
)
.catch((err)=> console.log(err));

