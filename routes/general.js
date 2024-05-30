var express = require('express');
var router = express.Router();
const generalController = require('../controller/general.controller');

router.post('/users/add',generalController.post_users);
router.get('/users/retrieve',generalController.get_users);
router.put('/users/update/:id',generalController.update_users);
router.delete('/users/delete/:id',generalController.delete_users);
router.post('/login',generalController.login);
//generate token
router.post('/userToken',generalController.post_userToken)

router.post('/role/add',generalController.post_role);
router.get('/role/retrieve',generalController.get_role);
router.put('/role/update/:id',generalController.update_role);
router.delete('/role/delete/:id',generalController.delete_role);

router.post('/store/add',generalController.post_store);
router.get('/store/retrieve',generalController.get_store);
router.put('/store/update/:id',generalController.update_store);
// router.delete('delete/store',generalController.delete_store);


module.exports = router;