const express = require('express');
const router = express.Router();
const productsService = require('./../services/productService')
const product = new productsService();

router.get('/', (req, res) => {
  // const products = [];
  // const {size} = req.query;
  // const limit = size || 10;

  // for (let index = 0; index < limit; index++) {
  //   products.push({
  //     name: faker.commerce.productName(),
  //     price: parseInt(faker.commerce.price(), 10),
  //     image: faker.image.imageUrl(),
  //   })
  // }
  let {limit, offset} = req.query;
  res.json(product.find({limit, offset}));
});


router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
});


router.get('/:id', (req, res) => {
  const {id} = req.params;

  // if (id === '999') {
  //   res.status(404).json({
  //     message: 'NOT FOUND'
  //   })
  // } else {
  //   res.status(200).json({
  //     id,
  //     name: 'Product 2',
  //     price: 2000
  //   })

  // }
  const obj = product.findOne(id);

  if (obj) {
    res.status(200).json(obj);

  } else {
    res.status(404).json({
      message: 'Product not found'
    });
  }
})


router.post('/', (req, res) => {
  // const body = req.body;
  const {name, price, image} = req.body;

  const newProduct = product.create({name, price, image});

  if (newProduct) {
    res.status(201).json({
      message: 'Product added',
      data: newProduct
    });

  } else {
    res.status(501).json({
      message: 'Internal error'
    })
  }

});


router.patch('/:id', (req, res) => {
  const {id} = req.params;
  // const body = req.body;
  // const id = parseInt(req.params.id);
  const {name, price, image} = req.body;

  const updateProduct = product.update(id, {name, price, image});

  if (updateProduct) {
    res.json({
      message: 'Product updated',
      data: req.body
    })

  } else {
    res.status(501).json({
      message: 'Internal error'
    });

  }

});


router.delete('/:id', (req, res) => {
  const {id} = req.params;

  const currentProduct = product.delete(id);

  if (currentProduct) {
    res.status(201).json({
      message: 'Product deleted',
      data: currentProduct
    });

  } else {
    res.status(404).json({
      message: 'Product not found'
    })
  }

});



module.exports = router;
