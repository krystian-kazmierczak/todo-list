{
    const tasks = [
        {
            content: "Test",
            done: true,
        },
        {
            content: "Test 2",
            done: false,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const eraseInputField = () => {
        document.querySelector(".js-newTask").value = "";
    }

    const focusInputField = () => {
        document.querySelector(".js-newTask").focus();
    }

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
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += ` 
            <li class="list__item">
               <button class="list__button list__button--done js-done">${task.done ? "✓" : " "}</button>
               <span class="list__taskContent${task.done ? " list__taskContent--done" : ""}">${task.content}</span>
               <button class="list__button list__button--remove js-remove">🗑</button>
            </li>
            `
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
        eraseInputField();
        focusInputField();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        render();
        focusInputField();
    };

    init();
}