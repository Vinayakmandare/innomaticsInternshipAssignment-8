import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const StudentEdit = ({ students, updateStudent }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentToEdit = students.find((student) => student.id === parseInt(id));

  const [formData, setFormData] = useState(studentToEdit || {});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!studentToEdit) {
      alert('Student not found!');
      navigate('/');
    }
  }, [studentToEdit, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(formData);
    setShowAlert(true); // Show alert on successful update
    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    navigate('/'); // Navigate back to the list page
  };

  return (
    <div className="container">
      <h2 className="text-center">Edit Student</h2>

      {/* Bootstrap Alert */}
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Student data has been successfully updated.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="register">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name || ''}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ''}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone || ''}
          onChange={handleInputChange}
        />
        <div className="form-actions">
          <button type="submit" className="btn btn-success">Update</button>
          <Link to="/" className="btn btn-secondary ms-2">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default StudentEdit;
