import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Octicon, {Pencil} from '@primer/octicons-react' 

const Navbarry = (props) =>{
    return(
        <Navbar style={{backgroundColor: "#220e19"}} variant="dark">
            <Navbar.Brand href="#" style={{fontSize: "30px"}}><Octicon size='large' icon={Pencil} />    Quippery</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Button variant="light" size="lg" onClick={props.toggleCreateForm}>Add New Quip</Button>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default Navbarry