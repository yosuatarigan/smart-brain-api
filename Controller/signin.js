const handleSignin = (db,bcrypt) =>(req,res)=> {
    // bcrypt.compare("tahunbaru",'$2a$10$wqX4cRnmlyCgqw5YSmekCOgfXRQqYZSg.QzzsVlb1FHUiWWngdVOW', function(err,res){
    //     console.log('First guess', res)
    // });
    // bcrypt.compare("ai",'$2a$10$wqX4cRnmlyCgqw5YSmekCOgfXRQqYZSg.QzzsVlb1FHUiWWngdVOW', function(err,res){
    //     console.log('second guess', res)
    // });

    //validasi
    // console.log(req.body.email, req.body.password)
    // if(req.body.email === database.user[0].email &&
    //     req.body.password === database.user[0].password ){
    //     res.json('succes');
    // }
    // else{
    //     res.status(400).json('error logging');
    // }

    //tidak perlu tracsaction karna tidak memodivikasi database
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data =>{
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid){
            db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user =>{
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
        else{
            res.status(400).json('wrong credential')
        }
    })
    .catch(err=>res.status(400).json('wrong credential'))
}

module.exports = {
    handleSignin : handleSignin
}