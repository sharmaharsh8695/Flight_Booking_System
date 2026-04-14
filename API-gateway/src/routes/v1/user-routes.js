const express = require('express');
const { UserController } = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/signup',AuthRequestMiddlewares.validateAuthRequest,UserController.signupUser);
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest,UserController.signinUser);
router.post('/role',AuthRequestMiddlewares.checkAuth,AuthRequestMiddlewares.isAdmin,UserController.addRole);

module.exports = router;