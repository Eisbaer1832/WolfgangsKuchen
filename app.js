const express = require('express')
const path = require('path')
const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');
const { json } = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const favicon = require('serve-favicon');
const http = require('http');
const $ = require('jquery');

//http
const app = express();

const port = 9876;

//app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (_, res) => {res.sendFile('/public/html/index.html', {root: __dirname })});
app.use('/public',express.static('public'));


app.listen(port, () => {console.log(`App listening on port ${port}!`)});

let current_index = 2;

app.post('/public/getData', function(req, res) {  
  res.status(200).send(current_index)  
  
});

