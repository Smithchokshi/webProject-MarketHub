const Card = require('../Models/cardModel');

const createCard = async (req, res) => {
  try {
    const card = req.body;
    const newCard = await Card.create(card);
    res.status(201).json({ card: newCard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json({ cards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = req.body;
    const updatedCard = await Card.findByIdAndUpdate(id, card, { new: true });
    res.status(200).json({ card: updatedCard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller to store dummy data
const storeDummyData = async (req, res) => {
  try {
    const cardData = [
      {
        userId:'647a3ace65950a39cbdbbcbb',
        image: 'https://queue-it.com/media/ppcp1twv/product-drop.jpg',
        name: 'Shoes',
        description: 'Description 1-Smith',
        liked: 1,
        rating: 3,
      },
      {
        userId:'647a6896bef6d2c37dd99f4b',
        image: 'https://queue-it.com/media/ppcp1twv/product-drop.jpg',
        name: 'Product Name 2',
        description: 'Description 2-Khushi',
        liked: 2,
        rating: 4.3,
      },
      {
        userId:'648ce89cd620058809d06365',
        image: 'https://queue-it.com/media/ppcp1twv/product-drop.jpg',
        name: 'Product Name 2',
        description: 'Description 2-Jay',
        liked: 2,
        rating: 4.3,
      },
      {
        userId:'648ce9527c31f33ada4d9e6b',
        image: 'https://queue-it.com/media/ppcp1twv/product-drop.jpg',
        name: 'Product Name 2',
        description: 'Description Ritva',
        liked: 2,
        rating: 4.3,
      },
      {
        userId:'648cea977c31f33ada4d9e8c',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_07/3451045/210218-product-of-the-year-2x1-cs.jpg',
        name: 'Product Name 2',
        description: 'Description Priyank',
        liked: 2,
        rating: 4.3,
      },
      {
        userId:'648ceaf37c31f33ada4d9e98',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_07/3451045/210218-product-of-the-year-2x1-cs.jpg',
        name: 'Product Name 2',
        description: 'Description Saumya',
        liked: 2,
        rating: 4.3,
      },
      {
        userId:'648ceaf37c31f33ada4d9e98',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_07/3451045/210218-product-of-the-year-2x1-cs.jpg',
        name: 'Product Name 2',
        description: 'Description Saumya',
        liked: 2,
        rating: 4.3,
      },
      {
        userId:'648ceaf37c31f33ada4d9e98',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_07/3451045/210218-product-of-the-year-2x1-cs.jpg',
        name: 'Product Name 2',
        description: 'Description Saumya',
        liked: 2,
        rating: 4.3,
      },
      // Add more dummy data as needed
    ];

    const storedCards = await Card.create(cardData);

    res.status(200).json({
      message: 'Dummy data stored successfully',
      cards: storedCards,
    });
  } catch (error) {
    console.error('Error storing dummy data:', error);
    res.status(500).json({
      message: 'Failed to store dummy data',
      error: error.message,
    });
  }
};



module.exports = { storeDummyData,createCard, getAllCards, updateCard };
