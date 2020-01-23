 
 
 const handleRegister=  (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password){
        //return berfungsi memberikan nilai balik dulu sehingga kode dibawah tidak dijalankan sebelum return
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    // bcrypt.hash(password, null, null, function(err,hash){
    //     console.log(hash);
    // });

    //tracsaction untuk bisa menambahkan kedatabase 2 kali

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginemail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginemail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })

            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister : handleRegister
}