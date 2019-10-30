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
            res.status(201).json({message: 'successfully created user'})
        })
        .catch(err => {
            res.status(500).json({message: `Failed to add user, ${err}`})
        })

})