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