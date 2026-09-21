const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");
const clearCompletedBtn = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-message">
                <p>No tasks yet.</p>
                <span>Add your first task above!</span>
            </div>
        `;

        updateTaskCount();
        return;
    }

    tasks.forEach((task) => {

        const taskElement = document.createElement("div");

        taskElement.className =
            task.completed ? "task completed" : "task";

        taskElement.innerHTML = `
            <div class="task-content">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span class="task-text">
                    ${task.text}
                </span>

            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>
        `;

        taskList.appendChild(taskElement);
    });

    updateTaskCount();
}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function clearCompleted() {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    displayTasks();
}

function updateTaskCount() {

    const remainingTasks =
        tasks.filter(task => !task.completed).length;

    const completedTasks =
        tasks.filter(task => task.completed).length;

    taskCount.textContent =
        `${remainingTasks} tasks remaining`;

    completedCount.textContent =
        ` | ${completedTasks} completed`;
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

clearCompletedBtn.addEventListener("click", clearCompleted);

displayTasks();