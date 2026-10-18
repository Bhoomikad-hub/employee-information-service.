const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON request body

// In-memory employee list
const employees = [
  { id: 1, name: 'Rahul', department: 'IT', salary: 35000 },
  { id: 2, name: 'Priya', department: 'HR', salary: 30000 },
  { id: 3, name: 'Arun', department: 'Finance', salary: 40000 }
];

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Employee Information Service!');
});

// GET all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// GET employee by ID
app.get('/employees/:id', (req, res) => {
  const employeeId = Number(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  return res.json(employee);
});

// POST route to add new employee
app.post('/employees', (req, res) => {
  const newEmployee = {
    id: employees.length + 1, // auto-increment ID
    ...req.body               // take data from request body
  };

  employees.push(newEmployee);

  res.status(201).json({
    message: 'Employee created',
    employee: newEmployee
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Update employee by ID
app.put('/employees/:id', (req, res) => {
  const employeeId = Number(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  // Update fields
  employee.name = req.body.name || employee.name;
  employee.department = req.body.department || employee.department;
  employee.salary = req.body.salary || employee.salary;

  res.json({
    message: 'Employee updated',
    employee: employee
  });
});
// Delete employee by ID
app.delete('/employees/:id', (req, res) => {
  const employeeId = Number(req.params.id);
  const index = employees.findIndex(emp => emp.id === employeeId);

  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees.splice(index, 1);

  res.json({ message: 'Employee deleted successfully' });
});

