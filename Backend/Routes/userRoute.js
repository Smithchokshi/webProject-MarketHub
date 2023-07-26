const express = require('express');
const passport = require("passport");
const authMiddleware = require('../Middleware/authMiddleware');
const { registerUser, loginUser, getUserDetails, getAllUsers, forgotPassword, changePasswordGet, changePasswordPost } = require('../Controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getUserDetails);
router.get('/', authMiddleware, getAllUsers);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:id/:token', changePasswordGet)
router.post('/reset-password/:id/:token', changePasswordPost);
router.get('/facebook', passport.authenticate('facebook'));
router.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: `${process.env.FRONTEND_URL}/products`,
    failureRedirect: "/login",
  }));
  

module.exports = router;