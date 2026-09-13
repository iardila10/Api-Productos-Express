const data = [
    {
        "id": 1,
        "nombre": "Teclado",
        "precio": 120000
    },
    {
        "id": 2,
        "nombre": "Mouse",
        "precio": 80000
    }
]

const express = require("express")
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor funcionando en puerto 3000");
});

//Primer endpoint
app.get("/productos", (req, res) => {
    res.json(data)
})

app.get("/productos/:id", (req, res) => {
    const id = req.params.id
    const encontrado = data.find(u => u.id === Number(id))
    if (!encontrado) {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    } else {
        res.json(encontrado)
    }
    
})

app.get("/productos", (req, res) => {
    if (precio <= 100000) {
        res.json(data.filter(p=> p.precio <= 100000))
    } else {
        return res.status(404).json({
            error: "Precio no encontrado"
        })
    }
})