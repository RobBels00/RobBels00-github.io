let employeeData = [];
let employeeId = 1;

function addEmployee() {
    const name = document.getElementById('employeeName').value;
    const daysWorked = parseFloat(document.getElementById('daysWorked').value);
    const dailyRate = parseFloat(document.getElementById('dailyRate').value);
    const deduction = parseFloat(document.getElementById('deduction').value);

    const grossPay = daysWorked * dailyRate;
    const netPay = grossPay - deduction;

    employeeData.push({
        id: employeeId++,
        name,
        daysWorked,
        dailyRate,
        grossPay,
        deduction,
        netPay
    });

    updateTable();
    clearForm();
}

function updateTable() {
    const tableBody = document.getElementById('payrollTableBody');
    tableBody.innerHTML = '';

    let totalGrossPay = 0;
    let totalDeduction = 0;
    let totalNetPay = 0;

    employeeData.forEach(emp => {
        totalGrossPay += emp.grossPay;
        totalDeduction += emp.deduction;
        totalNetPay += emp.netPay;

        const row = `<tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.daysWorked.toFixed(2)}</td>
            <td>${emp.dailyRate.toFixed(2)}</td>
            <td>${emp.grossPay.toFixed(2)}</td>
            <td>${emp.deduction.toFixed(2)}</td>
            <td>${emp.netPay.toFixed(2)}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById('totalGrossPay').textContent = totalGrossPay.toFixed(2);
    document.getElementById('totalDeduction').textContent = totalDeduction.toFixed(2);
    document.getElementById('totalNetPay').textContent = totalNetPay.toFixed(2);
}

function clearForm() {
    document.getElementById('payrollForm').reset();
}

function editEmployee() {
    const empId = parseInt(document.getElementById('employeeNumber').value);
    const employee = employeeData.find(emp => emp.id === empId);

    if (employee) {
        document.getElementById('employeeName').value = employee.name;
        document.getElementById('daysWorked').value = employee.daysWorked;
        document.getElementById('dailyRate').value = employee.dailyRate;
        document.getElementById('deduction').value = employee.deduction;
        employeeData = employeeData.filter(emp => emp.id !== empId);
        updateTable();
    } else {
        alert('Employee not found!');
    }
}

function deleteEmployee() {
    const empId = parseInt(document.getElementById('employeeNumber').value);
    employeeData = employeeData.filter(emp => emp.id !== empId);
    updateTable();
}

function deleteAllEmployees() {
    employeeData = [];
    updateTable();
}