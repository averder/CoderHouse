import { Router } from "express";

const router = Router();

router.get('/', (req, res)=>{
    res.render('home' , {products})
});

router.get('/realTimeProducts', (req, res)=>{
    res.render('realTimeProducts')
});


const products = [
    {
      "title": "Producto 1",
      "description": "Descripción del producto 1",
      "price": 19.99,
      "thumbnail": "https://ejemplo.com/imagen1.jpg",
      "code": "ABC123",
      "stock": 50
    },
    {
      "title": "Producto 2",
      "description": "Descripción del producto 2",
      "price": 24.99,
      "thumbnail": "https://ejemplo.com/imagen2.jpg",
      "code": "DEF456",
      "stock": 75
    },
    {
      "title": "Producto 3",
      "description": "Descripción del producto 3",
      "price": 34.99,
      "thumbnail": "https://ejemplo.com/imagen3.jpg",
      "code": "GHI789",
      "stock": 30
    }
  ];

export default router;