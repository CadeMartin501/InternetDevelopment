"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Internet Development!');
});

app.get('/example', (req, res) => {
    res.send('This is an example route.');
});

app.get('/test', (req,res) => {
    res.send('This is my test route.');
})

app.get('/math/:number', (req,res) => {
    const number = parseInt(req.params.number);
    if (number) {
        if (number == 42) {
            res.send('42 is the coolest');
        } else {
            res.send(`${number} is boring`);
        }
    } else {
        res.send(`${req.params.number} is not a number`);
    }
})

app.get('/power/:base/:power', (req, res) => {
    const base = parseInt(req.params.base);
    const power = parseInt(req.params.power);
    res.send(base**power);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
