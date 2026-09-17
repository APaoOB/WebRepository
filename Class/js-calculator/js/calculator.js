 // ==========================================
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
    if (b === 0) {
        return new Error('The divisor cannot be zero.');
    }

    return a / b;
};


// ==========================================
// 3. TODO: HIGHER-ORDER FUNCTION ENGINE (Students write this)
// ==========================================

// TODO: Write the "calculator" orchestrator function
// Arguments: numA (Number), numB (Number), callback (Function)
// Checks:
//   - Is numA and numB actually valid numbers?
//   - Is callback actually a function?
// Execution: Returns callback(numA, numB)
function calculator(numA, numB, callback) {
    if (!Number.isFinite(numA) || !Number.isFinite(numB)) {
        return new Error('Please enter two valid numbers.');
    }

    if (typeof callback !== 'function') {
        return new Error('Please select a valid operation.');
    }

    return callback(numA, numB);
}


// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING (Students write this)
// ==========================================
calculateBtn.addEventListener('click', () => {
    // TODO: Extract values from the inputs and parse them as floats.
    const numA = Number.parseFloat(num1Input.value);
    const numB = Number.parseFloat(num2Input.value);

    // TODO: Retrieve the selected operation string value.
    const operation = operationSelect.value;

    // TODO: Match the selected operation string to its corresponding function reference.
    const operations = { add, subtract, multiply, divide };
    const callback = operations[operation];

    // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.
    const result = calculator(numA, numB, callback);

    // TODO: Update resultStatus text, toggling classes (e.g., alert-success vs alert-danger) based on outcomes!
    const isError = result instanceof Error;
    resultStatus.textContent = isError ? result.message : `Result: ${result}`;
    resultStatus.classList.remove('alert-secondary', 'alert-success', 'alert-danger');
    resultStatus.classList.add(isError ? 'alert-danger' : 'alert-success');
});