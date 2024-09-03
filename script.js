document.addEventListener('DOMContentLoaded', () => {
    loadPostulations();

    const form = document.getElementById('postulationForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addPostulation();
    });

    document.getElementById('searchInput').addEventListener('input', filterTable);
});

function loadPostulations() {
    const data = JSON.parse(localStorage.getItem('postulations')) || [];
    const tableBody = document.getElementById('postulationTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach((postulation, index) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = postulation.companyName;
        row.insertCell().textContent = postulation.position;
        row.insertCell().innerHTML = `<a href="${postulation.link}" target="_blank">Ver enlace</a>`;
        row.insertCell().textContent = postulation.date;
        row.insertCell().textContent = postulation.status;
        row.insertCell().innerHTML = `<button onclick="deletePostulation(${index})">Eliminar</button>`;
    });
}

function addPostulation() {
    const companyName = document.getElementById('companyName').value;
    const position = document.getElementById('position').value;
    const link = document.getElementById('link').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    const data = JSON.parse(localStorage.getItem('postulations')) || [];
    data.push({ companyName, position, link, date, status });

    localStorage.setItem('postulations', JSON.stringify(data));
    loadPostulations();
    document.getElementById('postulationForm').reset();
}

function deletePostulation(index) {
    const data = JSON.parse(localStorage.getItem('postulations')) || [];
    data.splice(index, 1);
    localStorage.setItem('postulations', JSON.stringify(data));
    loadPostulations();
}

function filterTable() {
    const filter = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#postulationTable tbody tr');
    rows.forEach(row => {
        const companyName = row.cells[0].textContent.toLowerCase();
        row.style.display = companyName.includes(filter) ? '' : 'none';
    });
}
