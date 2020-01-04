const noteTitle = $("#noteTitle");
const noteText = $("#noteText");
const saveBtn = $("#saveButton");
const writeBtn = $("#writeButton");
const noteList = $("#noteList");

let notes = {};

const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

displayNotes();

const displayNotes = (notes){
  noteList.empty();
  const noteLis = [];

  notes.forEach(element => {
    const li = $("<a class='list-item'>").data(element);
    const span = $("<span>").text(note.title);
    const deleteBtn = $('<button class="delete is-small""></button>');
    li.append(span, deleteBtn);
    noteLis.push(li);
  });

  noteList.append(noteLis);
}

saveBtn.on("click", handleNoteSave);
noteList.on("click", "span", handleNoteView);
writeBtn.on("click", handleNewNoteView);
noteList.on("click", ".delete", handleNoteDelete);
noteTitle.on("keyup", handleRenderSaveBtn);
noteText.on("keyup", handleRenderSaveBtn);


