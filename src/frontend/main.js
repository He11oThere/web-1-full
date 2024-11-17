const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawCoordinatePlane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';

    const r = 3;
    const marks = [
        { value: r, label: 'R' },
        { value: r / 2, label: 'R/2' },
        { value: -r, label: '-R' },
        { value: -r / 2, label: '-R/2' }
    ];

    ctx.fillStyle = '#0898CCFF';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - (r / 2) * 40, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 - (r / 2) * 40, canvas.height / 2 - (r) * 40);
    ctx.lineTo(canvas.width / 2, canvas.height / 2 - (r) * 40);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#0898CCFF';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (r/2) * 40, -Math.PI, 0, false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = '#0898CCFF';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2, canvas.height / 2 + (r / 2) * 40);
    ctx.lineTo(canvas.width / 2 + (r) * 40, canvas.height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.fillStyle = 'black';
    marks.forEach(mark => {
        const x = canvas.width / 2 + mark.value * 40;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height / 2 - 5);
        ctx.lineTo(x, canvas.height / 2 + 5);
        ctx.stroke();
        ctx.fillText(mark.label, x + 5, canvas.height / 2 + 15);

        const y = canvas.height / 2 - mark.value * 40;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 5, y);
        ctx.lineTo(canvas.width / 2 + 5, y);
        ctx.stroke();
        ctx.fillText(mark.label, canvas.width / 2 + 10, y + 5);
    });

    ctx.fillText('X', canvas.width - 15, canvas.height / 2 - 5);
    ctx.fillText('Y', canvas.width / 2 + 5, 15);
}

drawCoordinatePlane();

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    const data = {
        x: parseInt(formData.get('x')),
        y: parseFloat(formData.get('y')),
        r: parseInt(formData.get('R'))
    };

    console.log('Отправляемые данные:', JSON.stringify(data));

    fetch('http://localhost:8080/fcgi-bin/web-1-full.jar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(jsonResponse => {
            console.log('Ответ сервера:', jsonResponse);
            addResponseToTable(jsonResponse);
        })
        .catch(error => {
            console.error("Ошибка при отправке:", error);
        });
});


function addResponseToTable(response) {
    const tableBody = document.querySelector('#resultTable tbody');
    const newRow = document.createElement('tr');

    const xCell = document.createElement('td');
    xCell.textContent = response.x;
    newRow.appendChild(xCell);

    const yCell = document.createElement('td');
    yCell.textContent = response.y;
    newRow.appendChild(yCell);

    const rCell = document.createElement('td');
    rCell.textContent = response.r;
    newRow.appendChild(rCell);

    const hitCell = document.createElement('td');
    hitCell.textContent = response.hit ? "True" : "False";
    newRow.appendChild(hitCell);

    const currentTimeCell = document.createElement('td');
    currentTimeCell.textContent = response.current_time;
    newRow.appendChild(currentTimeCell);

    const executionTimeCell = document.createElement('td');
    executionTimeCell.textContent = `${response.execution_time_ns} ns`;
    newRow.appendChild(executionTimeCell);

    tableBody.appendChild(newRow);
}

const form = document.getElementById('form');

function createBeerRain() {
    const duration = 2000;
    const beerEmoji = '🍺';
    const emojiCount = 50;

    for (let i = 0; i < emojiCount; i++) {
        const emojiElement = document.createElement('span');
        emojiElement.textContent = beerEmoji;
        emojiElement.style.position = 'fixed';
        emojiElement.style.top = '-50px';
        emojiElement.style.left = `${Math.random() * 100}vw`;
        emojiElement.style.fontSize = '30px';
        emojiElement.style.opacity = Math.random();

        const randomRotation = Math.random() * 90 - 45;
        emojiElement.style.transform = `rotate(${randomRotation}deg)`;

        document.body.appendChild(emojiElement);

        const fallingSpeed = Math.random() * 2000 + 1000;

        const fallingDistance = window.innerHeight + 50;
        emojiElement.animate(
            [
                { transform: `translateY(0) rotate(${randomRotation}deg)` },
                { transform: `translateY(${fallingDistance}px) rotate(${randomRotation}deg)` }
            ],
            {
                duration: fallingSpeed,
                easing: 'ease-in',
                fill: 'forwards'
            }
        );

        setTimeout(() => {
            emojiElement.remove();
        }, fallingSpeed);
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const response = new Promise((resolve) => {
        setTimeout(() => resolve({ status: 200 }), 500);
    });

    response.then((response) => {
        if (response.status === 200) {
            createBeerRain();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const submitButton = document.querySelector('.submit-button input[type="submit"]');
    const radioInputs = document.querySelectorAll('input[name="x"]');
    const rSelect = document.getElementById('R-select');

    const yInput = document.getElementById('y');
    const yErrorTooltip = document.createElement('div');
    yErrorTooltip.textContent = 'Введите целое число от -5 до 3';
    yErrorTooltip.style.color = 'red';
    yErrorTooltip.style.display = 'none';
    yInput.parentElement.appendChild(yErrorTooltip);

    function validateX() {
        for (let radio of radioInputs) {
            if (radio.checked) return true;
        }
        return false;
    }

    function validateY() {
        const yValue = yInput.value.trim();

        const isValid = /^-?\d+$/.test(yValue) && Number(yValue) >= -5 && Number(yValue) <= 3;

        if (isValid) {
            yInput.style.borderColor = '';
            yErrorTooltip.style.display = 'none';
        } else {
            yInput.style.borderColor = 'red';
            yErrorTooltip.style.display = 'block';
        }

        return isValid;
    }

    yInput.addEventListener('input', validateY);

    function validateR() {
        return rSelect.value !== '';
    }

    function validateForm() {
        const isValid = validateX() && validateY() && validateR();
        submitButton.style.display = isValid ? 'block' : 'none';
    }

    form.addEventListener('input', validateForm);
    validateForm();
});
