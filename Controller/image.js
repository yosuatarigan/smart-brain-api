const Clarifai =require('clarifai');

const app = new Clarifai.App({
    apiKey: '303f72c437a54e98b5f7aad1d55b6fdf'
   });

const handleApi = (req, res)=>{
app.models
    .predict( Clarifai.FACE_DETECT_MODEL , req.body.input)
    .then(data =>{
        res.json(data)
    })
    .catch(err=>res.status(400).json('unable work with api'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
    handleImage : handleImage,
    handleApi : handleApi
}