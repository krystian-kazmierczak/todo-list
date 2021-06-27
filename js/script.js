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
    if (tasks.some((task) => task.done)) {
      hideDoneTasks = !hideDoneTasks;
    }
    render();
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
            <li class="task__item${
              task.done && hideDoneTasks ? " task__item--hidden" : ""
            }">
               <button class="task__button task__button--done js-done">${
                 task.done ? "✓" : " "
               }</button>
               <span class="task__taskContent${
                 task.done ? " task__taskContent--done" : ""
               }">${task.content}</span>
               <button class="task__button task__button--remove js-remove">🗑</button>
            </li>
            `;

    document.querySelector(".js-tasks").innerHTML = tasks
      .map(taskAsHTML)
      .join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }
    buttonsElement.innerHTML = `
        <button 
        class="buttons__button js-hideDoneTasks"
        >
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button 
            class="buttons__button js-setAllTasksDone"
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
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
    render();
  };

  init();
}
