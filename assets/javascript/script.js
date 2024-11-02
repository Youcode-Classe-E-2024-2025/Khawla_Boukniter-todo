function createTask() {
  const newBlock = document.getElementById("new");
  const blur = document.querySelector(".container");

  if (newBlock.style.display === "none" || newBlock.style.display === "") {
    newBlock.style.display = "flex";
    blur.classList.add("blur");
  } else {
    newBlock.style.display = "none";
    blur.classList.remove("blur");
  }
}

let editedTask = null;

function saveTask() {
  const title = document.getElementById("title").value.trim();
  const priority = document.getElementById("priority").value;
  const status = document.getElementById("status").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;

  if (!title) {
    alert("Please enter a title for the task");
    return;
  }
  if (!date) {
    alert("Please enter a date for the task");
    return;
  }

  const container = document.getElementById(status);
  const count = container.querySelector(".task-count");

  if (editedTask) {
    editedTask.querySelector("span").innerText = title;
    editedTask.querySelector("small").innerText = date;
    editedTask.style.borderLeft = getPriorityColor(priority);

    const oldStatus = editedTask.closest(".task-block").id;
    if (oldStatus !== status) {
      const oldContainer = document.getElementById(oldStatus);
      const oldCount = oldContainer.querySelector(".task-count");
      oldCount.innerText = `${parseInt(oldCount.innerText) - 1}`;

      editedTask.remove();
      resetForm();

      const newContainer = document.getElementById(status);
      newContainer.querySelector(".tasks").appendChild(editedTask);

      const newCount = newContainer.querySelector(".task-count");
      newCount.innerText = `${parseInt(newCount.innerText) + 1}`;
    } else {
      editedTask.style.borderLeft = getPriorityColor(priority);
      resetForm();
      status = oldStatus;
      resetForm();
    }

    editTask.style.borderLeft = getPriorityColor(priority);

    editedTask = null;
  } else if (document.getElementById(title.toLowerCase().replace(/\s+/g, ""))) {
    alert(
      "Task with the same title already exists. Please choose a different title."
    );
  } else {
    const newTask = document.createElement("div");
    newTask.className = "task";
    newTask.style =
      "display: flex; justify-content: space-between; align-items: center; transition: all 0.5s";
    newTask.id = title.toLowerCase().replace(/\s+/g, ""); // ID unique pour la tâche
    newTask.innerHTML = `
                      <div><span>${title}</span> <br> <small>${date}</small></div> 
                      <div><i class="fa-solid fa-trash" onclick="deleteTask(this)"></i>
                      <i class="fa-solid fa-edit" onclick="editTask(this)"></i></div>
                      <br> <small class="description" style="display: none">${description}</small>
                  `;

    newTask.style.borderLeft = getPriorityColor(priority);

    container.querySelector(".tasks").appendChild(newTask);
    setTimeout(() => newTask.classList.add("show"), 0);
    count.innerText = parseInt(count.innerText) + 1;
    resetForm();
  }
}

function getPriorityColor(priority) {
  if (priority === "high") {
    return "5px solid red";
  } else if (priority === "medium") {
    return "5px solid orange";
  } else {
    return "5px solid green";
  }
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "description";
  document.getElementById("priority").value = ""; // Réinitialiser la priorité par défaut
  document.getElementById("status").value = ""; // Réinitialiser le statut par défaut
  document.getElementById("new").style.display = "none";
  document.querySelector(".container").classList.remove("blur");
}

function editTask(element) {
  editedTask = element.closest(".task");
  const title = editedTask.querySelector("span").innerText;
  const date = editedTask.querySelector("small").innerText;
  const description = editedTask.querySelector(".description").innerText;
  // const priority = Object.keys(tasks.find((t) => t.title === title))[0];

  document.getElementById("title").value = title;
  document.getElementById("date").value = date;
  document.getElementById("description").value = description;
  document.getElementById("priority").value =
    editedTask.style.borderLeft.includes("red")
      ? "high"
      : editedTask.style.borderLeft.includes("orange")
      ? "medium"
      : "low";
  document.getElementById("status").value = editedTask.closest(".block").id;
  createTask();
}

function deleteTask(element) {
  const task = element.closest(".task");
  const container = task.closest(".block");
  const count = container.querySelector(".task-count");

  if (confirm("Are you sure you want to delete this task?")) {
    task.classList.add("fade-out");
    setTimeout(() => {
      task.remove();
      count.innerText = parseInt(count.innerText) - 1;
    }, 500);
  }
}

function filterTasks() {
  const filter = document.getElementById("priority-filter").value;
  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    const taskPriority = task.style.borderLeft.includes("red")
      ? "high"
      : task.style.borderLeft.includes("orange")
      ? "medium"
      : "low";

    if (filter === "" || taskPriority === filter) {
      task.style.display = "block"; // Affiche la tâche
    } else {
      task.style.display = "none"; // Cache la tâche
    }
  });
}

function sortTasks() {
  const sortOrder = document.getElementById("sort-order").value;
  const containers = document.querySelectorAll(".task-block .tasks");

  containers.forEach((container) => {
    const taskArray = Array.from(container.children);

    if (sortOrder === "date-asc") {
      taskArray.sort((a, b) => {
        return (
          new Date(a.querySelector("small").innerText) -
          new Date(b.querySelector("small").innerText)
        );
      });
    } else if (sortOrder === "date-desc") {
      taskArray.sort((a, b) => {
        return (
          new Date(b.querySelector("small").innerText) -
          new Date(a.querySelector("small").innerText)
        );
      });
    }

    container.innerHTML = "";
    taskArray.forEach((task) => container.appendChild(task));
  });
}
