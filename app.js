const express = require('express');
const cookieParser = require('cookie-parser');
const env= require('dotenv');

const {eastablishDBConn} = require('./v1/functions');
const v1Router = require('./v1/router');

env.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

init();

const port = process.env.PORT || 7000;

app.listen(port,(err)=>{
    if(!err){
        console.log("Running on port number "+port);
    }
})


async function init() {
    try {
        console.log(await eastablishDBConn());
        app.use('/api/v1', v1Router);
    }
    catch (err) {
        console.log(err);
        app.use('/', (req, res) => {
            res.sendStatus(500);
        })
    }
}
