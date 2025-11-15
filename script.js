const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const purposeInput = document.getElementById("purpose");
const documentType = document.getElementById("documentType");
const messageBox = document.getElementById("message");
const requestBtn = document.getElementById("requestBtn");
const pendingTable = document.getElementById("pendingTable");

let savedRequests = JSON.parse(localStorage.getItem("requests")) || [];

window.onload = () => {
    savedRequests.forEach(request => addRequestToTable(request));
};

function addRequestToTable(data) {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td><span class="date-bubble">${data.date}</span></td>
        <td>${data.type}</td>
        <td>${data.status}</td>
    `;

    pendingTable.appendChild(newRow);
}

function saveToDatabase(data) {
    savedRequests.push(data);
    localStorage.setItem("requests", JSON.stringify(savedRequests));
}

requestBtn.addEventListener("click", () => {
    if (!dateInput.value || !timeInput.value || !documentType.value || !purposeInput.value) {
        messageBox.textContent = "Please fill out all fields correctly before submitting.";
        messageBox.style.color = "red";
        return;
    }

    const newRequest = {
        date: dateInput.value,
        type: documentType.value,
        status: "Pending",
        time: timeInput.value,
        purpose: purposeInput.value
    };

    saveToDatabase(newRequest);

    addRequestToTable(newRequest);

    messageBox.textContent = "Your certificate request has been submitted successfully! We'll review your details shortly.";
    messageBox.style.color = "green";

    dateInput.value = "";
    timeInput.value = "";
    documentType.value = "";
    purposeInput.value = "";
});
