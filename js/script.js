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

  const setAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
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

  const bindButtonsEvents = () => {
    const setAllTasksDoneButton = document.querySelector(".js-setAllTasksDone");
    if (setAllTasksDoneButton) {
      setAllTasksDoneButton.addEventListener("click", setAllTasksDone);
    }
    const toggleDoneTasksButton = document.querySelector(".js-hideDoneTasks");
    if (toggleDoneTasksButton) {
      toggleDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const renderTask = () => {
    const taskAsHTML = (task) => ` 
            <li class="list__item${
              task.done && hideDoneTasks ? " list__item--hidden" : ""
            }">
               <button class="list__button list__button--done js-done">${
                 task.done ? "✓" : " "
               }</button>
               <span class="list__taskContent${
                 task.done ? " list__taskContent--done" : ""
               }">${task.content}</span>
               <button class="list__button list__button--remove js-remove">🗑</button>
            </li>
            `;

    document.querySelector(".js-tasks").innerHTML = tasks.map(taskAsHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }
    buttonsElement.innerHTML = `
        <button class="section__button js-hideDoneTasks">${
          hideDoneTasks ? "Pokaż" : "Ukryj"
        } ukończone</button>
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
    bindEvents();

    renderButtons();
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
