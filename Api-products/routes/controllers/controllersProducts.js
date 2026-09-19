import { data } from "../../data/data.js";
import { router } from "../routesProducts.js";

// OPERACIONES GET

// Filtrar producto por id
export const getProductoPorId = (req, res) => {
  const { id } = req.params;
  // Nota: En tu captura usabas u.u_id, pero en tu texto usas u.id. Asegúrate de que coincida con tu data.js
  const encontrado = data.find(u => u.id === Number(id));
  
  if (!encontrado) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  } else {
    res.json(encontrado);
  }
};

// Filtrar productos por precio y marca o solo una
export const getProductosFiltrados = (req, res) => {
  const { precio, marca } = req.query;
  const filtro_precios = data.filter(p => p.precio <= Number(precio));
  const filtro_marcas = data.filter(f => f.marca === String(marca));

  if (precio || marca) {
    res.json({ filtro_marcas, filtro_precios });
  } else {
    return res.json(data);
  }
};


// OPERACIONES POST

// Agregar producto
export const agregarProducto = (req, res) => {
  const { nombre, marca, precio, stock, disponible } = req.body;
  
  if (nombre && marca && precio && stock && disponible) {
    const nuevo_id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const nuevo_producto = { id: nuevo_id, nombre, marca, precio, stock, disponible };
    data.push(nuevo_producto);

    res.status(201).json({
      mensaje: "Producto agregado con exito",
      producto: nuevo_producto
    });
  } else {
    return res.status(400).json({
      error: "Faltan campos por llenar"
    });
  }
};

// OPERACIONES PUT

// Actualizar producto completamente
export const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, marca, precio, stock, disponible } = req.body;
  const indice = data.findIndex(d => d.id === Number(id));

  if (indice === -1) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  data[indice] = { id: Number(id), nombre, marca, precio, stock, disponible };
  res.json({
    mensaje: "Producto actualizado correctamente",
    producto: data[indice]
  });
};

// OPERACIONES DELETE

// Eliminar producto
export const eliminarProducto = (req, res) => {
  const { id } = req.params;
  const indice = data.findIndex(m => m.id === Number(id));

  if (indice === -1) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  const producto_eliminado = data[indice];
  data.splice(indice, 1);
  
  res.json({
    aviso: "Eliminado con exito",
    mensaje: "Producto eliminado",
    producto_eliminado: producto_eliminado
  });
};
