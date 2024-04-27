import express from "express";
import ProductManager from "./manager/ProductManager.js";
import { HttpStatus } from "./constants.js";
import { response } from "./helpers.js";
import { Errors } from "./errors.js";

const app = express();
const PORT = 8000;

app.use(express.json());

const productManager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    let products = await productManager.getProducts();
    if (limit) {
      products = products.slice(0, limit);
    }
    response(res, HttpStatus.OK, { products });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
});

app.get("/product/:pId", async (req, res) => {
  // params
  try {
    const { pId } = req.params;
    const product = await productManager.getProductById(pId);
    if (!product)
      response(res, HttpStatus.NOT_FOUND, Errors.notFound("Product"));
    else response(res, HttpStatus.OK, { product });
  } catch (error) {
    response(res, HttpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
});

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
