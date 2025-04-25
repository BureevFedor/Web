let date = document.getElementById("date");
let time = document.getElementById("time");

date.innerHTML = new Date().toLocaleDateString();
time.innerHTML = new Date().toLocaleTimeString();

// Обновление часов каждые 11 секунд
setInterval(() => {
    date.innerHTML = new Date().toLocaleDateString();
    time.innerHTML = new Date().toLocaleTimeString();
}, 11000)