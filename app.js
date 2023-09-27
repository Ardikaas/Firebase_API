const express = require('express')
const admin = require('firebase-admin')
const key = require('./my-project-90c1b-firebase-adminsdk-7j9ss-c9c2af5b1c.json')

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(key)
});

app.use(express.json())
app.use(express.urlencoded({extended: true}));
const db = admin.firestore();

app.post('/create', async(req, res) => {
  try{
    const id = req.body.email;
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


const port = 8080
app.listen(port, ()=>{
  console.log(
    `server running on port http://localhost:${port}`
  )
})
