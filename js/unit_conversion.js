// Conversion functions
const conversions = {
    fahrenheitToCelsius: (val) => ((val - 32) * 5/9).toFixed(2) + ' °C',
    celsiusToFahrenheit: (val) => ((val * 9/5) + 32).toFixed(2) + ' °F',
    metersToFeet: (val) => (val * 3.28084).toFixed(2) + ' ft',
    feetToMeters: (val) => (val / 3.28084).toFixed(2) + ' m',
    kilometersToMiles: (val) => (val * 0.621371).toFixed(2) + ' mi',
    milesToKilometers: (val) => (val / 0.621371).toFixed(2) + ' km'
};

function convert() {
    const conversionType = document.getElementById('conversionType').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const resultElement = document.getElementById('result');

    // Input validation
    if (isNaN(inputValue)) {
        resultElement.textContent = 'Please enter a valid number';
        resultElement.style.color = 'red';
        return;
    }

    // Perform conversion
    try {
        const result = conversions[conversionType](inputValue);
        const conversionName = conversionType.replace(/([A-Z])/g, ' $1').trim();
        resultElement.textContent = `${inputValue} ${conversionName} = ${result}`;
        resultElement.style.color = '#333';
    } catch (error) {
        resultElement.textContent = 'Conversion error. Please try again.';
        resultElement.style.color = 'red';
    }
}

// Allow conversion on Enter key press
document.getElementById('inputValue').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convert();
    }
});