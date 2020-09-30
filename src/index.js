'use strict'
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Anime = require('./models/anime')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// http://localhost:3000/productos
app.get("/productos", (req,res)=>{
    res.send("<h1>LLamando productos</h1>")
    console.log("hola mundo")
})

app.get("/peliculas", (req,res)=>{
    res.send("<h1>LLamando peliculas</h1>")
})

//created
app.post("/anime", (req,res)=>{
    
    let anime = new Anime(req.body)
    
    anime.save((err, animeguardado) =>{
        if(err) return res.status(400).send({mensaje: err})

        res.status(200).send({mensaje: animeguardado})
    })

   
})


app.get("/anime", (req,res) =>{
    
    Anime.find({}, (err, animes)=>{
        if(err) return res.status(400).send({mensaje: err})
        res.status(200).send({mensaje: animes})
    })

})


app.delete("/anime/:id",(req,res) =>{

    Anime.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res.status(400).send({mensaje: err})
        res.status(200).send({mensaje: "Dato eliminado correctamente"})
    })

})

app.put("/anime/:id", (req,res) =>{

    Anime.findById(req.params.id, (err, anime) =>{
        if(err) return res.status(400).send({mensaje: "No se encontro el anime que buscabas"})

        if(!anime) return res.status(400).send({mensaje: "No se encontro el anime que buscabas"})
        
        //estoy pregunta si a traves del body de la peticion yo estoy haciendo alguna modificacion
        if(req.body.nombre != undefined){
            anime.nombre = req.body.nombre
        }
        if(req.body.anioEmision != undefined){
            anime.anioEmision = req.body.anioEmision
        }

        anime.save((err, animeguardado) =>{
            if(err) return res.status(400).send({mensaje: err})
            res.status(200).send({mensaje: animeguardado})
        })
    })
})


mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.gnt5q.mongodb.net/${process.env.BD}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},()=>{
    console.log("conectado a la base de datos")
    app.listen(3000, ()=>{
        console.log("Escuchando en el puerto 3000")
    })
})





