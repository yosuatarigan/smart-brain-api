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
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smartbrain'
    }
});

// db.select('*').from('users').then(data=>{
//     console.log(data);
// });






app.post('/signin', signin.handleSignin(db, bcrypt) );

app.get('/profile/:id', (req, res)=> {profile.handleProfile(req, res, db)} )

app.put('/image', (req, res)=> {image.handleImage(req, res, db)})


app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

app.post('/imageurl', (req, res)=> {image.handleApi(req, res)})

app.listen(3000, () => {
    console.log('app is running on port 3000')
        ;
})

/*
/ ---> res = this is working
/signin --> post = succes/fail
/register --> post = user
/profile/:userid --> get = user
/image --> put --> user
*/