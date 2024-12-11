function calculateResults() {
    const nlimit = parseInt(document.getElementById("nlimit").value);
    const calculationType = document.getElementById("calculationType").value;
    let result;

    if (isNaN(nlimit) || nlimit < 1) {
        alert("Please enter a valid positive number.");
        return;
    }

    if (calculationType === "Factorial") {
        result = 1;
        for (let i = 1; i <= nlimit; i++) {
            result *= i;
        }
        document.getElementById("resultTitle").innerHTML = `Factorial of ${nlimit}:`;
    } else if (calculationType === "Sum") {
        result = 0;
        for (let i = 1; i <= nlimit; i++) {
            result += i;
        }
        document.getElementById("resultTitle").innerHTML = `Sum of the first ${nlimit} numbers:`;
    } else if (calculationType === "Average") {
        let sum = 0;
        for (let i = 1; i <= nlimit; i++) {
            sum += i;
        }
        result = (sum / nlimit).toFixed(2);
        document.getElementById("resultTitle").innerHTML = `Average of the first ${nlimit} numbers:`;
    }

    document.getElementById("result").innerHTML = result;
}
