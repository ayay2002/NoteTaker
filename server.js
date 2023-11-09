const express = require('express')
const fs = require('fs')
const path = require('path')
const data = require('./notes.json')

const PORT = 8080;
const server = express();

server.use(express.static('public'));

// get route for homepage
server.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get route for notes
server.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// get route for invalid route to 404 page
server.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/404.html'))
);
// launches server
server.listen(PORT, () =>
    console.log('Page listening at http://localhost:8080')
)