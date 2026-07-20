function openFeatures() {
    var allElems = document.querySelectorAll('.elem');
    var allfullElem = document.querySelectorAll('.fullElem')
    var allfullElemBackBtn = document.querySelectorAll('.fullElem .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allfullElem[elem.id].style.display = 'block'
        })
    });

    allfullElemBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            allfullElem[back.id].style.display = 'none'
        });
    })
}
openFeatures()

var currentTask = [];
var allTaskList = localStorage.getItem('currentTask')
if (allTaskList) {
    currentTask = JSON.parse(localStorage.getItem('currentTask'));
} else {
    console.log('Task List is Empty');
}

function todoList() {
    function renderTask() {
        localStorage.setItem('currentTask', JSON.stringify(currentTask));
        var allTask = document.querySelector('.allTask');
        let sum = '';
        currentTask.forEach(function (elem, idx) {
            sum += `<div class="task">
            <h5>${elem.task}</h5>
            <button id=${idx}>Mark as Done</button>
        </div>`
        })
        allTask.innerHTML = sum;

        var markCompletedBtn = document.querySelectorAll('.task button');
        markCompletedBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1);
                renderTask();
            });
        });
    }

    renderTask();

    let form = document.querySelector('.addTask form');
    let taskInput = document.querySelector('.addTask form input');
    let taskDetailsInput = document.querySelector('.addTask form textarea');


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log(taskInput.value, taskDetailsInput.value)
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value
            }
        );
        renderTask();
        taskInput.value = '';
        taskDetailsInput.value = '';
    })

}
todoList();

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner');
    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};

    var hours = Array.from({ length: 18 }, function (elem, idx) {
        return `${6 + idx}:00 - ${7 + idx}:00`;
    });


    let wholeDaySum = '';
    hours.forEach(function (elem, idx) {
        var savedData = dayPlanData[idx] || '';
        console.log(savedData);
        wholeDaySum += `<div class="day-planner-time">
    <p>${elem}</p> 
    <input id=${idx} type="text" placeholder="...." value="${savedData}">
    </div>`
    });

    dayPlanner.innerHTML = wholeDaySum;

    var dayPlannerInput = document.querySelectorAll('.day-planner input')
    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })

}
dailyPlanner();


function motivationalQuote() {
    var motivationQuote = document.querySelector('.motivation-2 h1');
    var motivationAuthor = document.querySelector('.motivation-3 h2');


    async function fetchQuote() {
        const url = 'https://zenquotes.io/api/random?t=' + Date.now();

        const res = await fetch(
            'https://corsproxy.io/?' + encodeURIComponent(url),
            {
                cache: 'no-store'
            }
        );

        const data = await res.json();

        motivationQuote.textContent = data[0].q;
        motivationAuthor.textContent = '- ' + data[0].a;
    }

    fetchQuote();
}

motivationalQuote();


function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1');
    let startBtn = document.querySelector('.pomo-timer .start-timer');
    let pauseBtn = document.querySelector('.pomo-timer .pause-timer');
    let resetBtn = document.querySelector('.pomo-timer .reset-timer');
    let session = document.querySelector('.pomodorotimer-fullpage .session')
    let isWorkSession = true

    let timerInterval = null;
    let totalSeconds = 25 * 60;
    console.log(totalSeconds);


    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--septenary-color)'
                    session.style.color = 'var(--primary-color)'
                    totalSeconds = 5 * 60
                }
            }, 1000)
        }
    } else {
        timerInterval = setInterval(function () {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTimer()
            } else {
                isWorkSession = true
                clearInterval(timerInterval)
                timer.innerHTML = '25:00'
                session.innerHTML = 'Work Session'
                session.style.backgroundColor = 'var(--primary-color)'
                session.style.color = 'var(--septenary-color)'
                totalSeconds = 25 * 60
            }
        }, 1000)
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        totalSeconds = 25 * 60;
        session.innerHTML = 'Work Session'
        session.style.backgroundColor = 'var(--primary-color)'
        session.style.color = 'var(--septenary-color)'
        updateTimer();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}

pomodoroTimer();

function weatherFunctionality() {
    var data = null;
    var headerTime = document.querySelector('.header1 h1');
    var headerDate = document.querySelector('.header1 h2');
    var headerTemp = document.querySelector('.header2 h2');
    var headerCondition = document.querySelector('.header2 h4');
    var headerPrecipitation = document.querySelector('.header2 .precipitation');
    var headerHumidity = document.querySelector('.header2 .humidity');
    var headerWind = document.querySelector('.header2 .wind');

    var city = 'New Delhi';
    var apiKey = window.PRODUCTIVE_DASHBOARD_API_KEY;

    async function weatherAPICall() {
        var res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        var data = await res.json();
        headerTemp.innerHTML = `${data.current.temp_c}°C`
        headerCondition.innerHTML = `${data.current.condition.text}`
        headerPrecipitation.innerHTML = `Precipitation: ${data.current.precip_in} %`;
        headerHumidity.innerHTML = `Humidity: ${data.current.humidity}%`;
        headerWind.innerHTML = `Wind: ${data.current.wind_kph} km/hr`;
    }
    weatherAPICall();

    function timeDate() {
        const totaldaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
        const totalMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemember', 'December'];
        var date = new Date();
        var dayOfWeek = totaldaysOfWeek[date.getDay()];
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var currDate = date.getDate();
        var month = totalMonth[date.getMonth()];
        var year = date.getFullYear();
        headerTime.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
        headerDate.innerHTML = `${currDate} ${month}, ${year}`;
    }

    setInterval(() => {
        timeDate();
    }, 1000);
}

weatherFunctionality();