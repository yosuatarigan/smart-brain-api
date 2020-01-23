const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controller/register');
const signin = require('./Controller/signin');
const profile = require('./Controller/profile');
const image = require('./Controller/image');

const app = express();
app.use(bodyparser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host: 'postgresql-tapered-78512',
        user: 'postgres',
        password: 'test',
        database: 'smartbrain'
    }
});

// db.select('*').from('users').then(data=>{
//     console.log(data);
// });





app.get('/', (req,res)=>{res.send('it is working')})
app.post('/signin', signin.handleSignin(db, bcrypt) );

app.get('/profile/:id', (req, res)=> {profile.handleProfile(req, res, db)} )

app.put('/image', (req, res)=> {image.handleImage(req, res, db)})


app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.post('/imageurl', (req, res)=> {image.handleApi(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
        ;
})

/*
/ ---> res = this is working
/signin --> post = succes/fail
/register --> post = user
/profile/:userid --> get = user
/image --> put --> user
*/