const express = require('express');
const { createProduct, getALlProducts,getOneProduct } = require('../Controllers/productController');

const router = express.Router();

router.post('/', getALlProducts);
router.post('/addProduct', createProduct);
router.post('/getone', getOneProduct);


module.exports = router;
