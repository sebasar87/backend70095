const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views', 'layouts')  // Carpeta donde se encuentran los layouts
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Inicialización del servidor y Socket.io
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/products', (req, res) => {
  res.render('index', { products: [] }); // Reemplazar con datos reales
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: [] }); // Reemplazar con datos reales
});