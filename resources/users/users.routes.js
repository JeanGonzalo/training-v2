const express = require('express');
const uuidv4 = require('uuid/v4');

const validateUser = require('./users.validate');

let users = require('../../db').users;

const usersRoutes = express.Router()

usersRoutes.get('/', (req, res) => {
    res.json(users);
})

usersRoutes.post('/', validateUser, (req, res) => {

    const newUser = {...req.body, id: uuidv4() };
    users.push(newUser);
    res.json(newUser);
})

usersRoutes.put('/:id', (req, res) => {

    const id = req.params.id;
    let userFilter;
    let index; //0

    users.filter((user, i) => {
        if (user.id === id) {
            userFilter = user;
            index = i;
        }

    });

    users[index] = {
        ...userFilter,
        ...req.body
    };

    res.json(users);


})


usersRoutes.delete('/:id', (req, res) => {

    userFilter = users.filter(user => user.id === req.params.id)[0];

    users = users.filter(user => user.id !== req.params.id)[0];

    res.json(userFilter);
});





module.exports = usersRoutes;