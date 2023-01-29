
//What to work on: maybe more with the design. Also, making long decimals fit screen. 

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
    //if a number is pressed after a calculation has been done with equals sign
    //then the number pressed will replace whatever is on screen
   if(calculationFinished === true) {
    currentTotal = 0;
    screen.value = pressedNumber.innerText;
    calculationFinished = false;
    // change 0 to number pressed
  }else if (screen.value == 0) {
    screen.value = pressedNumber.innerText;
    // if operator is pressed, the next number pressed will replace 
    //value on screen. Also, this notifies the screen is changing for 
    //the secondNum
  }else if (isOperator === true) {
    screen.value = pressedNumber.innerText;
    screenChangeForSecondNum = true;
  }else{
    screen.value += pressedNumber.innerText;
    }
    isOperator = false;
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
      // if calculation got finished with previously using an equals sign
      // and an op is pressed, we change calcFin. back to false so it
      // will not replace the screen value twice
      if (calculationFinished === true) {calculationFinished = false;}
      handleMathOp(pressedSymbol);
      break;

    case '=':
      handleMathEquals();
      break;

    case 'Del':
      deleteNumber();
  }
}

function deleteNumber() {
  if (isOperator === true) {
    return;
  }else if (calculationFinished === true) {
    firstNum = secondNum = currentOperator = null;
    screenChangeForSecondNum = false;
    isOperator = false;
  }else if (screen.value.length == 1) {
    screen.value = 0;
  }else{
    // .substring(starting location, ending location(up to, will not include))
    screen.value = (screen.value).substring(0,((screen.value).length) - 1);
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

