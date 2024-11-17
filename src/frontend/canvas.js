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
