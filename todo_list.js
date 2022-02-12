// Part 2
let taskList = document.querySelector('#task_list');
const description = document.querySelector('input#task_description_input');
const button = document.querySelector('#add_task');

function addTask(description, dueTime = false) {
    let newTask = document.createElement("li");
    const dateString = new Date(dueTime)

    if (dueTime) {
        newTask.innerHTML = (description) + "<span class=due>due " + dateString.toLocaleDateString() + " " + dateString.toLocaleTimeString() + " </span><button class='btn btn-sm btn-outline-danger done;' type=button>Done</button>";
    }
    else {
        newTask.innerHTML = (description) + " <button class='btn btn-sm btn-outline-danger done;' type=button>Done</button>";
    }

    taskList.appendChild(newTask);
    document.querySelector('input#duetime_input').value = '';
    document.querySelector('input#duedate_input').value = '';
    document.querySelector('input#task_description_input').value = '';
    return taskList;
};

// Part 3
function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
};

// Part 4
button.addEventListener("click", event => {
    if (description.value) {
        let description = document.querySelector('input#task_description_input');
        let dueDate = document.querySelector('input#duedate_input');
        let dueTime = document.querySelector('input#duetime_input');
        let timestamp = dateAndTimeToTimestamp(dueDate, dueTime);
        addTask(description.value, timestamp)
    }
});

// Part 5
description.addEventListener('keydown', event => {
    if (description.value && event.keyCode === 13) {
        let description = document.querySelector('input#task_description_input');
        let dueDate = document.querySelector('input#duedate_input');
        let dueTime = document.querySelector('input#duetime_input');
        let timestamp = dateAndTimeToTimestamp(dueDate, dueTime);
        addTask(description.value, timestamp)
    }
});

// Part 6
function removeTask(taskList, listItem) {
    listItem.remove();
    return taskList;
};

taskList.addEventListener("click", event => {
    if (event.target.classList.contains("done;")) {
         removeTask(taskList, event.target.parentElement);
    }
});