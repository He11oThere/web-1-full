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
    event.preventDefault(); // Prevent form submission or page reload

    const yStr = document.getElementById("y").value.trim().replace(',','.');
    const xEl = document.querySelector('input[name="x"]:checked');
    const rSel = document.getElementById("R-select").value;

    // Validate X on the client side
    if (!isValidX(yStr)) {
        alert("Invalid Y value. It should be a number between -5 and 3.");
        return;
    }

    const x = parseFloat(xEl.value);
    const y = parseFloat(yStr);
    const r = parseFloat(rSel);

    // Prepare data for sending to the server
    const data = { x: x, y: y, r: r };

    // Send POST request to the server
    fetch("http://localhost:8080/fcgi-bin/web-1-full.jar", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resp => {
            if(!resp.ok) { // Check if any error occurred
                console.log('something is wrong with the response...');
                return resp.text().then(text => { throw new Error(text) });
            }
            else {
                console.log('success');
                return resp.json(); // Convert to JSON
            }
        })
        .then(result => { // Handle the data from the response
            console.log('result is: ' + JSON.stringify(result, null, 2)); // Pretty-print the JSON result
            addResultToTable(x, y, r, result.response.hit, result.currentTime, result.elapsedTime);
        })
        .catch(error => {
            console.error("catch error:", error);
        });
});

function isValidX(value) {
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