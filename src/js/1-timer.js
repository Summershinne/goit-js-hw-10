import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const button = document.querySelector("button");
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= Date.now()) {
          button.disabled = true;
          iziToast.show({
    message: "Please choose a date in the future"
});
      }
      else {
          button.disabled = false;
          userSelectedDate = selectedDates[0];
      }
  },
};

flatpickr(input, options);

button.addEventListener('click', startTimer);

function startTimer() {
    let result = userSelectedDate - Date.now();
    button.disabled = true;
   let idInterval = setInterval(() => { 
       result -= 1000;
       if (result < 1000) {
           clearInterval(idInterval)
           updateTimer();
           return;
       } 
       let date = convertMs(result);
       updateTimer(date);
    }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days = 0, hours = 0, minutes = 0, seconds = 0 } = {}) {
    daysEl.textContent = padStart
    (days);
    hoursEl.textContent = padStart(hours);
    minutesEl.textContent = padStart(minutes);
    secondsEl.textContent = padStart(seconds);
}

function padStart(num) {
    return num.toString().padStart(2 , 0)
}