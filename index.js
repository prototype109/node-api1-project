// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.listen(4000, () => {
    console.log('Server Listening on http://localhost:4000');
})

server.post('/api/users', (req, res) => {
    const reqBody = req.body;

    db.insert(reqBody)
        .then(user => {
            if(reqBody.name && reqBody.bio)
                res.status(201).json(user);
            else
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })

})