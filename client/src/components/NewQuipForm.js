import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


class NewQuipForm extends Component{
    constructor(props){
        super(props);
        this.state = {
                quipper: "",
                quip: "",
                image: ""

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.createNewQuip(this.state)
        this.setState({quipper: "", quip: "", image: ""})
    }

    handleChange = (e) =>{
        let name = e.target.name
        let val = e.target.value
        this.setState({...this.state, [name]: val})
    }

    

    render(){
        return(
    <div>
        <Modal show={this.props.showCreateForm} onHide={this.props.toggleCreateForm}>      
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Quip</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="Quip">Quip:  </label>
                            <input type="text" id="Quip" className="form-control" name="quip" onChange={this.handleChange} value={this.state.quip || ""}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Quipper">Quipper: </label>
                            <input type="text" id="Quipper" className="form-control" name="quipper" onChange={this.handleChange} value={this.state.quipper || ""}></input>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="Image">Image: </label>
                            <input type="text" id="Image" className="form-control" name="image" onChange={this.handleChange} value={this.state.image || ""}></input>
                        </div>
                    </Modal.Body>
                    
                <Modal.Footer className="bg-dark">
                <button type="submit">Submit</button>
                </Modal.Footer>
                </form>
            </Modal.Dialog>
        </Modal>

    </div>            
        )
    }
}

export default NewQuipForm