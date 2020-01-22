import React, {Component} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


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
        let updatedQuip = {}
        let currentState = this.state

        if(currentState.quipper === ""){
            updatedQuip.quipper = this.props.updatePreFill.Quipper
        } else {
            console.log("else")
            updatedQuip.quipper = currentState.quipper
        }
        if(currentState.quip === ""){
            updatedQuip.quip = this.props.updatePreFill.Quip
        } else {
            console.log("else")
            updatedQuip.quip = currentState.quip
        }
        if(currentState.image === ""){
            updatedQuip.image = this.props.updatePreFill.image
        } else {
            console.log("else")
            updatedQuip.image = currentState.image
        }
        
        console.log("updated Quip", updatedQuip)
        this.props.updateQuip(updatedQuip, this.props.updateId)
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
                <Modal show={this.props.showUpdateForm} onHide={this.props.toggleUpdateForm}>      
                    <Modal.Dialog>
                        <Modal.Header style={{backgroundColor: "#984d65"}} closeButton>
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
                            <Modal.Footer style={{backgroundColor: "#220e19"}}>
                                <Button style={{backgroundColor: "#571c33", border: "none"}} type="submit">Update</Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal> 
            </div>
        )
    }
}

export default UpdateQuipForm