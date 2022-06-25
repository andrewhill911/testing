import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
const NavBar = (props) => {



    return(

        //create a blue navbar with links to the home page and the add employee page
        <div style={{
            backgroundColor:'#1a5fba',
            width:'100%',
            height:'10%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            padding:'1rem'

        }}>
            
            <Link style={{color:'white', textDecoration:'none', fontSize:'1.25rem'}}to="/">Home</Link>
            <Link style={{marginLeft:'2rem',color:'white', textDecoration:'none', fontSize:'1.25rem'}}to="/addEmployee">Add Employee</Link>
        </div>

    )
}
export default NavBar;
