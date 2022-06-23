const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input");

const pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

let toDos = [];
let dones = [];


function deleteDone(event) {
  const btnLi = event.target.parentNode;
  finishedList.removeChild(btnLi);
  const deleteDones = dones.filter(function (done) {
    return done.id !== parseInt(btnLi.id);
  });
  dones = deleteDones;
  saveDone();
}

function backToPending(event) {
  const btnLi = event.target.parentNode;
  finishedList.removeChild(btnLi);
  const backToPendingDonesArr = dones.filter(function (done) {
    return done.id === parseInt(btnLi.id);
  });
  const finishiedDones = backToPendingDonesArr[0].text;
  const donesObject = {
    text: finishiedDones,
    id: toDos.length + 1
  };;
  toDos.push(donesObject);
  const deleteDones = dones.filter(function (done) {
    return done.id !== parseInt(btnLi.id);
  });
  dones = deleteDones;
  saveDone();
  saveTodos();
  paintPendingList(finishiedDones);
}


function paintFinishedList(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "👋";
  const shiftBackBtn = document.createElement("button");
  shiftBackBtn.innerText = "<<";
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(shiftBackBtn);
  li.id = dones.length;
  finishedList.appendChild(li);
  delBtn.addEventListener("click", deleteDone);
  shiftBackBtn.addEventListener("click", backToPending);
}


function saveTodos() {
  localStorage.setItem("list", JSON.stringify(toDos));
}

function saveDone(){
  localStorage.setItem('done',JSON.stringify(dones));
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

function finishedToDo(event) {
  const btnLi = event.target.parentNode;
  pendingList.removeChild(btnLi);
  const finishedToDosArr = toDos.filter(function (toDo) {
    return toDo.id === parseInt(btnLi.id);
  });
  const finishiedToDos = finishedToDosArr[0].text;
  const toDosObject = {
    text: finishiedToDos,
    id: dones.length + 1
  };;
  dones.push(toDosObject);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(btnLi.id);
  });
  toDos = cleanToDos;
  saveDone();
  saveTodos();
  paintFinishedList(finishiedToDos);
}




function paintPendingList(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✔";
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = toDos.length;
  pendingList.appendChild(li);
  delBtn.addEventListener("click", deleteToDo);
  checkBtn.addEventListener("click", finishedToDo);
}


function loadForm() {
  const pendingList = localStorage.getItem("list");
  const finishedList=localStorage.getItem('done');
  if (pendingList !== null) {
    const parsedToDos = JSON.parse(pendingList);
    parsedToDos.forEach(function (toDo) {
      toDos.push(toDo)
      paintPendingList(toDo.text);
    });
  }
  if (finishedList !== null) {
    const parsedDones = JSON.parse(finishedList);
    parsedDones.forEach(function (done) {
      dones.push(done)
      paintFinishedList(done.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentToDoValue = toDoInput.value;
  const toDosObject = {
    text: currentToDoValue,
    id: toDos.length + 1
  };
  toDos.push(toDosObject);
  toDoInput.value = "";
  saveTodos();
  paintPendingList(currentToDoValue);
}


function init() {
  loadForm();
  toDoForm.addEventListener("submit", handleSubmit);
}


init();