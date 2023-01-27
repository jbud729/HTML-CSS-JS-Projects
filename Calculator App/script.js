
let screen = document.querySelector('.calc-screen');
const buttons = document.querySelectorAll('button');
let currentTotal = 0;
let firstNum = null;
let secondNum = null;
let currentOperator = null;
let scrrenChangeForSecondNum = false;

let buttonArr = Array.from(buttons);
buttonArr.forEach(function (button) {
  button.addEventListener("click", function (e) {
    if (isNaN(parseInt(button.innerText))) {
      handleSymbol(button);
    }else {
      handleNumber(button);
    }
  });
});


function handleNumber(pressedNumber) {
  if (firstNum != null) {scrrenChangeForSecondNum = true;}
  console.log(scrrenChangeForSecondNum);
  // if screen is already 0 and 0 is pressed
  if (pressedNumber.innerText == 0 && screen.value[0] == 0) {
    screen.value = 0;
  // if number > 0 is pressed and screen number is at 0. Replace the 0
  }else if (screen.value == 0) {
    screen.value = pressedNumber.innerText;
    // add number > 0 to screen
  }else {
    screen.value += pressedNumber.innerText;
    }
  }

function handleSymbol(pressedSymbol) {
  switch(pressedSymbol.innerText) {

    case "C":
      currentTotal = screen.value = 0;
      firstNum = secondNum = currentOperator = null;
      scrrenChangeForSecondNum = false;
      break;

    case '+':
    case '-':
    case '/':
    case '*':
      handleMathOp(pressedSymbol);
      console.log(currentOperator);
      break;

    case '=':
      console.log(currentOperator);
      //console.log(firstNum);
      //console.log(scrrenChangeForSecondNum);

      handleMathEquals();
  }
}


function handleMathOp(pressedOperator) {
   // assign firstNum with screen text
   if (firstNum === null) {
    firstNum = screen.value;
    screen.value = 0;
    currentOperator = pressedOperator.innerText;
  }else if (secondNum === null && scrrenChangeForSecondNum === true) {
    currentOperator = pressedOperator.innerText;
    handleMathEquals();

  } else if (secondNum === null) {
    currentOperator = pressedOperator.innerText;
    screen.value = 0;
}

}


function handleMathEquals() {        
  //if user selects = on first number or an operator has not been selected
  if (firstNum === null || currentOperator === null){return;
  }else if (secondNum === null) { // with this condition, firstNum is not null since an operator was pressed, but secondNum is still not assigned
    secondNum = screen.value;
    console.log("FirstNum Before: " + firstNum);
    console.log("SecondNum: " + secondNum);
    screen.value = currentTotal = firstNum = eval(firstNum + currentOperator + secondNum); // total will now show on screen and will replace firstNum
    console.log("SecondNum: " + secondNum);
    //console.log("Op: " + currentOperator);
    console.log("FirstNum After: " + firstNum);
    // back to null since the calculation is finished
    secondNum = currentOperator = null;
    scrrenChangeForSecondNum = false;
  }
}

