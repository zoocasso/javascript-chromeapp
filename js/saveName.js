const saveNameForm = document.querySelector(".js-saveNameForm"),
  saveNameInput = saveNameForm.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
function paintGreeting(text) {
  saveNameForm.classList.remove("center");
  saveNameForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentSaveNameValue = saveNameInput.value;
  paintGreeting(currentSaveNameValue);
  saveName(currentSaveNameValue);
}

function askForName() {
  saveNameForm.classList.add(SHOWING_CN);
  saveNameForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
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