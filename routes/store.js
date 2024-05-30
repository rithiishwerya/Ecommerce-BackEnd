var express = require('express');
var router = express.Router();
const storesController = require('../controller/stores.controller');

const auth = require('../middleware/auth')

// router.post('/generalsettings', adminController.AddOrUpdateGeneralSettings);

// router.post('/GetAllgeneralsettings', adminController.GetAllGeneralSettings);

router.post('/post', storesController.Post_Data);
router.get('/get',auth.AuthAdmin, storesController.Get_Data);
router.put('/patch/:id',auth.AuthAdmin, storesController.Patch_Data);
router.delete('delete',storesController.Delete_Data);

router.get('/test',storesController.ques_ans);

module.exports = router;