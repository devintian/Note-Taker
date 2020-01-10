const noteTitle = $("#noteTitle");
const noteText = $("#noteText");
const saveBtn = $("#saveButton");
const writeBtn = $("#writeButton");
const noteList = $("#noteList");

//selectedList is the flag for selected list item
//used to update the list
//selectedID is to store the ID for the update list
let selectedList;
let selectedID;

displaySavedNotes();

function displayNotes(notes){
    noteList.empty();
    const noteLis = [];
    let length = notes.length;

    for(let i=0; i<length; i++){
        const li = $("<a>").addClass("list-item").attr({
            "data-title":notes[i].title,
            "data-text": notes[i].text,
            "id": notes[i].id
        }).text(notes[i].title);
        const deleteBtn = $("<button>").addClass("delete is-small").attr("id", notes[i].id);
        li.append(deleteBtn)
        noteLis.push(li);
    };
    noteList.append(noteLis);
};

function displaySpecificNote(li){
    noteTitle.val(li.attr("data-title"));
    noteText.val(li.attr("data-text"));
}

function displaySavedNotes(){
    getNotes()
    .then((res) => {
        displayNotes(res);
    });
}

function saveNewNote(){
    let title = noteTitle.val().trim();
    let text = noteText.val().trim();

    let note = {
        title: title,
        text: text
    }
    if(title || text){
        if(selectedList){
            note = {
                id: selectedID,
                title: title,
                text: text
            }
            updateNote(note).then(() => {
                displaySavedNotes();
            });
            selectedList = false;
        }else{
                saveNote(note).then(() => {
                displaySavedNotes();
            });
        }
        noteTitle.val("");
        noteText.val("");
    }   
}

function deleteSpecificNote(li){
    deleteNote(li.attr("id")).then(() => {
        displaySavedNotes();
    });
}

//on click events
saveBtn.on("click", (e) => {
    saveNewNote();
});
writeBtn.on("click", () => {
    noteTitle.val("");
    noteText.val("");
});
noteList.on("click", ".list-item", (e) => {
    displaySpecificNote($(e.target));
    selectedList = true;
    selectedID = $(e.target).attr("id");
})
noteList.on("click", ".delete", (e) => {
    deleteSpecificNote($(e.target));
    //location.reload()is to fix the update bugs
    //if without this line
    //sometimes update will not work
    location.reload();
});

//api functions
function getNotes(){
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
};

function saveNote(note){
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

function deleteNote(id){
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE"
    });
};

function updateNote(note){
    return $.ajax({
        url: "api/notes/" + note.id,
        data: note,
        method: "PUT"
    });
}