const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const route = require('./route/route');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://gautamku1122:Sae755%40gautam@gautam.p4ovs.mongodb.net/Project02-Intern", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use("/", route)

app.listen(process.env.PORT || 3000, (err)=> {
    console.log("Connected to PORT 3000")
})