const express = require('express');
const { createProduct, getALlProducts,getOneProduct, suggestion, sorting } = require('../Controllers/productController');

const router = express.Router();

router.post('/', getALlProducts);
router.post('/addProduct', createProduct);
router.post('/getone', getOneProduct);
router.post('/suggestion', suggestion);
router.post('/sorting', sorting);


module.exports = router;
