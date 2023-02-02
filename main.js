let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector("div .tasks");
let arrayOfTasks = [];

onload = function () {
  input.focus();
};

if (localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}
getTaskFromLocalStorage();

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove();
  }

  //task element
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));

    // toggle done class
    e.target.classList.toggle("done");
  }
});

submit.addEventListener("click", statusInput);
function statusInput() {
  if (input.value != "") {
    addTasksToArray(input.value);
    input.value = null;
  }
}

// click on task element

// function number two  : add tasks to array

function addTasksToArray(taskText) {
  const tasks = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(tasks);

  // add elements to page from array
  addElementToPageFromArray(arrayOfTasks);
  // add array to local storage
  addTaskToLocalStorage(arrayOfTasks);
}


function addElementToPageFromArray(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  
    arrayOfTasks.forEach((taskObj) => {
      const task = document.createElement("div");
      task.setAttribute("data-id", taskObj.id);
      task.classList.add("task");
            if (taskObj.completed) {
              task.classList.add("done");
            }
      const para = document.createElement("p");
      para.classList.add("para");
      para.appendChild(document.createTextNode(taskObj.title));
      task.appendChild(para);
      const span = document.createElement("span");
      span.classList.add("del");
      span.textContent = "delete";
      task.appendChild(span);
      tasksDiv.appendChild(task);
    });
}




function addTaskToLocalStorage(task) {
  localStorage.setItem("task", JSON.stringify(task));
}
function getTaskFromLocalStorage() {
  const data = localStorage.getItem("task");
  if (data) {
    const task = JSON.parse(data);
    addElementToPageFromArray(task);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTaskToLocalStorage(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }

  addTaskToLocalStorage(arrayOfTasks);
}
