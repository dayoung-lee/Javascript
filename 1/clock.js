

function clock(){
    var result = document.getElementById("time-result");
    var d = new Date;
    var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var currentDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + `${week[d.getDay()]}`;
    var currentTime = `${d.getHours() < 10? `0${d.getHours()}`:d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}`:d.getMinutes()}:${d.getSeconds() < 10 ? `0${d.getSeconds()}`: d.getSeconds() }`;

    result.innerHTML = "Today: " + currentDate + " " + currentTime;
}

function init(){
    clock();
    setInterval(clock, 1000);
}

init();