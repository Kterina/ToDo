document.addEventListener('DOMContentLoaded', function () {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        for (let i = 0; i < tasks.length; i++) {
            addTaskToList(tasks[i]);
        }
    }
});

function addTask() {
    const inputTask = document.getElementById('inputTask');
    const task = inputTask.value.trim();

    if (task !== '') {
        addTaskToList(task);
        inputTask.value = '';
    }
}

function addTaskToList(task) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const deleteButton = document.createElement('span');

    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleTaskStatus);

    deleteButton.innerHTML = 'x';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', deleteTask);

    label.textContent = task;

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

function toggleTaskStatus(event) {
    const checked = event.target.checked;
    const label = event.target.nextSibling;

    if (checked) {
        label.classList.add('completed');
    } else {
        label.classList.remove('completed');
    }
}

function deleteTask(event) {
    const listItem = event.target.parentNode;
    const taskList = listItem.parentNode;

    taskList.removeChild(listItem);
}

function clearList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
}

window.addEventListener('beforeunload', function () {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    for (let i = 0; i < taskList.children.length; i++) {
        const label = taskList.children[i].getElementsByTagName('label')[0];
        tasks.push(label.textContent);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
});