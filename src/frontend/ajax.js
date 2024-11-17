document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        x: parseInt(formData.get('x')),
        y: parseFloat(formData.get('y')),
        r: parseInt(formData.get('R'))
    };

    fetch('http://localhost:8080/fcgi-bin/web-1-full.jar', {
        method: 'POST',
        mode: 'no-cors',
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
