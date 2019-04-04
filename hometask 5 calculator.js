let numbers = document.querySelectorAll('.number-button');
let computations = document.querySelectorAll('.computation-button');
let clearButton = document.getElementById('ac');
let calculatorDisplay = document.getElementById('calculator-display');
let saveResult = document.getElementById('save-result-button');
let lastResultOutput = document.getElementById('last-result_output');
let memoryCurrentNumber = '0';
let memoryNewNumber = false;
let memoryPendingOPeration  = '';


for (var i=0; i<numbers.length; i++) {
     var number = numbers[i];
     number.addEventListener('click', function (e) {
         numberPress(e.target.textContent);
    });
}

for (var i=0; i<computations.length; i++) {
     var computation = computations[i];
    computation.addEventListener('click', function (e) {
        operations(e.target.textContent);
    });
}

clearButton.addEventListener('click', clear);

saveResult.addEventListener('click', addToLocalStorage);

function numberPress(number) {
    if (memoryNewNumber){
        calculatorDisplay.value = number;
        memoryNewNumber = false;
    } else {
        if (calculatorDisplay.value === '0') {
            calculatorDisplay.value = number;
        }
        else {
            calculatorDisplay.value += number;
        }
    }
}

function operations (op) {
    let localOPerationMemory = calculatorDisplay.value;

    if(memoryNewNumber && memoryPendingOPeration !== '='){
        calculatorDisplay.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
        if (memoryPendingOPeration === '+') {
            memoryCurrentNumber += parseFloat(localOPerationMemory);
        } else if (memoryPendingOPeration === '-') {
            memoryCurrentNumber -= parseFloat(localOPerationMemory);
        }
          else if (memoryPendingOPeration === '*') {
            memoryCurrentNumber *= parseFloat(localOPerationMemory);
         }
         else if (memoryPendingOPeration === '/') {
            memoryCurrentNumber /= parseFloat(localOPerationMemory);
         }
         else {
            memoryCurrentNumber = parseFloat(localOPerationMemory);
        }
        calculatorDisplay.value = memoryCurrentNumber;
        memoryPendingOPeration = op;
    }
}

function clear() {
    calculatorDisplay.value = '0';
}

function addToLocalStorage(){
    let lastNumber = calculatorDisplay.value;
    localStorage.setItem('last result', lastNumber);
    if (localStorage.getItem('last result') !== null) {
        lastResultOutput.value = localStorage.getItem('last result');
    }
}

window.onload = function() {
    if (localStorage.getItem('last result') !== null) {
        lastResultOutput.value = localStorage.getItem('last result');
    }
}
