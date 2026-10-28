const editor = document.getElementById("editor");
const title = document.getElementById("title");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const clearBtn = document.getElementById("clearBtn");
const status = document.getElementById("status");

const undoStack = [];
const redoStack = [];

let currentText = "";
let isRestoring = false;

// Save a previous version before changing the text.
editor.addEventListener("input", () => {
  if (isRestoring) return;

  undoStack.push(currentText);
  currentText = editor.value;

  // A new edit clears the redo history.
  redoStack.length = 0;

  updateApp();
  status.textContent = "Changes saved";
});

// Undo the latest edit.
undoBtn.addEventListener("click", () => {
  if (undoStack.length === 0) return;

  redoStack.push(editor.value);
  isRestoring = true;

  editor.value = undoStack.pop();
  currentText = editor.value;

  isRestoring = false;
  updateApp();
  status.textContent = "Last action undone";
});

// Redo the latest undone edit.
redoBtn.addEventListener("click", () => {
  if (redoStack.length === 0) return;

  undoStack.push(editor.value);
  isRestoring = true;

  editor.value = redoStack.pop();
  currentText = editor.value;

  isRestoring = false;
  updateApp();
  status.textContent = "Action restored";
});

// Clear the document.
clearBtn.addEventListener("click", () => {
  if (editor.value === "") return;

  undoStack.push(editor.value);
  currentText = "";
  editor.value = "";
  redoStack.length = 0;

  updateApp();
  status.textContent = "Document cleared";
});

// Update buttons and word/character counts.
function updateApp() {
  undoBtn.disabled = undoStack.length === 0;
  redoBtn.disabled = redoStack.length === 0;

  const text = editor.value.trim();
  const words = text ? text.split(/\s+/).length : 0;

  document.getElementById("wordCount").textContent =
    words + (words === 1 ? " word" : " words");

  document.getElementById("charCount").textContent =
    editor.value.length + " characters";
}

title.addEventListener("input", () => {
  status.textContent = "Title updated";
});

updateApp();