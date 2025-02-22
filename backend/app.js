import fs from 'node:fs/promises';
// file system

import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';   // if frontend and backend are not on the same server

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {   // Middleware function starting on every comming HTTP request
  res.setHeader('Access-Control-Allow-Origin', '*');  // enables access to API from all * domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  // defines allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // enables sending 'Content-Type' headers = JSON data
  next();
});
// CORS (Cross-Origin Resource Sharing) middleware in Express (when front- and backend are not on the same domain)

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    // !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

// app.listen(3000);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


/* 

1. npm install  -> install dependencies for backend

2. npm start  /  node app.js  -> to start the backend server

*/