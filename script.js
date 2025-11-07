let students = JSON.parse(localStorage.getItem('students')) || [];

function calculateGrade(marks) {
  if (marks >= 90) return "A+";
  else if (marks >= 75) return "A";
  else if (marks >= 60) return "B";
  else if (marks >= 45) return "C";
  else return "F";
}

function addStudent() {
  const name = document.getElementById('name').value.trim();
  const marks = parseFloat(document.getElementById('marks').value);

  if (!name || isNaN(marks)) {
    alert("Please enter valid name and marks.");
    return;
  }

  const grade = calculateGrade(marks);
  students.push({ name, marks, grade });
  localStorage.setItem('students', JSON.stringify(students));

  document.getElementById('name').value = '';
  document.getElementById('marks').value = '';
  displayStudents();
}

function displayStudents(filtered = students) {
  const tbody = document.getElementById('studentBody');
  tbody.innerHTML = '';

  filtered.forEach((s, index) => {
    const row = `
      <tr>
        <td>${s.name}</td>
        <td>${s.marks}</td>
        <td>${s.grade}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  updateSummary();
}

function editStudent(index) {
  const s = students[index];
  const newName = prompt("Edit name:", s.name);
  const newMarks = parseFloat(prompt("Edit marks:", s.marks));

  if (!newName || isNaN(newMarks)) return;

  students[index] = { name: newName, marks: newMarks, grade: calculateGrade(newMarks) };
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
  }
}

function searchStudent() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = students.filter(s => s.name.toLowerCase().includes(query));
  displayStudents(filtered);
}

function updateSummary() {
  const total = students.length;
  const avg = total ? (students.reduce((sum, s) => sum + s.marks, 0) / total).toFixed(2) : 0;
  const top = total ? students.reduce((a, b) => a.marks > b.marks ? a : b).name : 'N/A';

  document.getElementById('totalStudents').innerText = total;
  document.getElementById('averageMarks').innerText = avg;
  document.getElementById('topScorer').innerText = top;
}

displayStudents();
