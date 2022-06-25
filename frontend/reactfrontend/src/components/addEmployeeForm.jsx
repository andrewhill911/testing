import React, {useEffect, useState} from 'react';
import isMatch from 'date-fns/isMatch';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';

const AddEmployeeForm = (props) => {
    //make an add employee form that takes in first name, last name, middle initial, date of birth, date of employment, and active status
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        middleInitial: '',
        dateOfBirth: '',
        dateOfEmployment: '',
        active: false
    });
    const [displayDateError, setDisplayDateError] = useState(false);
    const [displayError, setDisplayError] = useState('');

    const handleChange = (event) => {
        
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        });
    }

    //write an add employee function that connects to "http://127.0.0.1:5000/add_employee" and posts the employee object
    const addEmployee = (event) => {
        event.preventDefault();
        fetch('http://127.0.0.1:5000/employees/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee)
        })
        .then(res => res.status === 200 ? props.handleSuccess(true):props.handleError(true))
        

        
        
        
        .catch(err => console.log(err));
    }

    let dateError = (
        <div style={{
            backgroundColor:'rgba(255, 119, 46, 0.9)',
            width:'40%',
            borderRadius:'5px',
            padding:'10px',
            display:'flex',
            flexDirection:'column',
            fontSize:'1.25rem',
            color:'white',
            margin:'1.25rem'
            
            }}>
                <div style={{alignSelf:'flex-end'}}>
                <button style={{background:'none', border:'none'}} onClick={()=>setDisplayDateError(false)}>
                <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
            <p style={{alignSelf:'center'}}>Dates must be in MM/dd/yyyy format.</p>
        </div>
    )
    useEffect(() => {
        if(displayDateError){
            setDisplayError(dateError);
        } else if (!displayDateError){
            setDisplayError('');
    }
    }, [displayDateError])

    const handleCheckbox = (event) => {
        setEmployee({
            ...employee,
            ['active']: event.target.checked
        })
    }



    const handleSubmit = (event) => {

        
            
        
        event.preventDefault();
        
        let match = isMatch(employee.dateOfBirth, 'MM/dd/yyyy');
        setDisplayDateError(!match);
        if(match){
            addEmployee(event);
            setEmployee({
                firstName: '',
                lastName: '',
                middleInitial: '',
                dateOfBirth: '',
                dateOfEmployment: '',
                active: false
            });
        }
        
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            

        }}>
            {setDisplayDateError ? displayError: ''}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '20%',
                width: '20%',
                borderRadius: '5px',
                backgroundColor: '#fff',
                padding:'1rem',
                //drop shadow
                boxShadow: '0px 0px 3px rgba(0,0,0,0.5)'
            }}>
            <form style={{display:'flex', flexDirection:'column'}}onSubmit={handleSubmit}>
                <input style={{fontFamily:'Roboto', fontWeight:300,background:'none',marginTop:'1.5rem',outline:'none', border:'none', borderBottom:'1px solid grey', fontSize:'1.25rem'}}type="text" name="firstName" placeholder="First Name"value={employee.firstName} onChange={handleChange} />
                <input style={{background:'none',marginTop:'1.5rem',outline:'none', border:'none', borderBottom:'1px solid grey', fontSize:'1.25rem'}}type="text" name="lastName" placeholder="Last Name"value={employee.lastName} onChange={handleChange} />
                <input style={{background:'none',marginTop:'1.5rem',outline:'none', border:'none', borderBottom:'1px solid grey', fontSize:'1.25rem'}}type="text" name="middleInitial" placeholder="Middle Initial"value={employee.middleInitial} onChange={handleChange} />
                <input style={{background:'none',marginTop:'1.5rem',outline:'none', border:'none', borderBottom:'1px solid grey', fontSize:'1.25rem'}}type="text" name="dateOfBirth" placeholder="Date of Birth"value={employee.dateOfBirth} onChange={handleChange} />
                <input style={{background:'none',marginTop:'1.5rem',outline:'none', border:'none', borderBottom:'1px solid grey', fontSize:'1.25rem'}}type="text" name="dateOfEmployment" placeholder="Date of Employment"value={employee.dateOfEmployment} onChange={handleChange} />
                <div style={{background:'none',marginTop:'1.5rem',display:'flex', flexDirection:'row', alignSelf:'flex-start'}}>
                <label style={{ontSize:'1.25rem'}}>Active</label>
                <input style={{marginLeft: '1rem',zoom:'1.5'}}type="checkbox" name="active" value={employee.active} onChange={handleCheckbox} />
                </div>
                <button style={{
                    backgroundColor:'#1d76cf',
                    color:'white',
                    border:'none',
                    padding:'1rem',
                    borderRadius:'.25rem',
                    boxShadow:'0 0.25rem 0.25rem rgba(0,0,0,0.15)',
                    cursor:'pointer',
                    marginTop:'1rem',
                    fontSize:'1.25rem',
                }}>Save</button>
                
            </form>
            </div>
        </div>
    )
}




export default AddEmployeeForm;