function calculateTax() {
    const income = parseFloat(document.getElementById("income").value);
    let tax = 0;
    let explanation = ""; // To store the detailed solution

    if (isNaN(income) || income < 0) {
        document.getElementById("result").textContent = "₱0.00";
        document.getElementById("solution").textContent = "Please enter a valid income.";
        document.getElementById("taxInWords").textContent = "";
        return;
    }

    if (income <= 250000) {
        tax = 0;
        explanation = `Income is within the exempt bracket (₱0 - ₱250,000). No tax is applied.`;
    } else if (income <= 400000) {
        tax = 0 + (income - 250000) * 0.20;
        explanation = `
            Income: ₱${formatNumber(income)}<br>
            Basic Tax: ₱0<br>
            Excess over ₱250,000: ₱${formatNumber(income - 250000)}<br>
            Rate: 20%<br>
            Computation: ₱0 + (${formatNumber(income)} - 250,000) × 20% = ₱${formatNumber(tax)}
        `;
    } else if (income <= 800000) {
        tax = 30000 + (income - 400000) * 0.25;
        explanation = `
            Income: ₱${formatNumber(income)}<br>
            Basic Tax: ₱30,000<br>
            Excess over ₱400,000: ₱${formatNumber(income - 400000)}<br>
            Rate: 25%<br>
            Computation: ₱30,000 + (${formatNumber(income)} - 400,000) × 25% = ₱${formatNumber(tax)}
        `;
    } else if (income <= 2000000) {
        tax = 130000 + (income - 800000) * 0.30;
        explanation = `
            Income: ₱${formatNumber(income)}<br>
            Basic Tax: ₱130,000<br>
            Excess over ₱800,000: ₱${formatNumber(income - 800000)}<br>
            Rate: 30%<br>
            Computation: ₱130,000 + (${formatNumber(income)} - 800,000) × 30% = ₱${formatNumber(tax)}
        `;
    } else if (income <= 8000000) {
        tax = 490000 + (income - 2000000) * 0.32;
        explanation = `
            Income: ₱${formatNumber(income)}<br>
            Basic Tax: ₱490,000<br>
            Excess over ₱2,000,000: ₱${formatNumber(income - 2000000)}<br>
            Rate: 32%<br>
            Computation: ₱490,000 + (${formatNumber(income)} - 2,000,000) × 32% = ₱${formatNumber(tax)}
        `;
    } else {
        tax = 2410000 + (income - 8000000) * 0.35;
        explanation = `
            Income: ₱${formatNumber(income)}<br>
            Basic Tax: ₱2,410,000<br>
            Excess over ₱8,000,000: ₱${formatNumber(income - 8000000)}<br>
            Rate: 35%<br>
            Computation: ₱2,410,000 + (${formatNumber(income)} - 8,000,000) × 35% = ₱${formatNumber(tax)}
        `;
    }

    // Display the results
    document.getElementById("result").textContent = `₱${formatNumber(tax)}`;
    document.getElementById("solution").innerHTML = explanation;
    document.getElementById("taxInWords").textContent = `(${numberToWords(Math.round(tax))} pesos)`;
}

// Function to format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to convert numbers to words
function numberToWords(num) {
    const belowTwenty  = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", 
                         "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", 
                         "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand", "million"];

    if (num === 0) return "zero";

    let words = "";
    let i = 0;

    while (num > 0) {
        let chunk = num % 1000;
        if (chunk !== 0) {
            let chunkWords = "";
            if (chunk % 100 < 20) {
                chunkWords = belowTwenty[chunk % 100];
                chunk = Math.floor(chunk / 100);
            } else {
                chunkWords = belowTwenty[chunk % 10];
                chunk = Math.floor(chunk / 10);
                chunkWords = tens[chunk % 10] + (chunkWords ? " " + chunkWords : "");
                chunk = Math.floor(chunk / 10);
            }
            if (chunk > 0) chunkWords = belowTwenty[chunk] + " hundred " + chunkWords;
            words = chunkWords + " " + thousands[i] + " " + words;
        }
        num = Math.floor(num / 1000);
        i++;
    }

    return words.trim();
}
