let screen = document.querySelector('.calc-screen');
const buttons = document.querySelectorAll('button');
let currentTotal = 0;

let buttonArr = Array.from(buttons);
buttonArr.forEach(function (button) {
  button.addEventListener("click", function (e) {
    if (isNaN(parseInt(button.innerText))) {
      console.log("NAN");
    }else {
      screen.innerText = button.innerText;
    }
  });
});


