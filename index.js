const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');


// Принцем таймера через new Date() является более точным и не зависит от браузера или устройства с которого идет воспроизведение

let seconds = 0;
let temp = 0;

const createTimerAnimator = () => {
  const timer = setInterval(() => {
    const time = getTimeRemaining(seconds);
    // Добавляет нули перед временем
    timerEl.textContent = `${('0' + time.hours).slice(-2)} : ${('0' + time.minutes).slice(-2)} : ${('0' + time.seconds).slice(-2)}`;
    // Останавливаем таймер при 0
    if (time.total <= 1000) {
      clearInterval(timer)
    }
  }, 1000);
};

inputEl.addEventListener('input', () => {
  // Преобразуем введеное время в инпут в мс
  const value = inputEl.value;
  const arr = value.split(':');

  // Проверки на введеное время
  if (arr.length === 3) {
    temp = (arr[0] * 3600000) + (arr[1] * 60000) + (arr[2] * 1000);
  } else if (arr.length === 2) {
    temp = (arr[0] * 60000) + (arr[1] * 1000);
  } else if (arr.length === 1) {
    temp = (value * 1000);
  }
});

buttonEl.addEventListener('click', () => {
  createTimerAnimator();
  inputEl.value = '';
  // Получаем текущую дату в мс и добавляем введеное время в инпут
  seconds = Date.now() + temp;
});

// Функция по возвращению из мс чч:мм:сс
function getTimeRemaining(endtime){  
  const value = endtime - Date.parse(new Date());  
  const seconds = Math.floor( (value/1000) % 60 );  
  const minutes = Math.floor( (value/1000/60) % 60 );  
  const hours = Math.floor( (value/(1000*60*60)) % 24 );  
  return {  
   'total': value,  
   'hours': hours,  
   'minutes': minutes,  
   'seconds': seconds  
  };  
}

