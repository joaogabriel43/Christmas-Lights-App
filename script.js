const lightsContainer = document.getElementById('lightsContainer');
const toggleButton = document.getElementById('toggleLights');
const intervalInput = document.getElementById('interval');
const colorInput = document.getElementById('color');
const intensityInput = document.getElementById('intensity');
const sizeInput = document.getElementById('size');
const rowsInput = document.getElementById('rows');
let interval;
let currentIndex = 0;
const numLights = 20; // Número de lâmpadas por linha

function createLights(rows, size) {
    lightsContainer.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('lights');
        for (let j = 0; j < numLights; j++) {
            const light = document.createElement('div');
            light.classList.add('light');
            light.style.width = `${size}px`;
            light.style.height = `${size * 2}px`;
            row.appendChild(light);
        }
        lightsContainer.appendChild(row);
    }
}

function updateLights() {
    const lights = document.querySelectorAll('.light');
    lights.forEach((light, index) => {
        if (index === currentIndex) {
            light.style.backgroundColor = colorInput.value;
            light.style.opacity = intensityInput.value;
        } else if (index === currentIndex - 1 || index === currentIndex + 1) {
            light.style.opacity = 0.5;
        } else {
            light.style.opacity = 0.2;
        }
    });
    currentIndex = (currentIndex + 1) % lights.length;
}

toggleButton.addEventListener('click', () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    } else {
        interval = setInterval(updateLights, intervalInput.value);
    }
});

intervalInput.addEventListener('change', () => {
    if (interval) {
        clearInterval(interval);
        interval = setInterval(updateLights, intervalInput.value);
    }
});

sizeInput.addEventListener('change', () => {
    createLights(rowsInput.value, sizeInput.value);
});

rowsInput.addEventListener('change', () => {
    createLights(rowsInput.value, sizeInput.value);
});

createLights(rowsInput.value, sizeInput.value);