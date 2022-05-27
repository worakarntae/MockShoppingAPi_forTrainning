const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

let products = require('./json/products.json');
let filterproduct = require('./json/filterproduct.json');
let order = require('./json/order.json');
let confirmPayment = require('./json/confirmPayment.json');
let userinfo = require('./json/userinfo.json');
let server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(cors());

server.get('/product', function (req, res, next) {
  return res.status(200).json({
    code: 1,
    message: 'OK',
    data: products
  })
});

server.get('/product/:id', function (req, res, next) {
  const filterid = req.params.id;
    if (filterid == 2) {
      return res.status(200).json({
        code: 1,
        message: 'OK',
        data: filterproduct
      })
    }
});

server.post('/order', function (req, res, next) {
  if (req.body.product_id  == 2) {
    return res.status(200).json({
      code: 1,
      message: 'OK',
      data: order
    })
  }
});

server.post('/confirmPayment', function (req, res, next) {
  if (req.body.order_id  == 8004359122) {
    return res.status(200).json({
      code: 1,
      message: 'OK',
      data: confirmPayment
    })
  }
});

server.get('/userinfo', function (req, res, next) {
  return res.status(200).json({
    code: 1,
    message: 'OK',
    data: userinfo
  })
});

server.post('/userinfo', function (req, res, next) {
  let userinfo1 = {}
  userinfo1.id = userinfo.length + 1
  userinfo1.name = req.body.name;
  userinfo1.age = Number(req.body.age);
  userinfo1.tel = req.body.tel;
  // console.log('userinfo1 :', userinfo1.id, userinfo1.name, userinfo1.age, userinfo1.tel,)
  console.log('userinfo1 :', userinfo1,)
  userinfo.push(userinfo1);
  console.log('userinfo1 :', userinfo1.name, '>>User Add!')
  return res.status(200).json({
    code: 1,
    message: 'OK',
    data: userinfo
  });
});

server.patch('/userinfo/:name', function (req, res, next) {
    const replaceName = req.params.name; 
    const position = userinfo.findIndex(function (val) {
      return val.name == replaceName;
    });
    userinfo[position].name = req.body.name;
    // userinfo[position].age = req.body.age;
    // userinfo[position].tel = req.body.tel;
    console.log('products :', userinfo[position].name,'>>User Data Updated!')
    return res.status(200).json({
      code: 1,
      message: 'OK',
      data: userinfo
    });
  });

server.delete('/userinfo/:name', function (req, res, next) {
  const removeName = req.params.name; 
  const position = userinfo.findIndex((val) => {
    return val.name == removeName;
  });
  console.log('products :', userinfo[position].name, '>>User Deleted!')
  userinfo.splice(position, 1);
  return res.status(200).json({
    code: 1,
    message: 'OK',
    data: userinfo
  })
});

server.listen(3060, function () {
  console.log('Server Listen at http://localhost:3060');
  console.log('products : Running server service port :3060!!')
});