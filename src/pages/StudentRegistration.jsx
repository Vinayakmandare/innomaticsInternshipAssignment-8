import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'
const StudentRegistration = ({ addStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    class: '',
    address: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(formData);
    setFormData({
      name: '',
      email: '',
      age: '',
      class: '',
      address: '',
      phone: ''
    });
  };

  return (
    <div className="container">
      <h2 className='text-center'>Register Student</h2>
      <form onSubmit={handleSubmit} className='register'>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <div className="form-actions">
          <button type="submit" className='btn btn-success'>Register</button>
        </div>
      </form>

      <button className='backBtn btn btn-primary'>
      <Link to="/">Back to Student List</Link>
      </button>
    </div>
  );
};

export default StudentRegistration;
