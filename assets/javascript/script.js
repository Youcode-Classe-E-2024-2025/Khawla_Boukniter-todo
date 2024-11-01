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

    const oldStatus = editedTask.closest(".block").id;
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
