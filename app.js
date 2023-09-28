const express = require('express')
const admin = require('firebase-admin')
const key = require('./key/my-project-90c1b-firebase-adminsdk-7j9ss-c9c2af5b1c.json')

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(key)
});

app.use(express.json())
app.use(express.urlencoded({extended: true}));
const db = admin.firestore();

app.post('/create', async(req, res) => {
  try{
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
    const response = await db.collection('users').add(userJson);
    res.send(response);
  }catch(error){
    res.send(error);
  }
})

app.get('/', async(req, res) =>{
  try{
    const users = db.collection('users')
    const response = await users.get();
    const data = [];
    response.forEach(doc => {
      data.push(doc. data())
    })
    res.send(data);
  }catch(error){
    res.send(error)
  }
})

app.get('/:id', async(req, res) =>{
  try{
    const users = db.collection('users').doc(req.params.id)
    const data = await users.get();
    res.send(data.data());
  }catch(error){
    console.log(error)
  }
})

app.post('/update', async(req, res) => {
  try{
    const id = req.body.id
    const newFirstName = "udin"
    const user = await db.collection('users').doc(id)
    .update({
      firstName: newFirstName
    })
    res.send(user)
  }catch(error){
    console.log(error)
  }
})

app.delete('/delete/:id', async(req, res) =>{
  try{
    const users = db.collection('users').doc(req.params.id).delete()
    res.send(users);
  }catch(error){
    console.log(error)
  }
})

const port = 8080
app.listen(port, ()=>{
  console.log(
    `server running on port http://localhost:${port}`
  )
})
