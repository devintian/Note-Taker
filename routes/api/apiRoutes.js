const express = require("express");
const uuid = require("uuid");
const path = require('path');
const Router = express.Router();

const notesHandler = new (require("../../db/notesDataHandler"))();
// const NotesHandler = require("../../db/notesDataHandler");
// const notesHandler = new NotesHandler();

Router.get("/", async (req, res) => {
  const notesData = await notesHandler.readNotesData();
  res.json(notesData);

});

//get notes
Router.get("/:id", async (req, res) => {
  const notesData = await notesHandler.readNotesData();
  const found = notesData.find(note => note.id === parseInt(req.params.id));
  
  if(found){
    res.json(found);
  }else{
    res.status(400).json({msg: `GET: No notes with the id of ${req.params.id}`});
  }
});

//post notes
Router.post("/", async(req, res) => {
  const notesData = await notesHandler.readNotesData();
  if(!req.body.title || !req.body.text){
    return res.status(400).json({msg: "Please include a title and text."});
  }

  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text
  };
  notesData.push(newNote);
  notesHandler.saveNewNote(notesData);
  res.json(true); 
});

//update notes
Router.put("/:id", async(req, res) => {
  let notesData = await notesHandler.readNotesData();
  const found = notesData.find(note => note.id === req.params.id);
  
  if(found){
    const updNote = req.body;
    notesData.forEach(note => {
      if(note.id === req.params.id){
        note.title = updNote.title ? updNote.title : note.title;
        note.text = updNote.text ? updNote.text : note.text;
      }
    });
    notesHandler.saveNewNote(notesData);
    res.json(true);
  }else{
    res.status(400).json({msg: `PUT: No notes with the id of ${req.params.id}`});
  }
});

//delete notes
Router.delete("/:id", async(req, res) => {
  let notesData = await notesHandler.readNotesData();

  const found = notesData.find(note => note.id === req.params.id);
  if(found){
    notesData = notesData.filter(note => note.id !== req.params.id);
    notesHandler.saveNewNote(notesData);
    res.json(true);
  }else{
    res.status(400).json({msg: `DELETE: No notes with the id of ${req.params.id}`});
  } 
});

module.exports = Router;