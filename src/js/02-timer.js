import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    console.log(selectedDates[0]);

    if (selectedDates[0] < options.defaultDate) {
      window.alert("Please choose a date in the future");
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
    ;
  }
}


flatpickr("#datetime-picker", options);
refs.startBtn.addEventListener('click', start);


function start() {
  const fp = flatpickr("#datetime-picker", options);
  const startTime = new Date(fp.selectedDates[0].getTime());
  console.log(startTime);
  timerId = setInterval(() => {
    const currentTime = new Date().getTime();
    const deltaTime = startTime - currentTime;
    const time = convertMs(deltaTime);
    updateClockface(time);
  }, 1000);
  if (deltaTime < 1000) {
    clearInterval(timerId);
  }
};


function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

