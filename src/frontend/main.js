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

document.getElementById("check-btn").addEventListener("click", function(event) {
    event.preventDefault();

    const yStr = document.getElementById("y").value.trim().replace(',','.');
    const xEl = document.querySelector('input[name="x"]:checked');
    const rSel = document.getElementById("R-select").value;

    if (!isValidY(yStr)) {
        // alert("Invalid Y value. It should be a number between -5 and 3.");
        return;
    }

    const x = parseFloat(xEl.value);
    const y = parseFloat(yStr);
    const r = parseFloat(rSel);

    const data = { x: x, y: y, r: r };

    fetch("http://localhost:8080/fcgi-bin/web-1-full.jar", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resp => {
            if(!resp.ok) {
                console.log('something is wrong with the response...');
                return resp.text().then(text => { throw new Error(text) });
            }
            else {
                console.log('success');

                return resp.json();
            }
        })
        .then(result => {
            console.log('result is: ' + JSON.stringify(result, null, 2));
            addResultToTable(x, y, r, result.response.hit, result.currentTime, result.elapsedTime);
            createBeerRain();
        })
        .catch(error => {
            console.error("catch error:", error);
        });
});

function isValidY(value) {
    const regex = /^-?\d+(\.\d+)?$/;

    return regex.test(value) && Number(value) >= -5 && Number(value) <= 3;
}


function addResultToTable(x, y, r, hit, currentTime, elapsedTime) {
    const resultBody = document.getElementById("resultTable");
    const newRow = document.createElement("tr");

    const xCell = document.createElement("td");
    xCell.textContent = x;

    const yCell = document.createElement("td");
    yCell.textContent = y;

    const rCell = document.createElement("td");
    rCell.textContent = r;

    const resultCell = document.createElement("td");
    resultCell.textContent = hit ? "Hit" : "Miss";

    const currentTimeCell = document.createElement("td");
    currentTimeCell.textContent = currentTime;

    const elapsedTimeCell = document.createElement("td");
    elapsedTimeCell.textContent = elapsedTime + " ms";

    newRow.appendChild(xCell);
    newRow.appendChild(yCell);
    newRow.appendChild(rCell);
    newRow.appendChild(resultCell);
    newRow.appendChild(currentTimeCell);
    newRow.appendChild(elapsedTimeCell);

    resultBody.appendChild(newRow);
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

// form.addEventListener('submit', function(event) {
//     event.preventDefault();
//
//     const response = new Promise((resolve) => {
//         setTimeout(() => resolve({ status: 200 }), 500);
//     });
//
//     response.then((response) => {
//         if (response.status === 200) {
//             createBeerRain();
//         }
//     });
// });

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

        const isValid = isValidY(yValue);

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
