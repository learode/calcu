'use strict'
let $numbers = document.querySelector('.numbers');
let $equal = document.querySelector('.equal');
let $question = document.querySelector('.quest');
let $ans = document.querySelector('.ans');
let $operators = document.querySelector('.operators');

let curVal = '';
let operator = '';
let firstOperands = null;
let secondOperands = null;
let resultIsFirst = false;
    

const sum = (operands1, operands2) => {
    return operands1 + operands2;
} 
const subtract = (operands1, operands2) => {
    return operands1 - operands2;
} 
const divide = (operands1, operands2) => {
    return operands1 / operands2;
} 
const multiple = (operands1, operands2) => {
    return operands1 * operands2;
} 

const equal = (sign, firstOperands) => {
    secondOperands = Number(curVal);
    switch ( sign ) {
        case '+' :
            return sum(firstOperands, secondOperands);
        case '-' :
            return subtract(firstOperands, secondOperands);
        case '/' :
            return divide(firstOperands, secondOperands);
        case '*' :
            return multiple(firstOperands, secondOperands);
        default :
            return "";       
    }
}
                
const updateDom = (val) => {
    $question.textContent += (val);
}
const enableEqual = () => {
    document.querySelector('#equal').removeAttribute('disabled')
    document.querySelector('#dot').removeAttribute('disabled')
}

const clear = () => {
    $question.innerHTML = '';
    $ans.innerHTML = '';
    curVal = '';
    resultIsFirst = false;
    firstOperands = null;
    secondOperands = null;
    enableEqual()
}
const handleOperator = (sign) => {
    curVal && (firstOperands = Number(curVal)); // if the curval has a value
    enableEqual();
    operator = sign;
    curVal = ''; // reset the curval for the second operand
}

$numbers.addEventListener('click', e => {
    let value = e.target.textContent;
    if ('1234567890'.includes(value)) {
        resultIsFirst && clear()
        console.log(value);
        curVal += value;
        updateDom(value);
        enableEqual();
    } 
    if ('.'.includes(value) && !curVal.includes(value)) { // prevent multiple dots in an operand
        curVal += value;
        updateDom(value)
        e.target.setAttribute('disabled', 'true');
    }
})

$operators.addEventListener('click', e => {
    let sign = e.target.textContent;
    if ('-+/*'.includes(sign)){
        if (resultIsFirst && firstOperands) { //using the result as the first operand
            $question.innerHTML = ''
            updateDom(firstOperands)
            console.log(sign);
            updateDom(' ' + sign + ' ');
        }
        if (curVal || firstOperands ) { // prevent entry of sign if the curval is empty
            handleOperator(sign);
            console.log(sign);
            updateDom(' ' + sign + ' ');
        }
    }
})

document.querySelector('#ac').addEventListener('click', e => {
    if (e.target.textContent == 'AC') {
        clear();
    } 
})
document.querySelector('#equal').addEventListener('click', e => {
    if (e.target.textContent === '=') {
        let result = equal(operator, firstOperands);
        $ans.textContent = result;
        firstOperands = +result;
        resultIsFirst = true;
        curVal = ''
        e.target.setAttribute('disabled', 'true');
    }
})