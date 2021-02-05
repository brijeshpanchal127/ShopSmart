import express from 'express';
// import data from './data.js';
import productRouter from './routers/productRouter.js';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
// to parse the http request--new middleware
app.use(express.urlencoded({ extended: true }));

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
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});



app.get('/', (req, res) => {
  res.send('Server is ready');
});


// this middleware for error catcher
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});



const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});