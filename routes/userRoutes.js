const express = require('express');
const authController = require('./../controller/authController')
const userController = require('./../controller/userController')


const router = express.Router();

router.post('/signup', authController.signup);
router.post('/adminSignup', authController.adminSignup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)


// Protect all routes after this middleware
// Only access the below routes after successfull authentication
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);


// Restricting the below routes to only admin staff and managers
router.use(authController.restrictTo('admin', 'staff', 'manager'));

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;