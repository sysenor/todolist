// Hole die benötigten DOM-Elemente
const input = document.getElementById('js-todo-create-text');
const addButton = document.getElementById('js-todo-create');
const entriesList = document.getElementById('js-todo-entries');

// Liste bekannter Helden mit hohem Kopfgeld
const heroList = [
  "Gandalf", "Aragorn", "Legolas", "Gimli", "Frodo",
  "Sam", "Samwise", "Merry", "Pippin", "Éowyn",
  "Faramir", "Elrond", "Galadriel", "Arwen", "Théoden", "Boromir"
];

// Funktion zum Hinzufügen eines Eintrags
function addTodoItem() {
  const text = input.value.trim();

  if (text === '') {
    alert('Please enter a name!');
    return;
  }

  // Bestimme die Art der Belohnung
  let reward = '';

  if (heroList.includes(text)) {
    reward = ` — Reward: 1 500 000 Gold`;
  } else if (isVillain(text)) {
    reward = ''; // Kein Reward für Bösewichte
  } else {
    reward = ` — Reward: 10 000 Gold (Standard bounty)`; // Normale Einträge
  }

  // Erstelle das neue Listenelement
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="todo-text">${text}${reward}</span>
    <a class="js-todo-entry-done" href="javascript:void(0);" title="Mark as done">[ Done ]</a>
    <a class="js-todo-entry-remove" href="javascript:void(0);" title="Remove">[ Remove ]</a>
  `;

  entriesList.appendChild(li);
  input.value = '';
  input.focus();
}

// Funktion prüft, ob ein Name ein Bösewicht ist
function isVillain(name) {
  const villains = [
    "Sauron", "Saruman", "Gollum", "Gríma", "Witch-King",
    "Nazgûl", "Mouth of Sauron", "Lurtz", "Gothmog", "Shelob"
  ];
  return villains.includes(name);
}

// Klick-Ereignisse behandeln
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

// Event-Listener setzen
addButton.addEventListener('click', addTodoItem);
entriesList.addEventListener('click', handleEntryClick);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTodoItem();
  }
});
