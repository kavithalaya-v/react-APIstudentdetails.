import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    axios.get(apiUrl)
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the student data', error);
        setLoading(false);
      });
  }, []);

  const addStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name,
      email,
      phone
    };
    setStudents([...students, newStudent]);
    setName('');
    setEmail('');
    setPhone('');
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  if (loading) {
    return <p>Loading student details...</p>;
  }

  return (
    <div style={{ backgroundColor: 'lightyellow', padding: '20px' }}>
      <h1>Student Management System</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <button onClick={() => deleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Student</h2>
      <form onSubmit={(e) => { e.preventDefault(); addStudent(); }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default App;
