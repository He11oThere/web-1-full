document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    const data = {
        x: formData.get('x'),
        y: formData.get('y'),
        R: formData.get('R')
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/fcgi-bin/web-1-full.jar');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Успешно отправлено:', xhr.responseText);
            addResponseToTable(xhr.responseText);
        } else {
            console.error('Ошибка при отправке:', xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Ошибка сети при отправке');
    };

    xhr.send(JSON.stringify(data));
});

function addResponseToTable(responseText) {
    const tableBody = document.querySelector('#responseTable tbody');
    const response = JSON.parse(responseText);

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${response.x}</td>
        <td>${response.y}</td>
        <td>${response.R}</td>
        <td>${response.result}</td>
        <td>${response.currentTime}</td>
        <td>${response.executionTime}</td>
    `;

    tableBody.appendChild(row);
}
