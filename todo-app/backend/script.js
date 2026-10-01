(function () {
  const STORAGE_KEY = "bloom.tasks";

  const form = document.getElementById("add-form");
  const input = document.getElementById("task-input");
  const list = document.getElementById("task-list");
  const countEl = document.getElementById("count");
  const clearBtn = document.getElementById("clear-completed");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const card = document.querySelector(".card");

  let tasks = loadTasks();
  let filter = "all";

  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      /* storage unavailable, continue without persistence */
    }
  }

  function addTask(text) {
    tasks.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text,
      done: false,
    });
    saveTasks();
    render();
  }

  function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) task.done = !task.done;
    saveTasks();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter((t) => !t.done);
    saveTasks();
    render();
  }

  function visibleTasks() {
    if (filter === "active") return tasks.filter((t) => !t.done);
    if (filter === "completed") return tasks.filter((t) => t.done);
    return tasks;
  }

  function render() {
    list.innerHTML = "";
    const items = visibleTasks();

    items.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task-item" + (task.done ? " is-done" : "");
      li.dataset.id = task.id;

      li.innerHTML = `
        <button class="task-check" aria-label="${task.done ? "Mark as not done" : "Mark as done"}">
          <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
            <path d="M4 12l5 5L20 6" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </button>
        <span class="task-text"></span>
        <button class="task-delete" aria-label="Delete task">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
      `;

      li.querySelector(".task-text").textContent = task.text;
      list.appendChild(li);
    });

    card.classList.toggle("is-empty", tasks.length === 0);

    const leftCount = tasks.filter((t) => !t.done).length;
    countEl.textContent = `${leftCount} left`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addTask(text);
    input.value = "";
    input.focus();
  });

  list.addEventListener("click", (e) => {
    const checkBtn = e.target.closest(".task-check");
    const deleteBtn = e.target.closest(".task-delete");
    const li = e.target.closest(".task-item");
    if (!li) return;
    const id = li.dataset.id;

    if (checkBtn) toggleTask(id);
    if (deleteBtn) deleteTask(id);
  });

  clearBtn.addEventListener("click", clearCompleted);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      filter = btn.dataset.filter;
      render();
    });
  });

  render();
})();