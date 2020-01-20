import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


class UpdateQuipForm extends Component{
    constructor(props){
        super(props);
        this.state = {
                quipper: "",
                quip: "",
                image: ""
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleUpdate = (e) =>{
        e.preventDefault()
        this.props.updateQuip(this.state, this.props.updateId)
        this.setState({quipper: "", quip: "", image: ""})
    }

    handleChange = (e) =>{
        let name = e.target.name
        let val = e.target.value
        this.setState({...this.state, [name]: val})
    }

    render(){
        if(this.props.showUpdateForm){
            // let inputQuip = document.querySelectorAll(".QuipForm")
            // inputQuip.value = this.props.updatePreFill.Quip
            console.log("change val")
        }
        
        console.log(this.props.updatePreFill)
        
        return(
            <div>

                <Modal show={this.props.showUpdateForm} onHide={this.props.toggleUpdateForm}>      
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Quip</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={this.handleUpdate}>
                            <Modal.Body>
                                <div className="form-group">
                                    <label htmlFor="Quip">Quip: </label>
                                    <input type="text" id="Quip" className="form-control" name="quip" onChange={this.handleChange} value={this.state.quip === "" && this.props.showUpdateForm === true ? this.props.updatePreFill.Quip : this.state.quip}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Quipper">Quipper: </label>
                                    <input type="text" id="Quipper" className="form-control" name="quipper" onChange={this.handleChange} value={this.state.quipper === "" && this.props.showUpdateForm === true ? this.props.updatePreFill.Quipper : this.state.quipper}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Image">Image: </label>
                                    <input type="text" id="Image" className="form-control" name="image" onChange={this.handleChange} value={this.state.image === "" && this.props.showUpdateForm === true ? this.props.updatePreFill.image : this.state.image}></input>
                                </div>

                            </Modal.Body>
                            
                        <Modal.Footer className="bg-dark">
                        <button type="submit">Update</button>
                        </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal> 
            </div>
        )
    }
}

export default UpdateQuipForm