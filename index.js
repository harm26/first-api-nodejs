let notes = [
  {
    id: 1,
    content: "My next trip",
    date: "20/06/2020",
    important: true,
  },
  {
    id: 2,
    content: "Hire new intern",
    date: "20/06/2020",
    important: true,
  },
  {
    id: 3,
    content: "Finish my book",
    date: "20/06/2020",
    important: false,
  },
  {
    id: 4,
    content: "Go to the gym now",
    date: "20/06/2020",
    important: true,
  },
  {
    id: 5,
    content: "Go to the movies",
    date: "20/06/2020",
    important: false,
  },
];

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// const bodyParser = require("body-parser");

// use body-parcer middleware

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
  // el id se obtiene del req.params y se pasa a number
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  // genera ids aleatorios
  const ids = notes.map((note) => note.id);
  const newNote = {
    id: Math.max(...ids) + 1,
    content: note.content,
    // typeof para validar si es booleano
    important: typeof note.important !== "undefined" ? note.important : false,
    date: new Date().toISOString(),
  };
  if (!note || !note.content) {
    return res.status(204).end();
  }
  notes = [...notes, newNote];
  res.json(newNote);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// const http = require("http");

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(notes));
// });

// bodyParser = require('body-parser')
// app.listen(port);
// console.log(`app listening on port ${port}`);
