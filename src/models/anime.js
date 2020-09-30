const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs');

const Anime = new mongoose.Schema(
    {
        nombre: String,
        anioEmision: {type: Number},
        encript: String
    }
)


Anime.pre('save', function(next){
    const anime = this
    if(!anime.isModified('encript')){
        return next()
    }

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err)
        bcrypt.hash(anime.encript,salt,null,(err, hash) =>{
            if(err) return next(err)
            anime.encript = hash
            next()
        })
    })


})

module.exports = mongoose.model("Anime", Anime)
