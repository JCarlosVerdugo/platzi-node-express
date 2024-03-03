const express = require('express');
const ProductsService = require('../services/productService');

const router = express.Router();
const service = new ProductsService();

// GET all products
router.get('/', getAll);

// GET product by ID
router.get('/:id', getOne);

// ADD new product
router.post('/', create);

// UPDATE partial product
router.patch('/:id', updateProduct);

// DELETE product
router.delete('/:id', deleteProduct)


// Internal functions
async function getAll(req, res) {
  const products = await service.find();
  res.json(products);
}


async function getOne(req, res, next) {
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product);

  } catch (error) {
    next(error);
  }
}


async function create(req, res) {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
}


async function updateProduct(req, res, next) {
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);

  } catch (error) {
    next(error);
    // res.status(404).json({
    //   message: error.message
    // });

  }
}


async function deleteProduct(req, res) {
  const {id} = req.params;
  const rta = await service.delete(id);
  res.json(rta)
}


module.exports = router;
