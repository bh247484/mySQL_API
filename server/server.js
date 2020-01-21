const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
// const crudRoutes = require('./routes/crudRoutes.js')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/api', crudRoutes)

// Home route placeholder
app.get('/', (req, res)=>{
    res.send("Landed on API home. Use routes to access/manipulate data.")
})

// Declare Global Database Variable Below and Instantiate Connection Between Node and mySQL
let testDB = mysql.createConnection({
    host: "localhost",
    user: "default",
    password: "admin",
    database: "testDB"
  });

// Connect
// Middleware does not support new mySQL 8.0 password auth, either revert to old auth method or use mySQL version 5.7
testDB.connect((err) => {
    if(err){
        throw err;
        console.log("Create database below")
    }
    console.log('DB Connected...');
});

// Create DB by visiting localhost:3000/createdb/<desired-db-name-here>
// Then insert the DB name in above testDB object
// i.e. database: 'your_db_name_here', insert below password: <your-password>
app.get('/createdb/:dbName', (req, res) => {
    let queryString = 'CREATE DATABASE ' + req.params.dbName;
    testDB.query(queryString, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created, insert into testDB object above');
    });
});

// Declare Global Database and Table Variable Below
const _TABLE = "Quips"

// Create Table
app.get('/createtable/', (req, res)=>{
    let queryString = `CREATE TABLE ${_TABLE}(id int AUTO_INCREMENT, Quipper VARCHAR(255), Quip VARCHAR(500), PRIMARY KEY(id))`
    testDB.query(queryString, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table Created Successfully');
    });
})

// Tried to break routes out into separate file/folder but had trouble getting testDB Obj to export properly

// CREATE 
app.post('/api/createquip/', (req, res)=>{
    let payload = {Quipper: req.body.quipper, Quip: req.body.quip, image: req.body.image}
    let queryString = `INSERT INTO ${_TABLE} SET ?`;
    let query = testDB.query(queryString, payload, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.json(result)
    })
})

// READ ALL
app.get('/api/getallquips', (req, res)=>{
    let queryString = `SELECT * FROM ${_TABLE}`;
    let query = testDB.query(queryString, (err, results)=>{
        if(err) throw err;
        console.log(results)
        res.json(results)
    })
    console.log(query)
})

// READ SINGLE BY ID
app.get('/api/getquip/:id', (req, res)=>{
    let queryString = `SELECT * FROM ${_TABLE} WHERE id = ${req.params.id}`;
    let query = testDB.query(queryString, (err, results)=>{
        if(err) throw err;
        console.log(results)
        res.json(results)
    })
    console.log(query)
})

// UPDATE
app.post('/api/updatequip/:id', (req, res)=>{
    let updatedQuipper = req.body.quipper;
    let updatedQuip = req.body.quip;
    let updatedImage = req.body.image;
    let queryString = `UPDATE ${_TABLE} SET Quipper = ?, Quip = ?, image = ? WHERE id = ?`
    let parameters = [updatedQuipper, updatedQuip, updatedImage, parseInt(req.params.id, 10)]
    let query = testDB.query(queryString, parameters, (err, results)=>{
        if(err) throw err;
        console.log(results)
        res.json(results)
    })
})

// DELETE
app.delete('/api/deletequip/:id', (req, res)=>{
    let queryString = `DELETE FROM ${_TABLE} WHERE id = ${req.params.id}`;
    let query = testDB.query(queryString, (err, results)=>{
        if(err) throw err;
        console.log(results)
        res.send('Quip Deleted')
    })
})
  

app.listen(8000, (req, res)=>{
    console.log("Server is live on Port 8000")
})

