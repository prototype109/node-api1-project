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
                res.status(201).json(reqBody);
            else
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })

})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(user => {
            if(user)
                res.status(200).json(user);
            else
                res.status(404).json({ message: "The user with the specified ID does not exist." });
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." });
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(user => {
            if(user)
                res.status(204).end();
            else
                res.status(404).json({ message: "The user with the specified ID does not exist." });
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" });
        })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const reqBody = req.body;

    db.update(id, reqBody)
        .then(user => {
            if(user){
                if(reqBody.name && reqBody.bio)
                    res.status(200).json(reqBody);
                else
                    res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
            } else
                res.status(404).json({ message: "The user with the specified ID does not exist." });
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." });
        })
})