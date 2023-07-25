const express = require('express');
const fs = require('fs');
const app = express();

app.listen(2609, console.log('Se ha iniciado el servidor en el puerto 2609'));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
