//Importo express
const express = require("express")

//Genero mi aplicacion
const app = express()

app.use(express.json())

let autores = []
let libros = []

//Manejamos las solicitudes HEEP para la url /helo
app.post("/autores", (req, res) => {
    const { firstName, lastName, id } = req.body

    autores.push({ firstName, lastName, id })

    res.status(201)
    res.send("Autor creado")
})

app.get("/autores", (req, res) => {
    res.status(200)
    res.json(autores)
})

app.delete("/autores/:id", (req, res) => {
    const { id } = req.params
    console.log(id)

    autores = autores.filter(autor => autor.id !== +id)
    console.log(autores)

    res.send("Eliminado")
})

// listar todos los autores
// eliminar autor por id
// actualizar autor por id


//Servimos nuestra app en el puerto 3000
app.listen(3000, ()=> console.log("Se esta escuchando en el puerto", 3000))