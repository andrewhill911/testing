import React, {useEffect, useState} from 'react';
import EmployeesTableC from '../components/emc';
import EmployeesTable from '../components/employeesTable';
import NavBar from '../components/navBar';

const HomePage = (props) => {

    return (
        <div>
            <NavBar/>
            <div style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                height:'100%',
                width:'100%',

            }}>
            <h1 style={{color:'white', margin:'1.25rem'}}>Home</h1>
            <EmployeesTableC/>
            </div>
        </div>

    )
}
export default HomePage;