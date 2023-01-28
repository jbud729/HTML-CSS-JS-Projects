
//What to work on: Fix the zero issue, a back button, maybe more with the design.

let screen = document.querySelector('.calc-screen');
const buttons = document.querySelectorAll('button');

let currentTotal = 0;

let firstNum = null;
let secondNum = null;
let currentOperator = null;

let isOperator = false;
let screenChangeForSecondNum = false;
let = calculationFinished = false;

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
  // change 0 to number pressed
  if (screen.value == 0) {
    screen.value = pressedNumber.innerText;
    console.log(isOperator);
    // if operator is pressed, the next number pressed will replace 
    //value on screen. Also, this notifies the screen is changing for 
    //the secondNum
  }else if (isOperator === true) {
    screen.value = pressedNumber.innerText;
    isOperator = false;
    screenChangeForSecondNum = true;
    //if a number is pressed after a calculation has been done with equals sign
    //then the number pressed will replace whatever is on screen
  }else if(calculationFinished === true) {
    currentTotal = 0;
    screen.value = pressedNumber.innerText;
    calculationFinished = false;
    // will keep stringing numbers together
  }else{
    screen.value += pressedNumber.innerText;
    }
  }
  

function handleSymbol(pressedSymbol) {
  switch(pressedSymbol.innerText) {

    case "C":
      currentTotal = screen.value = 0;
      firstNum = secondNum = currentOperator = null;
      screenChangeForSecondNum = false;
      break;

    case '+':
    case '-':
    case '/':
    case '*':
      isOperator = true;
      handleMathOp(pressedSymbol);
      break;

    case '=':
      handleMathEquals();
      break;
  }
}


function handleMathOp(pressedOperator) {
   // assign firstNum with screen text
   if (firstNum === null) {
    firstNum = screen.value;
    currentOperator = pressedOperator.innerText;
  // when operator is pressed here, the second value on screen will be assigned
  // to secondNum
  }else if (screenChangeForSecondNum === true) {
    secondNum = screen.value;
    screen.value = currentTotal = firstNum = eval(firstNum + currentOperator + secondNum);
    screenChangeForSecondNum = false;
    secondNum = null;
    currentOperator = pressedOperator.innerText;   
  }else {currentOperator = pressedOperator.innerText;}

}


function handleMathEquals() {        
  //if user selects = on first number or an operator has not been selected
  if (firstNum === null || currentOperator === null){return;
  }else if (secondNum === null) { // with this condition, firstNum is not null since an operator was pressed, but secondNum is still not assigned
    secondNum = screen.value;
    screen.value = currentTotal = firstNum = eval(firstNum + currentOperator + secondNum); // total will now show on screen and will replace firstNum
    // back to null since the calculation is finished
    firstNum = secondNum = currentOperator = null;
    screenChangeForSecondNum = false;
    calculationFinished = true;
    isOperator = false;
  } 
}

