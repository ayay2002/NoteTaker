const express = require('express')
const fs = require('fs')
const path = require('path')
const data = require('./notes.json')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readFromFile = util.promisify(fs.readFile);

const PORT = 8080;
const server = express();

// making public folder static for users
server.use(express.static('public'));

// middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// get route for homepage
server.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// get route for notes
server.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// get route for invalid route to 404 page

server.route('/api/notes')
.get(function (req, res) {
  readFromFile('notes.json').then((data) => res.json(JSON.parse(data)));
})

.post(function (req, res) {
  console.log(req.body);
  
  const { title, text } = req.body;
  
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
    
    readAndAppend(newNote, './notes.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding Note');
  }
});
server.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/404.html'))
);

// launches server
server.listen(PORT, () =>
    console.log('Page listening at http://localhost:8080')
)