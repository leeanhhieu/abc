const express = require('express');
const app = express();
app.use(express.json());


const students = [
    { id: 1, name: 'Nguyen Van A', email: 'vana@example.com', phone: '123456789', gpa: 3.5, status: 'Active' },
    { id: 2, name: 'Tran Thi B', email: 'thib@example.com', phone: '987654321', gpa: 3.2, status: 'Inactive' }
];


app.get('/students', (req, res) => {
    res.json(students);
});


app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).send('Student not found.');
    }

  
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.phone = req.body.phone || student.phone;
    student.gpa = req.body.gpa || student.gpa;
    student.status = req.body.status || student.status;

    res.json(student);
});


app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Student not found.');
    }

    students.splice(index, 1);
    res.status(200).send('Student deleted.');
});

app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).send('Student not found.');
    }

    res.json(student);
});

// 


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
