{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const eraseInputField = () => {
    document.querySelector(".js-newTask").value = "";
  };

  const focusInputField = () => {
    document.querySelector(".js-newTask").focus();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const bindButtonsEvents = () => {};

  const renderTask = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += ` 
            <li class="list__item">
               <button class="list__button list__button--done js-done">${
                 task.done ? "✓" : " "
               }</button>
               <span class="list__taskContent${
                 task.done ? " list__taskContent--done" : ""
               }">${task.content}</span>
               <button class="list__button list__button--remove js-remove">🗑</button>
            </li>
            `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (tasks.length < 1) {
      buttonsElement.innerHTML = "";
      return;
    }
    buttonsElement.innerHTML = `
        <button class="section__button js-hideDoneTasks">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
        <button 
            class="section__button js-setAllTasksDone"
            ${tasks.every(({ done }) => done) ? " disabled" : ""}
        >
            Ukończ wszystkie
        </button>
      `;
  };

  const render = () => {
    renderTask();
    renderButtons();
    bindEvents();
    bindButtonsEvents();
    eraseInputField();
    focusInputField();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
      focusInputField();
      return;
    }
    addNewTask(newTaskContent);
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
    render();
  };

  init();
}
