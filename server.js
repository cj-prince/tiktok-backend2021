const express = require("express");
const mongoose = require("mongoose");
const Videos = require("./dbModel.js");

const Data = require("./data.js")

//  App config
const app = express();
const port = process.env.Port || 8000;

//middleware
app.use(express.json())
app.use((req, res, next)=>{
    res.setHeader('Access-Control_Allow_Origin', '*'),
    res.setHeader('Access-Control_Allow_Headers', '*'),
    next()
})

// db config
const connection_url = 'mongodb+srv://Admin:vP514meOprQpnmCC@cluster0.pt7yu.mongodb.net/tiktok?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
// app endpoint
app.get('/', (req, res) =>   res.status(200).send ("hello world"));
app.get('/v1/posts', (req, res) => res.status(200).send(Data))

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data)=>{
        if (err){
            res.status(500).send(err);
        } else{
            res.status(200).send(data);
        }
    })
})
app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body

    Videos.create(dbVideos, (err, data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})


// app listener

app.listen(port, () => console.log(`listening on localhost: ${port}`));