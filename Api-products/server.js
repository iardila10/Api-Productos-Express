const data = [
  {
    "id": 1,
    "nombre": "Smartphone Galaxy S24 Ultra",
    "marca": "Samsung",
    "precio": 1299.99,
    "stock": 45,
    "disponible": true
  },
  {
    "id": 2,
    "nombre": "MacBook Pro 16\" M3 Max",
    "marca": "Apple",
    "precio": 3499.00,
    "stock": 12,
    "disponible": true
  },
  {
    "id": 3,
    "nombre": "Audífonos Sony WH-1000XM5",
    "marca": "Sony",
    "precio": 399.99,
    "stock": 85,
    "disponible": true
  },
  {
    "id": 4,
    "nombre": "Monitor OLED Gamer 27\" 240Hz",
    "marca": "LG",
    "precio": 899.50,
    "stock": 20,
    "disponible": true
  },
  {
    "id": 5,
    "nombre": "Silla Ergonómica Pro",
    "marca": "ErgoFlex",
    "precio": 350.00,
    "stock": 30,
    "disponible": true
  },
  {
    "id": 6,
    "nombre": "Escritorio Elevable Eléctrico",
    "marca": "FlexiSpot",
    "precio": 420.00,
    "stock": 15,
    "disponible": true
  },
  {
    "id": 7,
    "nombre": "Cafetera Express Automática",
    "marca": "De'Longhi",
    "precio": 650.00,
    "stock": 18,
    "disponible": true
  },
  {
    "id": 8,
    "nombre": "Freidora de Aire 5.5L",
    "marca": "Cosori",
    "precio": 119.99,
    "stock": 110,
    "disponible": true
  },
  {
    "id": 9,
    "nombre": "Robot Aspirador Roomba j7+",
    "marca": "iRobot",
    "precio": 799.00,
    "stock": 0,
    "disponible": false
  },
  {
    "id": 10,
    "nombre": "Zapatillas para Running Air Zoom",
    "marca": "Nike",
    "precio": 130.00,
    "stock": 60,
    "disponible": true
  },
  {
    "id": 11,
    "nombre": "Reloj Inteligente Apple Watch Series 9",
    "marca": "Apple",
    "precio": 429.00,
    "stock": 40,
    "disponible": true
  },
  {
    "id": 12,
    "nombre": "Teclado Mecánico Inalámbrico MX Keys",
    "marca": "Logitech",
    "precio": 109.99,
    "stock": 95,
    "disponible": true
  },
  {
    "id": 13,
    "nombre": "Mouse Ergonómico MX Master 3S",
    "marca": "Logitech",
    "precio": 99.99,
    "stock": 120,
    "disponible": true
  },
  {
    "id": 14,
    "nombre": "Mochila Impermeable para Laptop 15.6\"",
    "marca": "Thule",
    "precio": 45.99,
    "stock": 150,
    "disponible": true
  },
  {
    "id": 15,
    "nombre": "Consola PlayStation 5 Edition Slim",
    "marca": "Sony",
    "precio": 499.99,
    "stock": 8,
    "disponible": true
  }
]

const express = require("express")
const app = express();
app.use(express.json());

//OPERACIONES GET

//Filtrar producto por id
app.get("/productos/:id", (req, res) => {
    const {id} = req.params
    const encontrado = data.find(u => u.id === Number(id))
    if (!encontrado) {
        return res.status(404).json({
            error: "Producto no encontrado"
        })
    } else {
        res.json(encontrado)
    }
    
})

//Filtrar productos por precio y marca o solo una
app.get("/productos", (req, res) => {
  const {precio, marca} = req.query
  const filtro_precios = data.filter(p=> p.precio <= Number(precio))
  const filtro_marcas = data.filter(f => f.marca === String(marca))

  if (precio || marca)  {
    res.json(filtro_marcas, filtro_precios)
  } else {
    return res.json(data)
  }
})


//OPERACIONES POST
//Agregar producto

app.post("/productos", (req, res) => {
  function agregarProducto(){
    const {nombre, marca, precio, stock, disponible} = req.body
    if (
      nombre &&
      marca &&
      precio &&
      stock &&
      disponible
    ) {
      const nuevo_id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const nuevo_producto = { id: nuevo_id, nombre, marca, precio, stock, disponible };
      data.push(nuevo_producto)

      res.status(201).json({
      mensaje: "Producto agregado con exito",
      producto: nuevo_producto
    })
    } else {
      return res.status(400).json({
        "error": "Faltan campos por llenar"
      })
    }
    
  } agregarProducto()


})

//OPERACIONES PUT
app.put("/productos/:id", (req, res) => {
  const {id} = req.params
  const {nombre, marca, precio, stock, disponible} = req.body
  const indice = data.findIndex(d => d.id === Number(id))

  if (indice === -1) {
    return res.status(404).json({
      error: "Producto no encontrado"
    })
  }

  data[indice] = {id: id, nombre, marca, precio, stock, disponible}
  res.json({
    mensaje: "Producto actualizado correctamente",
    producto: data[indice]
  })
})

//OPERACIONES DELETE
app.delete("/productos/:id", (req, res) => {
  const {id} = req.params
  const indice = data.findIndex(m => m.id === Number(id))
  const producto_eliminado = data[indice]

  if(indice === -1){
    return res.status(404).json({
    error: "Producto no encontrado"
  })
}

    data.splice(indice, 1)
    res.json({
    aviso: "Eliminado con exito",
    mensaje: "Producto eliminado",
    producto_eliminado: producto_eliminado
})
})







app.listen(3000, ()=> {
  console.log("Servidor corriendo en puerto 3000")
})




