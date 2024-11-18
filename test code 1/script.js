let currentInputIndex = 0; // Tracks the current input field

// Get references to all inputs and buttons
const pinInputs = document.querySelectorAll('.pin-inputs input');
const keys = document.querySelectorAll('.key');
const deleteButton = document.getElementById('delete');
const submitButton = document.getElementById('submitPin');

// Handle number button clicks
keys.forEach((key) => {
    key.addEventListener('click', () => {
        const keyValue = key.getAttribute('data-key'); // Get the key value

        if (currentInputIndex < pinInputs.length) {
            pinInputs[currentInputIndex].value = keyValue; // Set the value
            currentInputIndex++; // Move to the next input
        }
    });
});

// Handle single deletion on button click
deleteButton.addEventListener('click', () => {
    if (currentInputIndex > 0) {
        currentInputIndex--; // Move back to the previous input
        pinInputs[currentInputIndex].value = ''; // Clear the current input field
    }
});

// Fast and continuous deletion on long press
let deleteInterval; // Interval ID for repeated deletion
const deleteSpeed = 50; // Faster deletion every 50ms

deleteButton.addEventListener('mousedown', () => {
    deleteInterval = setInterval(() => {
        if (currentInputIndex > 0) {
            currentInputIndex--; // Move back to the previous input
            pinInputs[currentInputIndex].value = ''; // Clear the current input field
        } else {
            clearInterval(deleteInterval); // Stop deleting if all inputs are cleared
        }
    }, deleteSpeed); // Fast repeat
});

// Stop continuous deletion on button release or mouse leave
deleteButton.addEventListener('mouseup', () => {
    clearInterval(deleteInterval);
});

deleteButton.addEventListener('mouseleave', () => {
    clearInterval(deleteInterval);
});

// Handle PIN submission
submitButton.addEventListener('click', () => {
    // Concatenate all values from the input fields
    const pin = Array.from(pinInputs).map((input) => input.value).join('');

    // Check if the PIN is fully entered
    if (pin.length === pinInputs.length) {
        alert(`Your PIN is: ${pin}`);
    } else {
        alert('Please complete entering the PIN.');
    }
});

// Optional: Clear all inputs on page load
document.addEventListener('DOMContentLoaded', () => {
    pinInputs.forEach((input) => (input.value = ''));
    currentInputIndex = 0; // Reset index on page load
});
