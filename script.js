// DOM-Elemente holen
const input = document.getElementById('js-todo-create-text');
const addButton = document.getElementById('js-todo-create');
const entriesList = document.getElementById('js-todo-entries');

// Aufgabe hinzufügen
function addTodoItem() {
  const text = input.value.trim();

  if (text === '') {
    alert('Please enter a name!');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="todo-text">${text}</span>
    <a class="js-todo-entry-done" href="javascript:void(0);" title="Mark as done">[ Done ]</a>
    <a class="js-todo-entry-remove" href="javascript:void(0);" title="Remove">[ Remove ]</a>
  `;

  entriesList.appendChild(li);
  input.value = '';
  input.focus();
}

// Klicks behandeln
function handleEntryClick(e) {
  const li = e.target.parentElement;

  if (e.target.classList.contains('js-todo-entry-done')) {
    const isDone = li.classList.toggle('done');

    if (isDone) {
      if (!li.querySelector('.done-checkmark')) {
        const checkmark = document.createElement('span');
        checkmark.className = 'done-checkmark';
        checkmark.textContent = '✔';
        li.appendChild(checkmark);
      }
    } else {
      const check = li.querySelector('.done-checkmark');
      if (check) check.remove();
    }
  }

  if (e.target.classList.contains('js-todo-entry-remove')) {
    li.remove();
  }
}

// Events
addButton.addEventListener('click', addTodoItem);
entriesList.addEventListener('click', handleEntryClick);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTodoItem();
  }
});
