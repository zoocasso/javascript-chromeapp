const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input");

const pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const LIST_LS = "list";

let toDos = [];

function shiftdeleteToDo(event) {
  const btnLi = event.target.parentNode;
  finishedList.removeChild(btnLi);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(btnLi.id);
  });
  toDos = cleanToDos;
  saveTodos();
}

function deleteToDo(event) {
  const btnLi = event.target.parentNode;
  pendingList.removeChild(btnLi);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(btnLi.id);
  });
  toDos = cleanToDos;
  saveTodos();
}

function shiftBackToDo() {
  const btnLi = event.target.parentNode;
  finishedList.removeChild(btnLi);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(btnLi.id);
  });
  const shiftCleanToDos = toDos.filter(function (toDo) {
    return toDo.id === parseInt(btnLi.id);
  });
  const shiftToDos = shiftCleanToDos[0].text;
  toDos = cleanToDos;
  saveTodos();
  paintList(shiftToDos);
}

function shiftPaintList(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", shiftdeleteToDo);
  const shiftBackBtn = document.createElement("button");
  shiftBackBtn.innerText = "<<";
  shiftBackBtn.addEventListener("click", shiftBackToDo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(shiftBackBtn);
  li.id = toDos.length + 1;
  finishedList.appendChild(li);
  const toDosObject = {
    text: text,
    id: toDos.length + 1
  };
  toDos.push(toDosObject);
  saveTodos();
}

function shiftToDo() {
  const btnLi = event.target.parentNode;
  pendingList.removeChild(btnLi);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(btnLi.id);
  });
  const shiftCleanToDos = toDos.filter(function (toDo) {
    return toDo.id === parseInt(btnLi.id);
  });
  const shiftToDos = shiftCleanToDos[0].text;
  toDos = cleanToDos;
  saveTodos();
  shiftPaintList(shiftToDos);
}

function saveTodos() {
  localStorage.setItem(LIST_LS, JSON.stringify(toDos));
}

function paintList(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✔";
  checkBtn.addEventListener("click", shiftToDo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = toDos.length + 1;
  pendingList.appendChild(li);
  const toDosObject = {
    text: text,
    id: toDos.length + 1
  };
  toDos.push(toDosObject);
  saveTodos();
}

function loadForm() {
  const loadFormList = localStorage.getItem(LIST_LS);
  if (loadFormList !== null) {
    const parsedToDos = JSON.parse(loadFormList);
    parsedToDos.forEach(function (toDo) {
      paintList(toDo.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentToDoValue = toDoInput.value;
  paintList(currentToDoValue);
  toDoInput.value = "";
}

function init() {
  loadForm();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();