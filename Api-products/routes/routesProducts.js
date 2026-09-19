
import express from "express";
export const router = express.Router();
import { 
  getProductoPorId, 
  getProductosFiltrados, 
  agregarProducto, 
  actualizarProducto, 
  eliminarProducto 
} from "./controllers/controllersProducts.js"; 


///RUTAS
router.get("/:id", getProductoPorId);
router.get("/", getProductosFiltrados);
router.post("/", agregarProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

