import React from 'react';
import './studenttable.css';

const StudentTable = ({ students, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Pincode</th>
                    <th>Phone Number</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.id}</td>
                        <td>{student.email}</td>
                        <td>{student.address}</td>
                        <td>{student.city}</td>
                        <td>{student.state}</td> {/* Assuming 'state' is included in your student data */}
                        <td>{student.pincode}</td>
                        <td>{student.phno}</td>
                        <td>{student.age}</td>
                        <td>{student.gender}</td>
                        <td>
                            <button onClick={() => onEdit(student.id)}>Edit</button>
                            <button onClick={() => onDelete(student.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StudentTable;
