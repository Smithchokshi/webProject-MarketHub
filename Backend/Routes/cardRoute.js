const express = require('express');
const router = express.Router();
const cardController = require('../Controllers/cardController');

// Create a new card
router.post('/', cardController.createCard);

// Get all cards
router.get('/getCards', cardController.getAllCards);

// Update a card
router.put('/:id', cardController.updateCard);

router.get('/dummy', cardController.storeDummyData);


module.exports = router;
