import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const Navbarry = (props) =>{
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Quippery</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Button variant="light" onClick={props.toggleCreateForm}>Add New Quip</Button>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default Navbarry