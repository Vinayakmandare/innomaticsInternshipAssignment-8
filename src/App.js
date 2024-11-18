import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentRegistration from './pages/StudentRegistration';
import StudentList from './pages/StudentList';
import StudentDetails from './pages/StudentDetails';
import Navigation from './components/Navigation';
import { API_URL } from './config';
import './style.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    alert('Click on Student List');
  }, []);
  
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
  };

  // Delete student
  const deleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
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
      <Routes>
        <Route
          path="/"
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
      </Routes>
    </Router>
  );
};

export default App;
