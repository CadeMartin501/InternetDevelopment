"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/hello/:name', (req, res) => {
    const theName = req.params.name;
  console.log('Attached to the base route.');
  //res.render(filename, parameters);
  res.render('hello', {name: theName});
});

app.get('/example', (req, res) => {
    console.log('Attached to example route');
    res.send('This is an example route.');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});