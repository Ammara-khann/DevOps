(function () {
  'use strict';

  const STORAGE_KEY = 'bloom-tasks';

  const form = document.getElementById('add-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  const emptyState = document.getElementById('empty-state');
  const countEl = document.getElementById('count');
  const clearBtn = document.getElementById('clear-completed');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let tasks = loadTasks();
  let currentFilter = 'all';

  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      /* storage unavailable — app still works in-memory for this session */
    }
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function addTask(text) {
    tasks.unshift({ id: uid(), text: text, done: false });
    saveTasks();
    render();
  }

  function toggleTask(id) {
    const task = tasks.find(function (t) { return t.id === id; });
    if (task) {
      task.done = !task.done;
      saveTasks();
      render();
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    saveTasks();
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter(function (t) { return !t.done; });
    saveTasks();
    render();
  }

  function visibleTasks() {
    if (currentFilter === 'active') return tasks.filter(function (t) { return !t.done; });
    if (currentFilter === 'completed') return tasks.filter(function (t) { return t.done; });
    return tasks;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function render() {
    const items = visibleTasks();
    list.innerHTML = '';

    items.forEach(function (task) {
      const li = document.createElement('li');
      li.className = 'task' + (task.done ? ' is-done' : '');
      li.dataset.id = task.id;

      li.innerHTML =
        '<button class="task__check" aria-label="Toggle task complete" aria-pressed="' + task.done + '">' +
          '<svg viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
        '<span class="task__label">' + escapeHtml(task.text) + '</span>' +
        '<button class="task__delete" aria-label="Delete task">' +
          '<svg viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>' +
        '</button>';

      list.appendChild(li);
    });

    const totalVisible = tasks.length;
    emptyState.classList.toggle('is-visible', totalVisible === 0);
    if (totalVisible > 0 && items.length === 0) {
      emptyState.classList.add('is-visible');
      emptyState.textContent = 'Nothing in this view.';
    } else if (totalVisible === 0) {
      emptyState.textContent = 'Nothing here yet — the day is still a blank stem.';
    }

    const remaining = tasks.filter(function (t) { return !t.done; }).length;
    countEl.textContent = remaining + (remaining === 1 ? ' left' : ' left');

    clearBtn.style.visibility = tasks.some(function (t) { return t.done; }) ? 'visible' : 'hidden';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addTask(value);
    input.value = '';
    input.focus();
  });

  list.addEventListener('click', function (e) {
    const checkBtn = e.target.closest('.task__check');
    const deleteBtn = e.target.closest('.task__delete');
    const li = e.target.closest('.task');
    if (!li) return;
    const id = li.dataset.id;

    if (checkBtn) toggleTask(id);
    if (deleteBtn) deleteTask(id);
  });

  clearBtn.addEventListener('click', clearCompleted);

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  render();
})();
