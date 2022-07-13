const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let notes = [
    {
        'id': 3,
        'content': 'Estudiar GraphQL para hacer llamadas a DDBB',
        'date': '2022-07-13T19:05:14.298Z',
        'important': true
    },
    {
        'id': 1,
        'content': 'Estudiar MongoDB DDBB no relacionales',
        'date': '2022-07-13T20:05:14.298Z',
        'important': true
    },
    {
        'id': 2,
        'content': 'Estudiar deply en Heroku',
        'date': '2022-07-13T13:05:14.298Z',
        'important': true
    },
]

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.get("/api/notes", (req, res) => {
    res.json(notes)
})

app.get("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        res.json(note)
    } else {
        res.status(400).end
    }
})

app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post("/api/notes", (req, res) => {
    const note = req.body
    if(!note || !note.content){
        return res.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = note.map(note => note.id)
    const maxId = Match.max(...ids)
    
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = notes.concat(newNote);

    res.status(201).json(newNote);
})

const PORT = 4100;
app.listen(PORT, () => {
    console.log('Server running in port ', PORT);
})