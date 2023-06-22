const chatModel = require('../Models/chatModel');
<<<<<<< HEAD
=======
const productModel = require('../Models/productModel');
const { ObjectId } = require('mongodb');
>>>>>>> development

const createChat = async (req, res) => {
  try {
    const firstId = res.locals.user._id.toString();
<<<<<<< HEAD
    const { secondId } = req.body;

    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

=======
    const { secondId, productId } = req.body;

    const objectProductId = new ObjectId(productId);

    const productDetails = await productModel.findById(objectProductId);

    // console.log(productDetails);

    const chat = await chatModel.findOne({
      productId,
    });

    // console.log('chat', chat);

>>>>>>> development
    if (chat)
      return res.status(200).json({
        status: 200,
        chat,
        message: 'Success',
      });

    const newChat = new chatModel({
      members: [firstId, secondId],
<<<<<<< HEAD
=======
      productName: productDetails.productName,
      productId: productId,
>>>>>>> development
    });

    const response = await newChat.save();

<<<<<<< HEAD
=======
    await productModel.updateOne(
      { _id: productId },
      {
        $set: {
          isChatCreated: true,
          chatId: response._id.toString(),
        },
      }
    );

>>>>>>> development
    res.status(200).json({
      status: 200,
      chat: response,
      message: 'Success',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
};

const getUserChats = async (req, res) => {
  try {
    const userId = res.locals.user._id.toString();
<<<<<<< HEAD
=======
    const userObjectId = new ObjectId(userId);
>>>>>>> development

    const allChats = await chatModel.aggregate([
      // Stage 1: Match the chats based on a condition (if needed)
      {
        $match: {
          members: { $in: [userId] },
        },
      },
      // Stage 2: Unwind the members array to create separate documents for each member
      {
        $unwind: '$members',
      },
      // Stage 3: Convert member IDs to ObjectId
      {
        $addFields: {
          memberId: { $toObjectId: '$members' },
        },
      },
      // Stage 4: Lookup the user details from the users collection based on member IDs
      {
        $lookup: {
          from: 'users',
          localField: 'memberId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      // Stage 5: Group the results by chat ID and reconstruct the members array
      {
        $group: {
          _id: '$_id',
          members: { $push: '$members' },
          userDetails: { $push: { $arrayElemAt: ['$userDetails', 0] } },
<<<<<<< HEAD
=======
          productId: { $first: '$productId' },
          productName: { $first: '$productName' },
>>>>>>> development
        },
      },
      // Stage 6: Project only the details of the second user
      {
        $project: {
          _id: 0,
<<<<<<< HEAD
          userDetails: { $arrayElemAt: ['$userDetails', 1] },
          members: '$members',
        },
      },
=======
          chatId: '$_id',
          productId: 1,
          productName: 1,
          userDetails: {
            $filter: {
              input: '$userDetails',
              as: 'user',
              cond: { $ne: ['$$user._id', userObjectId] },
            },
          },
          members: '$members',
        },
      },
      // Stage 7: Remove the password and token fields
      {
        $project: {
          userDetails: {
            password: 0,
            token: 0,
          },
        },
      },
>>>>>>> development
    ]);

    res.status(200).json({
      status: 200,
      allChats,
      message: 'Success',
    });
  } catch (e) {
<<<<<<< HEAD
=======
    console.log(e);
>>>>>>> development
    res.status(500).json({
      message: e,
    });
  }
};

const findChat = async (req, res) => {
  try {
    const firstId = res.locals.user._id.toString();
    const { secondId } = req.params;

    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json({
      status: 200,
      chat,
      message: 'Success',
    });
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

module.exports = { createChat, getUserChats, findChat };
