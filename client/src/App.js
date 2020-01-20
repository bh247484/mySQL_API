import React, {Component} from 'react';
import axios from 'axios'
import NewQuipForm from './components/NewQuipForm.js'
import UpdateQuipForm from './components/UpdateQuipForm.js'

  // ==================================================
  // --------------  Component Config -----------------
  // ==================================================

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayForm: true,
      quips:  [],
      updateId: undefined,
      showCreateForm: false,
      showUpdateForm: false,
    }
    this.toggleCreateForm = this.toggleCreateForm.bind(this)
    this.createNewQuip = this.createNewQuip.bind(this)
    this.deleteQuip = this.deleteQuip.bind(this)
    this.updateQuip = this.updateQuip.bind(this)
    this.handleUpdateClick = this.handleUpdateClick.bind(this)
    
    
  }

  // ==================================================
  // ------------------ Crud Routes -------------------
  // ==================================================
  
  componentDidMount(){
      // using proxy 'localhost:8000' in package.json to circumvent CORS errors
      axios.get("/api/getallquips")
      .then((res)=>{
      let quips = res.data
      this.setState({...this.state, quips: quips})
      })
      .catch((err)=>{
        console.log(err)
      })
      
  }

  createNewQuip = (newQuip) =>{
    // Create Quip in Database
    axios.post("/api/createquip/", newQuip)
            .then((res)=>{
              console.log(res)

              // Create Quip in React State
              let newId = res.data.insertId
              console.log(newId)
              let editedQuip = {
                Quipper: newQuip.quipper,
                Quip: newQuip.quip,
                image: newQuip.image,
                id: newId
              }
              let quips = [...this.state.quips, editedQuip]
              this.setState({quips})
            })
            .catch((err)=>{
              console.log(err)
            })
  }

  deleteQuip = (e) =>{
    let id = e.target.parentNode.getAttribute("id")
    console.log(id)
    // Delete Quip In React State
    let quips = this.state.quips.filter((quip)=> quip.id != id, 10)
    console.log(quips)
    this.setState({quips: quips})
    
    // Delete Quip in Database
    let deleteURL = `/api/deletequip/${id}`
    
    axios.delete(deleteURL)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  updateQuip = (updatedQuip, id) =>{
    // Update Quip in React State and Set Show Update From to False
    let editedQuip = {
      Quipper: updatedQuip.quipper,
      Quip: updatedQuip.quip,
      image: updatedQuip.image,
      id: id
    }

    let quips = this.state.quips.map((quip)=>{
      if(quip.id === parseInt(id, 10)){
        return editedQuip
      } else {
        return quip
      }
    })
    this.setState({quips: quips, showUpdateForm: false})

    // Update Quip in Database
    let updateURL = `/api/updatequip/${id}`

    axios.post(updateURL, updatedQuip)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  // ==================================================
  // --------  Click Handlers//Form Togglers ----------
  // ==================================================

  
  handleUpdateClick = (e) =>{
    let updateId = e.target.parentNode.getAttribute("id")
    this.setState({...this.state, updateId: updateId, showUpdateForm: true})
  }

  toggleCreateForm = () =>{
    let updated = !this.state.showCreateForm 
    this.setState({showCreateFrom: updated})
  }

  // ==================================================
  // ------ JSX Returns and Component Rendering -------
  // ==================================================

  render(){
    let quips = this.state.quips.map((quip)=>(
      <div key={quip.id} id={quip.id}>
        <img src={quip.image} alt="The Quipper who Quip it is."></img>
        <p>{quip.Quip} --- {quip.Quipper}</p><button onClick={this.deleteQuip}>Delete Quip</button><button onClick={this.handleUpdateClick}>Update Quip</button>
      </div>
    ));
    return (
      <div className="App">
        <NewQuipForm toggleCreateForm={this.toggleCreateForm} createNewQuip={this.createNewQuip}/>
        {this.state.showUpdateForm ? (<UpdateQuipForm toggleUpdateForm={this.toggleUpdateForm} updateQuip={this.updateQuip} quips={this.state.quips}updateId={this.state.updateId}/>):null}
        {quips}
      </div>
    );
  }

}

export default App;
