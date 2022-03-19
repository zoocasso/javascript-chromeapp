const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes().toString().padStart(2,"0");
    const hours = date.getHours().toString().padStart(2,"0");
    const seconds = date.getSeconds().toString().padStart(2,"0");
    clockTitle.innerText = `${hours}:${minutes}:${seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();