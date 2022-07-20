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
    
const handleOperator = (sign) => {
    curVal && (firstOperands = parseFloat(curVal));
    operator = sign;

    curVal = '';
}

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
    secondOperands = parseFloat(curVal);
    console.log('sec', secondOperands, 'fis', firstOperands)
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

const clear = () => {
    $question.textContent = '';
    curVal = ''
    firstOperands = null;
    secondOperands = null;
}


$numbers.addEventListener('click', e => {
    let value = e.target.textContent;
    if ('1234567890.'.includes(value)) {
        curVal += value;
        // console.log('val', curVal)
        updateDom(value)
    }
    if (value === '=') {
        let result = equal(operator, firstOperands).toFixed(2);
        $question.textContent = result;
        firstOperands = +result;
        curVal = ''
        // console.log('firs', firstOperands, 'cur', curVal)
    }
})

$operators.addEventListener('click', e => {
    let sign = e.target.textContent;
    if (sign == 'AC') {
        clear();
    } else if ('-+/*'.includes(sign)){
        handleOperator(sign);
        updateDom(' ' + sign + ' ')
    }
})