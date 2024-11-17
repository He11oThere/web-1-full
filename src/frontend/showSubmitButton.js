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
