const saveNameForm = document.querySelector(".js-saveNameForm"),
  saveNameInput = saveNameForm.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_NAME = "userName",
  HIDDEN = "hidden";

function saveName(string) {
  localStorage.setItem(USER_NAME, string);
}
function paintGreeting(string) {
  saveNameForm.classList.add(HIDDEN);
  greeting.classList.remove(HIDDEN);
  greeting.innerText = `Hello ${string}`;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentSaveNameValue = saveNameInput.value;
  paintGreeting(currentSaveNameValue);
  saveName(currentSaveNameValue);
}

function askForName() {
  greeting.classList.add(HIDDEN);
  saveNameForm.classList.remove(HIDDEN);
  saveNameForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_NAME);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}
init();