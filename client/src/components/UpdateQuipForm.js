import React, {Component} from 'react'


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
        return(
            <div>
                <h1>UpdateQuipForm</h1>
                <form onSubmit={this.handleUpdate}>
                    <label htmlFor="Quip">Quip: </label>
                    <input type="text" id="Quip" name="quip" onChange={this.handleChange} value={this.state.quip || ''}></input>
                    <label htmlFor="Quipper">Quipper: </label>
                    <input type="text" id="Quipper" name="quipper" onChange={this.handleChange} value={this.state.quipper || ''}></input>
                    <label htmlFor="Image">Image: </label>
                    <input type="text" id="Image" name="image" onChange={this.handleChange} value={this.state.image || ''}></input>
                    <button type="submit">Update</button>
                </form>
            </div>
        )
    }
}

export default UpdateQuipForm