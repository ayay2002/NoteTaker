const express = require('express')
const fs = require('fs')
const path = require('path')
const data = require('./notes.json')
const { uuid } = require('uuidv4');

const PORT = 8080;
const server = express();

server.use(express.static('public'));
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
server.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/404.html'))
);

server.route('/api/notes')
    .get(function (req, res) {
        res.json(data)
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
      
          readAndAppend(newNote, '/notes.json');
          res.json(`Note added successfully`);
        } else {
          res.error('Error in adding Note');
        }
      });

    // .post(function (req, res) {
    //     var json = path.join(__dirname, './notes.json');
    //     var myNote = req.body;

    //     // This allows the test note to be the original note.
    //     var highestId = 99;
    //     // This loops through the array and finds the highest ID.
    //     for (var i = 0; i < database.length; i++) {
    //         var individualNote = database[i];

    //         if (individualNote.id > highestId) {
    //             // highestId will always be the highest numbered id in the notesArray.
    //             highestId = individualNote.id;
    //         }
    //     }
    //     // This assigns an ID to the myNote. 
    //     myNote.id = highestId + 1;
    //     // We push it to db.json.
    //     database.push(myNote)

    //     // Write the db.json file again.
    //     fs.writeFile(json, JSON.stringify(database), function (err) {

    //         if (err) {
    //             return console.log(err);
    //         }
    //         console.log("Your note was saved!");
    //     });
    //     // Gives back the response, which is the user's new note. 
    //     res.json(myNote);
    // });












// launches server
server.listen(PORT, () =>
    console.log('Page listening at http://localhost:8080')
)