const express = require("express")
const path = require("path")
const fs = require("fs")
const bodyparser=require("body-parser")
const app = express();
const port = 80;

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/contactGym', { useNewUrlParser: true })


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    emial: String,
    adress: String,
    password: String,
  });
  
  const contact= mongoose.model('contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded());

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const con = "this is my frist gym project";
    const parmas = { 'title': 'free fire is the best game', 'content': con };
    res.status(200).render('p.pug',parmas)

})
app.get('/contact', (req, res) => {
   
    const parmas = { };
    res.status(200).render('contact.pug',parmas)

})
app.get('/Fitness', (req, res) => {
   
    const parmas = { };
    res.status(200).render('Fitness.pug',parmas)

})
app.get('/about', (req, res) => {
   
    const parmas = { };
    res.status(200).render('about.pug',parmas)

})

app.post('/', (req,res) => {
    console.log(req.body)

    const parmas ={'title':'your form has been saved succesfully'};
    res.status(200).render('p.pug',parmas)

})

app.post('/contact', (req, res) => {
    const mydata=new contact(req.body)
    mydata.save().then(()=>{
     res.send("This items has been saved")
    }).catch(()=>{
       res.status(400).send("your data is not saved")
    })

    //res.status(200).render('contact.pug');

   
})

app.listen(port,()=>{
    console.log(`the application is sucessfully run on ${port}`)
});