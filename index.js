const express = require('express');
const fs = require('fs');
const app = express();

app.listen(2609, console.log('Se ha iniciado el servidor en el puerto 2609'));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/canciones', (req, res) => {
  const repertorio = JSON.parse(fs.readFileSync('repertorio.json', 'UTF-8'));

  res.json(repertorio);
});

app.post('/canciones', (req, res) => {
  const cancion = req.body;
  const repertorio = JSON.parse(fs.readFileSync('repertorio.json', 'UTF-8'));
  repertorio.push(cancion);
  fs.writeFileSync('repertorio.json', JSON.stringify(repertorio));

  res.send('Se ha agregado la canción al repertorio');
});

app.delete('/canciones/:id', (req, res) => {
  const { id } = req.params;
  const repertorio = JSON.parse(fs.readFileSync('repertorio.json', 'UTF-8'));

  const idx = repertorio.findIndex((r) => r.id == id);
  repertorio.splice(idx, 1);
  fs.writeFileSync('repertorio.json', JSON.stringify(repertorio));

  res.send('Canción eliminada del repertorio');
});

app.put('/canciones/:id', (req, res) => {
  const cancionEditada = req.body;
  const { id } = req.params;
  const repertorio = JSON.parse(fs.readFileSync('repertorio.json', 'UTF-8'));

  const idx = repertorio.findIndex((r) => r.id == id);
  repertorio[idx] = cancionEditada;
  fs.writeFileSync('repertorio.json', JSON.stringify(repertorio));

  res.send(
    `Se ha editado la canción ${repertorio[idx].titulo} en el repertorio`
  );
});
