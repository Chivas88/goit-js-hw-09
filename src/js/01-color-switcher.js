const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function handleClick() {
  startBtn.setAttribute("disabled", "disabled");
  const bodyColor = document.querySelector('body');
  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopClick() {
  startBtn.removeAttribute("disabled");
  clearInterval(timerId);
}

startBtn.addEventListener('click', handleClick);
stopBtn.addEventListener('click', stopClick);

