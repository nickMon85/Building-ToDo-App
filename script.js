const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = [];
let currentTask = {};

const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

//Now, this will work on opening and closing the form modal
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  if (formInputsContainValues) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});
cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
});
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

//Now, its time to get the values from the input fields.

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
    console.log(taskData);
  }

  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
            <div class= "task" id='${id}'>
                <p><strong>Title: </strong> ${title}</p>
                <p><strong>Date: </strong> ${date}</p>
                <p><strong>Description: </strong> ${description}</p>
                <button type="button" class="btn">Edit</button>
                <button type="button" class="btn">Delete</button>
            </div>
            `;
  });
  reset();
});
// You will need to determine whether the task
// being added to the taskData array already exists or not.
// If the task does not exist, you will add it to the array.
// If it does exist, you will update it.
// To accomplish this, you can use the findIndex() method.

// Next, retrieve the values from the input fields and
// store them in a taskObj object. Each task should
// also have a unique id.
// To make the id more unique, add another hyphen and use Date.now().

// Now that you have saved the task in the taskData array, you should display the task on the page by looping through it.
