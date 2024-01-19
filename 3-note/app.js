// константа которая  открывает форму для добавления новой заметки.
const addBox = document.querySelector(".add-box");

// Модальное окно, где пользователь может ввести данные для новой заметки.
const popupBox = document.querySelector(".popup-box");

// массив
const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

// Кнопка для закрытия модального окна.
const closeBox = popupBox.querySelector("header i");

//  Поля ввода для заголовка
const titleTag = popupBox.querySelector("input");

// Поля ввода для описания заметки.
const descTag = popupBox.querySelector("textarea");

// Кнопка для добавления новой заметки.
const addBtn = popupBox.querySelector("button");

// локальное хранилище
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

// Элемент для отображения меню настроек каждой заметки.
const menuel = document.querySelector(".iconel");

// отображает все заметки на стр
const showNotes = () => {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let litag = `<li class="note">
                            <div class="details">
                                <p> ${note.title} </p>
                                <span>${note.description}
                                </span>
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                                <div class="settings">
                                    <i onclick=showMenu(this) class="fa-solid fa-ellipsis iconel"></i>
                                    <ul class="menu">
                                        <li onclick="editNote(${index},'${note.title}','${note.description}')"><i class="fa-light fa-pen"></i>Edit</li>
                                        <li onclick="deleteNote(${index})"><i class="fa-duotone fa-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </div>
                     </li>`;

    addBox.insertAdjacentHTML("afterend", litag);
  });
};

// открывает меню отпций
function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.onclick = (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  };
  // console.log(elem)
}
// удаляет заметку
function deleteNote(noteId) {
  notes.splice(noteId, 1);

  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

// открывает модальное окно для редактирования
function editNote(noteId, title, description) {
  titleTag.value = title;
  descTag.value = description;
  addBox.click();

  deleteNote(noteId);
  // console.log(noteId)
}

// обработчик клика для добавления новой заметки
addBox.onclick = () => popupBox.classList.add("show");
closeBox.onclick = () => {
  titleTag.value = "";
  descTag.value = "";
  popupBox.classList.remove("show");
};

//сохраняет введенные данные
addBtn.onclick = (e) => {
  e.preventDefault();
  //    menuel.classList.add('hide-icon')

  let ti = titleTag.value;
  let desc = descTag.value;

  let currentDate = new Date();
  let month = months[currentDate.getMonth()];
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();

  let noteInfo = {
    title: ti,
    description: desc,
    date: `${day} ${month} ${year}`,
  };

  notes.push(noteInfo);

  localStorage.setItem("notes", JSON.stringify(notes));
  // очищает и закрывает модальное окно
  closeBox.click();

  //    menuel.classList.remove('hide-icon')
  showNotes();
};

showNotes();
