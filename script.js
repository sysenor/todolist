// Hole die benötigten DOM-Elemente
const input = document.getElementById('js-todo-create-text');
const addButton = document.getElementById('js-todo-create');
const entriesList = document.getElementById('js-todo-entries');

// Liste bekannter Helden mit hohem Kopfgeld (alle in Kleinbuchstaben, ohne Apostroph)
const heroList = [
  "gandalf", "aragorn", "legolas", "gimli", "frodo",
  "sam", "samwise", "merry", "pippin", "éowyn",
  "faramir", "elrond", "galadriel", "arwen", "théoden", "boromir"
];

// Liste der bekannten Bösewichte (auch in Kleinbuchstaben, ohne Apostroph)
const villains = [
  "sauron", "saruman", "gollum", "gríma", "witch-king",
  "nazgûl", "mouth of sauron", "lurtz", "gothmog", "shelob"
];

// Funktion zum Bereinigen von Eingaben (kleinschreiben, Apostrophe entfernen)
function normalizeName(name) {
  return name.toLowerCase().replaceAll("'", "");
}

// Funktion zum Hinzufügen eines Eintrags
function addTodoItem() {
  const rawText = input.value.trim();

  if (rawText === '') {
    alert('Please enter a name!');
    return;
  }

  const cleanName = normalizeName(rawText); // z. B. "Gandalf" → "gandalf"

  // Bestimme die Art der Belohnung
  let reward = '';

  if (heroList.includes(cleanName)) {
    reward = ` — Reward: 1 500 000 Gold`;
  } else if (villains.includes(cleanName)) {
    reward = ' - No Reward, you traitor!'; // Keine Belohnung für Böse
  } else {
    reward = ` — Reward: 10 000 Gold (Standard bounty)`; // Standard
  }

  // Erstelle das neue Listenelement mit Original-Text (für Anzeige)
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="todo-text">${rawText}${reward}</span>
    <a class="js-todo-entry-done" href="javascript:void(0);" title="Mark as done">[ Done ]</a>
    <a class="js-todo-entry-remove" href="javascript:void(0);" title="Remove">[ Remove ]</a>
  `;

  entriesList.appendChild(li);
  input.value = '';
  input.focus();
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