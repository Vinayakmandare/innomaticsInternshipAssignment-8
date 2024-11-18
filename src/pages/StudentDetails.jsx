import React from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const StudentDetails = ({ students }) => {
  const { id } = useParams();
  const student = students.find((student) => student.id === parseInt(id));

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <>
    <div className="container card col-4 my-4">
      <h2 className='text-center'>Student Details</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Class:</strong> {student.class}</p>
      <p><strong>Address:</strong> {student.address}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
    </div>
    <div className="text-center">
    <button className='backBtn btn btn-primary'>
     <NavLink to="/">Back</NavLink> 
     </button>
     </div>
    </>
  );
};

export default StudentDetails;
