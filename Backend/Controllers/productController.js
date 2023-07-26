const productModel = require('../Models/productModel');
const chatModel = require('../Models/chatModel');
const likesModel = require('../Models/likesModel');

const createProduct = async (req, res) => {
  try {
    const userId = res.locals.user._id.toString();
    const { productName, productDescription, price, image } = req.body;

    const newProduct = new productModel({
      productName,
      productDescription,
      price,
      image,
      userId,
      isChatCreated: false,
      chatId: null,
    });

    const response = await newProduct.save();

    res.status(200).json({
      status: 200,
      productData: response,
      message: 'Success',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
};

const getALlProducts = async (req, res) => {
  try {
    const userId = res.locals.user._id.toString();
    let products = await productModel.find({ userId: { $nin: [userId] } });
    const searchTerm = req.body.searchTerm;
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      products = products.filter(
        (product) =>
          product.productName.match(regex) || product.productDescription.match(regex)
      );
    }
    const likedProducts = await likesModel.find({ userId, isLiked: true });

  likedProducts.forEach(likedProduct => {
    const product = products.find(product => product._id.toString() === likedProduct.productId);
    if (product) {
      product.isLiked = true;
    }
  });

    res.status(200).json({
      status: 200,
      products,
      message: 'Success',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const  {productId}  = req.body;
    
    const product = await productModel.find({ _id:productId});
    res.json(product);
  } 
  catch (e) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
};

const suggestion = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const products = await productModel.find({
      $or: [
        { productName: { $regex: escapedSearchTerm, $options: 'i' } },
        { productDescription: { $regex: escapedSearchTerm, $options: 'i' } },
      ],
    }).limit(5);
    const suggestionData = products.map((product) => ({
      name: product.productName,
      id: product._id,
    }));

    res.json(suggestionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const sorting = async (req, res) => {
  try {
    const { sortingOption } = req.body;
    const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const products = await productModel.find({
      $or: [
        { productName: { $regex: escapedSearchTerm, $options: 'i' } },
        { productDescription: { $regex: escapedSearchTerm, $options: 'i' } },
      ],
    }).limit(5);
    const suggestionData = products.map((product) => ({
      name: product.productName,
      id: product._id,
    }));

    res.json(suggestionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createProduct, getALlProducts,getOneProduct, suggestion, sorting };
