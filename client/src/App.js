import React, {Component} from 'react';
import axios from 'axios'
import NewQuipForm from './components/NewQuipForm.js'
import UpdateQuipForm from './components/UpdateQuipForm.js'
import Navbarry from './components/Navbarry.js'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

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
      updatePreFill: {
        Quip: "placeholder",
        Quipper: "placeholder",
        image: "placeholder"
      },
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
        this.setState({showCreateForm: false})
  }

  deleteQuip = (e) =>{
    let id = e.target.getAttribute("id")
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
    let updateId = e.target.getAttribute("id")
    let updatedPreFill = this.state.quips.filter((quip)=>{
      return updateId == quip.id
    })
    this.setState({...this.state, updateId: updateId, showUpdateForm: true, updatePreFill: updatedPreFill[0]})
  }

  toggleCreateForm = () =>{
    let currentBool = this.state.showCreateForm
    this.setState({showCreateForm: !currentBool})
  }

  toggleUpdateForm = () =>{
    let currentBool = this.state.showUpdateForm
    this.setState({showUpdateForm: !currentBool})
  }

  // ==================================================
  // ------ JSX Returns and Component Rendering -------
  // ==================================================

  render(){
    let quips = this.state.quips.map((quip)=>(
      <Col>
        <Card key={quip.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={quip.image} alt="The Quipper who Quip it is." />
          <Card.Body>
            <Card.Title>{quip.Quipper}</Card.Title>
            <Card.Text>
              "{quip.Quip}"
            </Card.Text>
            <Button variant="dark" id={quip.id} onClick={this.deleteQuip}>Delete Quip</Button>
            <Button variant="dark" id={quip.id} onClick={this.handleUpdateClick}>Update Quip</Button>
          </Card.Body>
        </Card>
      </Col>
    ));
    return (
      <div className="App">
        <Navbarry toggleCreateForm={this.toggleCreateForm}/>
        <NewQuipForm toggleCreateForm={this.toggleCreateForm} createNewQuip={this.createNewQuip} showCreateForm={this.state.showCreateForm}/>
        <UpdateQuipForm toggleUpdateForm={this.toggleUpdateForm} showUpdateForm={this.state.showUpdateForm} updateQuip={this.updateQuip} updatePreFill={this.state.updatePreFill} updateId={this.state.updateId}/>
        <Container>
          <Row>
            {quips}
          </Row>
        </Container>
      </div>
    );
  }

}

export default App;
