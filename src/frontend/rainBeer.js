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
