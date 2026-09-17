 /*// ==========================================
// 1. UI SELECTORS
// ==========================================
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultStatus = document.getElementById('result-status');

// ==========================================
// 2. TODO: BASIC CALLBACK MATH FUNCTIONS (Students write these)
// ==========================================

// TODO: Write "add" callback expression (a, b) => ...
const add = (a, b) => a + b;

// TODO: Write "subtract" callback expression (a, b) => ...
const subtract = (a, b) => a - b;

// TODO: Write "multiply" callback expression (a, b) => ...
const multiply = (a, b) => a * b;

// TODO: Write "divide" callback expression (a, b) => ...
// Rule: Guard against division-by-zero! Return an Error or string warning.
const divide = (a, b) => {
    if (b == 0) {
        throw new Error('Division by zero is not allowed.');
    }
    return a / b;
}
//try catch for cases in which there is uncertaninty and you dont know what the user will do. 
// If you have the developer paranoia and there are specific cases, it is ok to use the if else.

// ==========================================
// 3. TODO: HIGHER-ORDER FUNCTION ENGINE (Students write this)
// ==========================================

// TODO: Write the "calculator" orchestrator function
// Arguments: numA (Number), numB (Number), callback (Function)
// Checks:
//   - Is numA and numB actually valid numbers?
//   - Is callback actually a function?
// Execution: Returns callback(numA, numB)


// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING (Students write this)
// ==========================================
calculateBtn.addEventListener("click", () => {
    // alert('click');
    // TODO: Extract values from the inputs and parse them as floats.
    console.log(num1Input.value); //print in the browser console
    console.log(num2Input.value); //print in the browser console
    // TODO: Retrieve the selected operation string value.
    

    // TODO: Match the selected operation string to its corresponding function reference.

    // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.

    // TODO: Update resultStatus text, toggling classes (e.g., alert-success vs alert-danger) based on outcomes!
});
*/