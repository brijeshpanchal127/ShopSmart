import express from 'express';
// import data from './data.js';
import productRouter from './routers/productRouter.js';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';

const app = express();

// to make connection with mongodb

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shopsmart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // to get out deplicated warning
});

// ------------this code is for load static data--------------------

// app.get('/api/products/:id', (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// });

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);



app.get('/', (req, res) => {
  res.send('Server is ready');
});


// this middleware for error catcher
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});