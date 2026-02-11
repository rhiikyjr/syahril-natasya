// js/script.js

// Function to display current date and time
function displayDateTime() {
    const dateTimeContainer = document.getElementById('datetime');
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
    dateTimeContainer.innerHTML = formattedDateTime;
}

// Function to create an interactive animation
function startAnimation() {
    const animationContainer = document.getElementById('animation');
    let position = 0;
    const element = document.createElement('div');
    element.style.width = '50px';
    element.style.height = '50px';
    element.style.backgroundColor = 'red';
    element.style.position = 'absolute';
    animationContainer.appendChild(element);

    const id = setInterval(frame, 10);
    function frame() {
        if (position == 350) {
            clearInterval(id);
        } else {
            position++;
            element.style.top = position + 'px';
            element.style.left = position + 'px';
        }
    }
}

// Call functions to display date and start animation
window.onload = function() {
    displayDateTime();
    startAnimation();
};
