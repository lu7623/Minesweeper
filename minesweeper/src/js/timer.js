const startTimer = setInterval(() => {
const timer = document.querySelector('.timer');

timer.value +=1;
timer.innerText = timer.value.toString().padStart(3, '0');
}, 1000);



