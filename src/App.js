import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentRegistration from './pages/StudentRegistration';
import StudentList from './pages/StudentList';
import StudentDetails from './pages/StudentDetails';
import Navigation from './components/Navigation';
import StudentEdit from './pages/StudentEdit';
import Dashboard from './pages/Dashboard';
import { API_URL } from './config';
import './style.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // State for the success message


  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      const cachedData = localStorage.getItem('students');
      if (cachedData) {
        setStudents(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStudents(data);
        localStorage.setItem('students', JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Add student
  const addStudent = (newStudent) => {
    const id = students.length ? students[students.length - 1].id + 1 : 1;
    const updatedStudents = [...students, { id, ...newStudent }];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setMessage('Student registered successfully'); // Set success message
    setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
  };

  // Edit student
  const updateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setMessage('Student updated successfully'); // Set success message
    setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
  };

  // Delete student
  const deleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setMessage('Student deleted successfully'); // Set success message
    setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
  };

  if (loading) return <p>Loading students...</p>;
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <Router>
      <Navigation />
      {message && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <Routes>
        <Route path="/dashboard" element={<Dashboard students={students} />} />
        <Route
          path="/studentlist"
          element={<StudentList students={students} deleteStudent={deleteStudent} />}
        />
        <Route
          path="/register"
          element={<StudentRegistration addStudent={addStudent} />}
        />
        <Route
          path="/student/:id"
          element={<StudentDetails students={students} />}
        />
        <Route
          path="/student/edit/:id"
          element={<StudentEdit students={students} updateStudent={updateStudent} />}
        />

          <Route path="*" element={<Dashboard students={students} />} />
      </Routes>
     

    </Router>
  );
};

export default App;
