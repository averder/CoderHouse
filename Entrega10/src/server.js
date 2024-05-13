import express from 'express';
import {__dirname} from './utils.js'
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.routes.js'
import { Server } from 'socket.io'

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', productsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Server is listening in ${PORT}`);
  });
  
  const socketServer = new Server(httpServer);
  
  let products = [];
  
  socketServer.on('connection', (socket)=>{
    console.log(`User connected: ${socket.id}`);
  
    socket.on('disconnect', ()=>{
      console.log('User disconnected');
    })
  
    socket.emit('saludoDesdeBack', 'Bienvenido a websockets')
  
    socket.on('respuestaDesdeFront', (message)=>{
      console.log(message);
    })

    
    socket.on('getProducts', ()=>{
      socketServer.emit('showProducts', products);
    })
  
    socket.on('newProduct', (prod)=>{
      if(prod && !products.find((p)=> p.title === prod.title)){
        products.push(prod);
      }
      console.log(products);
      socketServer.emit('showProducts', products);
    })

    socket.on('deleteProduct', (prod)=>{
      products = products.filter(p => p.title != prod.title);
      console.log(products)
      socketServer.emit('showProducts', products);
    })
  
    
})

