import React from 'react';
import './studentforminput.css';

const StudentFormInput = ({ label, name, value, onChange,checked, error }) => {
    return (
        <div className='input-container'>
            <label className='input-container label' htmlFor={name}>{label}:</label>
            <input className='input-container input' type="text" id={name} name={name} value={value} onChange={onChange} />
            {error && <span className='error-message'>{error}</span>}
            
        </div>
    );
};

export default StudentFormInput;