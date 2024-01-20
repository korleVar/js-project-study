let calc = document.querySelector(".calc");
let result = document.querySelector("#result");

var box = document.getElementById("box");
var currentText = box.innerText;

var currentTextHistory;
var currentTextHistoryResult;
const validKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "*",
  "/",
  "=",
  "+",
  "-",
  ".",
  "c",
  "с",
  "С",
  "Backspace",
  "Enter",
  "Delete",
  "Escape",
];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const opers = ["*", "/", "+", "-", "."];

// клавиатура
document.addEventListener("keydown", function (event) {
  const currentText = box.innerText;

  const isMinusOpers = minusOpers(currentText, event.key);
  if (isMinusOpers) return;

  const isLimitChar = limitChar(currentText, event.key); // ограничения на ввод цифр
  if (isLimitChar) return;
  const isDubleOpers = dublOpers(currentText, event.key);
  if (isDubleOpers) return;

  const isChangeOpers = changeOpers(currentText, event.key);
  box.innerText = isChangeOpers;
  //проверка на дублирование 0
  if (box.innerText == "0" && event.key === "0") {
    box.innerText = box.innerText.substring(0, box.innerText.length - 1);
  }

  if (validKeys.includes(event.key)) {
    if (event.key === "Enter") {
      //изм действий
      event.preventDefault();
      // снять фокус
      event.target.blur();
    }

    switch (event.key) {
      case "с":
        box.innerText = "";
        break;
      case "c":
        box.innerText = "";
        break;
      case "=":
        if (box.innerText == "") return;
        // historyExample();
        enterFunction(currentText);

        break;
      case "Enter":
        if (box.innerText == "") return;

        enterFunction(currentText);
        // historyExample(event);
        break;
      case "Backspace":
        box.innerText = box.innerText.slice(0, -1);

        break;
      case "Delete":
        box.innerText = "";
        break;
      case "Escape":
        box.innerText = "";
        break;
      default:
        box.innerText += event.key;
    }
  } else {
    return;
  }
});

// кнопки
document.querySelector(".calc").addEventListener("click", function (event) {
  const value = event.target.innerText;
  const currentText = box.innerText;

  if (!event.target.classList.contains("btn")) return;

  const isMinusOpers = minusOpers(currentText, value);
  if (isMinusOpers) return;
  const isLimitChar = limitChar(currentText, value); // ограничения на ввод цифр
  if (isLimitChar) return;

  const isDubleOpers = dublOpers(currentText, value);
  if (isDubleOpers) return;

  const isChangeOpers = changeOpers(currentText, value);
  box.innerText = isChangeOpers;
  // changeOpers(text);
  //проверка на дублирование 0
  if (box.innerText == "0" && value === "0") {
    box.innerText = box.innerText.substring(0, box.innerText.length - 1);
  }

  switch (value) {
    case "С":
      box.innerText = "";
      break;

    case "=":
      if (box.innerText == "") return;
      currentTextHistory = box.innerText;
      enterFunction(currentTextHistory);

      break;
    default:
      box.innerText += value;
  }
});
//-------------------------------------------------------------------------------

// история примеров
function updateHistory() {
  var content = "";
  // Получение истории из sessionStorage
  var history = JSON.parse(sessionStorage.getItem("history")) || [];

  // Перебор всех записей в истории
  for (var i = history.length - 1; i >= 0; i--) {
    let entry = history[i];
    content += `<div class='history-entry'>
        <p class='historyEx'>${entry.text}=</p>
        <p class='historyRe'>${entry.result}</p>
      </div>`;
  }

  // Обновление HTML содержимого
  document.getElementById("history").innerHTML = content;
}

function historyExample(currentTextHistory) {
  // var currentTextHistory = box.innerText;
  var result = eval(currentTextHistory);
  box.innerText = result;

  var currentTextHistoryResult = box.innerText;
  var times = new Date().getTime();

  // Получение текущей истории из sessionStorage
  var history = JSON.parse(sessionStorage.getItem("history")) || [];

  // Добавление новой записи в историю
  history.push({
    time: times,
    text: currentTextHistory,
    result: currentTextHistoryResult,
  });

  // Сохранение обновленной истории обратно в sessionStorage
  sessionStorage.setItem("history", JSON.stringify(history));

  updateHistory();
  return result;
}

//многократное использование 2 слагаемого

function enterFunction(text) {
  // разбивка на ячейки
  const lengthArr = text.split(/[\*\/\+\-]/).length;
  const textArr = text.split(/[\*\/\+\-]/);
  let indic = 0;
  console.log(text.startsWith("-"));

  if (text.startsWith("-")) indic = 1;

  var history = JSON.parse(sessionStorage.getItem("history")) || [];
  if (history == null || (lengthArr >= 2 && indic != 1)) {
    historyExample(text);
  } else {
    var historyEnd = history[history.length - 1];

    let isOper = "";

    let resultEnd = "";
    let historyEndResult = historyEnd.text.split(/[+\-*/]/)[1];
    for (let j = 0; j < historyEnd.text.length; j++) {
      let currentChar = historyEnd.text[j];
      if (["+", "-", "*", "/"].includes(currentChar)) {
        isOper = currentChar;

        break;
      }
    }

    resultEnd = isOper + historyEndResult;
    var textResultEnd = text + resultEnd;

    historyExample(textResultEnd);
  }
}

// лимит на два элемента

function limitChar(text, key) {
  const lastNumber = text.split(/[\*\/\+\-]/).at(-1);
  const lengthArr = text.split(/[\*\/\+\-]/).length;

  if (lengthArr >= 2 && opers.includes(key)) historyExample(text);

  // последний символ оператор
  const lastChar = text.at(-1);
  if (opers.includes(lastChar)) {
    return false;
  }
  // длина и цифры
  if (lastNumber.length >= 16 && numbers.includes(key)) return true;
}

// Загружаем историю
document.addEventListener("DOMContentLoaded", (event) => {
  updateHistory();
});

// Backspace
Backspace.addEventListener("click", function () {
  box.innerText = box.innerText.slice(0, -1);
});

//при клике истроию пример был в строке

const historyEvent = document.getElementById("history");

historyEvent.addEventListener("click", function (e) {
  const text = e.target.innerText;

  if (text.endsWith("=")) box.innerText = text.slice(0, -1);
  else box.innerText = text;
});

//удалить всё
const deleteHistory = document.getElementById("delete");

deleteHistory.addEventListener("click", function () {
  sessionStorage.clear();
  box.innerText = "";
  document.getElementById("history").innerHTML = "Журнала ещё нет";
});

function limitInput(event) {
  // ограничения на ввод цифр

  let endOper = false;

  // есть ли символ
  for (let i = 0; i < opers.length; i++)
    if (currentText.endsWith(opers[i])) {
      endOper = true;
      break;
    }

  // блок повтора
  if (endOper && opers.includes(value)) {
    return;
  }

  //проверка на дублирование 0
  if (box.innerText == "0" && event.key === "0") {
    box.innerText = box.innerText.substring(0, box.innerText.length - 1);
  }
}

// дублирование оператора
function dublOpers(currentText, value) {
  let endOper = false;

  for (let i = 0; i < opers.length; i++)
    if (currentText.endsWith(opers[i])) {
      endOper = true;
      break;
    }

  // блок повтора
  if (endOper && opers.includes(value)) {
    return true;
  }
}

// минус в начале строки
function minusOpers(text, key) {
  if (text === "" && key === "-") {
    return false;
  } else if (text === "" && !numbers.includes(key)) {
    return true;
  }
  return false;
}

// подмена оператора

function changeOpers(text, key) {
  var lastChar = text[text.length - 1];
  if (opers.indexOf(lastChar) > -1 && text.length > 1) {
    text = text.slice(0, -1) + key;
  }
  return text;
}

////дублироввание в журнале
////корретное ограничение на символы
//// сортировка истории
//// проблема с количеством символов после знака
//// не корретно рабоатет бэкспейс при дублирование знаков
//// отображение нуля
//разобраться в коде
//// визуал
//// отображение сразу sessionStorage
////убрать undefined, запретит отправку пустых данных
////ограничение на два слогаемых
// //enter
//// разрешить минус в начале строки
//заменить последний оператор на только что нажатый оператор
