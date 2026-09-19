import express from "express";
import { router } from "./routes/routesProducts.js";
const app = express();

app.use(express.json());

app.use("/productos", router);

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
