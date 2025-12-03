const inputElement = document.querySelector(".todo-input");
const addTaskButton = document.querySelector(".todo-add-task-button");
const todoListUL = document.querySelector(".todo-list-ul");
const dueDataInput = document.querySelector(".todo-due-date-input");
let inputValue = "";
let taskDueDate = "";
let tasks = [];
function inputHandler(e) {
  inputValue = e.target.value;
}
function dueDataInputHandler(e) {
  taskDueDate = e.target.value;
}

function addTaskHandler() {
  if (inputValue.trim() !== "") {
    const task = {
      dueDate: taskDueDate,
      text: inputValue.trim(),
    };
    tasks.push(task);
    console.log("tasks", tasks);
    inputElement.value = "";
    inputValue = "";
    dueDataInput.value = "";
    taskDueDate = "";
    tasks.forEach((el) => {
      const li = document.createElement("li");
      todoListUL.appendChild(li);
      li.textContent = `${el.text} Due by: ${el.dueDate}`;
    });
    tasks.length = 0;
  }
}

inputElement.addEventListener("input", inputHandler);
dueDataInput.addEventListener("input", dueDataInputHandler);
addTaskButton.addEventListener("click", addTaskHandler);
