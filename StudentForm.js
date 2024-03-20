import React, { Component } from 'react';
import StudentFormInput from './StudentFormInput';
import StudentTable from './StudentTable';
import data from './data.json'; // Import JSON data
import './studentform.css';

class StudentForm extends Component {
    constructor() {
        super();
        this.state = {
            students: [],
            name: '',
            id: '',
            email: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            phno: '',
            age:'',
            gender:'',
            editingId: null,
            errors: {},
            states: data.states.map(state => state.name), // Extract states from JSON
            cities: [],
            pincodes: []
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        const { name, value } = e.target;
        let errors = { ...this.state.errors};

    // Perform validation based on the field name
    switch (name) {
        case 'name':
            errors.name = !/^[a-zA-Z\s]+$/.test(value) ? 'Invalid Name' : '';
            break;
        case 'email':
            errors.email = !value.includes('@') ? 'Invalid Email' : '';
            break;
        case 'address':
            errors.address = !/^[a-zA-Z\s]+$/.test(value) ? 'Invalid Address' : '';
            break;
        case 'city':
            errors.city = !/^[a-zA-Z\s]+$/.test(value) ? 'Invalid City' : '';
            break;
        case 'state':
            errors.state = !/^[a-zA-Z\s]+$/.test(value) ? 'Invalid State' : '';
            break;
        case 'pincode':
            errors.pincode = !/^\d{6}$/.test(value) ? 'Invalid Pincode' : '';
            break;
        case 'phno':
            errors.phno = !/^\d{10}$/.test(value) ? 'Invalid Phone number' : '';
            break;
        case 'age':
            errors.age = !/^\d+$/.test(value)?'Invalid Age':'';
            break;
        default:
            break;
    }

        this.setState({ errors, [name]: value });
        
    };

    handleStateChange = (e) => {
        const selectedState = e.target.value;
        const selectedStateData = data.states.find(state => state.name === selectedState);
        const cities = selectedStateData ? selectedStateData.cities.map(city => city.name) : [];
        this.setState({ state: selectedState, city: '', cities, pincode: '' });
    };

    handleCityChange = (e) => {
        const selectedCity = e.target.value;
        const selectedStateData = data.states.find(state => state.name === this.state.state);
        const selectedCityData = selectedStateData ? selectedStateData.cities.find(city => city.name === selectedCity) : null;
        const pincodes = selectedCityData ? selectedCityData.pincodes : [];
        this.setState({ city: selectedCity, pincode: '', pincodes });
    };

    handleSubmit = (e) => 
    {
        
         e.preventDefault();
         const { name, id, email, address, city, state, pincode, phno, age, gender, editingId, errors } = this.state;
     // Check if any field is empty    
        if (!name || !email || !address || !city || !state || !pincode || !phno || !age || !gender) {
        this.setState({ errors: {name: !name ? 'Name is required' : '',
                                email: !email ? 'Email is required' : '', 
                                address: !address ? 'Address is required' : '',
                                city: !city ? 'City is required' : '', 
                                state: !state ? 'State is required' : '',
                                pincode: !pincode ? 'Pincode is required' : '',
                                phno: !phno ? 'Phone number is required' : '',
                                age: !age ? 'Age is required' : '',
                                gender: !gender ? 'Gender is required' : '',
            }});
            return;
        }
        // Check if any error exists    
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }
        // If editing, update student    
        if (editingId !== null) {
            const updatedStudents = this.state.students.map((student) =>
                student.id === editingId ? { ...student, name, id, email, address, city, state, pincode, phno, age, gender } : student
            );
            this.setState({
                students: updatedStudents,
                name: '',
                id: '',
                email: '',
                address: '',
                city: '',
                state: '',
                pincode: '',
                phno: '',
                age:'',
                gender:'',
                editingId: null,
                errors: {},
            }); 
        } 
        else { // Add new student
            const newStudent = { name, id: Date.now(), email, address, city, state, pincode, phno, age, gender };
            this.setState((prevState) => ({
                students: [...prevState.students, newStudent],
                name: '',
                id: '',
                email: '',
                address: '',
                city: '',
                state: '',
                pincode: '',
                phno: '',
                age:'',
                gender:'',
                editingId: null,
                errors: {},
            }));
        }
    };
    handleEdit = (id) => {
        const studentToEdit = this.state.students.find((student) => student.id === id);
        this.setState({
            name: studentToEdit.name,
            id: studentToEdit.id,
            email: studentToEdit.email,
            address: studentToEdit.address,
            city: studentToEdit.city,
            state: studentToEdit.state,
            pincode: studentToEdit.pincode,
            phno: studentToEdit.phno,
            age: studentToEdit.age,
            gender: studentToEdit.gender,
            editingId: id, 
            errors: {},
        });
    };

    handleDelete = (id) => {
        const updatedStudents = this.state.students.filter((student) => student.id !== id);
        this.setState({ students: updatedStudents });
    };


    render() {
        const { students, errors, states, cities, pincodes } = this.state;

        return (
            <div className='student-form-container'>
                <h2 className='student-form-title'>Student Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <StudentFormInput label="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} error={errors.name} />
                    <StudentFormInput label="Email" type="email" name="email" value={this.state.email} onChange={this.handleChange} error={errors.email} />
                    <StudentFormInput label="Address" type="text" name="address" value={this.state.address} onChange={this.handleChange} error={errors.address} />
                    <div className='dropdown-container'>
                    <label htmlFor="state">State:</label>
                    <select id="state" type="text" name="state" value={this.state.state} onChange={this.handleStateChange} error={errors.state}>
                        <option value="">Select</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                    </div>
                    
                    <div className='dropdown-container'>
                    <label htmlFor="city">City:</label>
                    <select id="city" type="text" name="city" value={this.state.city} onChange={this.handleCityChange} error={errors.city}>
                        <option value="">Select</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                    </div>
                    
                    <div className='dropdown-container'>
                    <label htmlFor="pincode">Pincode:</label>
                    <select id="pincode" type="number" name="pincode" value={this.state.pincode} onChange={this.handleChange} error={errors.pincode}>
                        <option value="">Select</option>
                        {pincodes.map((pincode, index) => (
                            <option key={index} value={pincode}>{pincode}</option>
                        ))}
                    </select>
                    </div>

                    <StudentFormInput label="Phone_Number" type="number" name="phno" value={this.state.phno} onChange={this.handleChange} error={errors.phno} />
                    <StudentFormInput label="Age" type="number" name="age" value={this.state.age} onChange={this.handleChange} error={errors.age} />
                    <div>
                        <label>Gender:</label>
                        <label>
                            <input type="radio" name="gender" value="male" checked={this.state.gender==="male"} onChange={this.handleChange} error={errors.gender} />Male</label>
                        <label>
                            <input type="radio" name="gender" value="female" checked={this.state.gender==="female"} onChange={this.handleChange} error={errors.gender}/>Female</label>
                        
                    </div>
                    <button className='student-form-button' type="submit">{this.state.editingId !== null ? 'Update' : 'Submit'}</button>
                </form>

                <h2 className='student-table-title'>Student Table</h2>
                <StudentTable students={students} onEdit={this.handleEdit} onDelete={this.handleDelete} />
            </div>
        );
    }
}

export default StudentForm;


