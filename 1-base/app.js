const ResultElement = document.getElementById("result");
const Input1 = document.getElementById("input1");
const Input2 = document.getElementById("input2");
const minusBth = document.getElementById("minus");
const plusBth = document.getElementById("plus");
const submitBth = document.getElementById("submit");
let actions = "+";

plusBth.onclick = function () {
  actions = "+";
};
minusBth.onclick = function () {
  actions = "-";
};

function printResult(result) {
  if (result < 0) {
    ResultElement.style.color = "red";
  } else {
    ResultElement.style.color = "green";
  }
}
submitBth.onclick = function () {
  if (actions == "+") {
    const sum = Number(Input1.value) + Number(Input2.value);
    printResult(sum);
  } else {
    const sum = Number(Input1.value) - Number(Input2.value);
    printResult(sum);
  }
};
