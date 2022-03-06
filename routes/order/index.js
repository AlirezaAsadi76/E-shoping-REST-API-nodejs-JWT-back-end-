
const router=require('express').Router();
const {verifyToken,verfiTokenAndAuth,verfiTokenAndAdmin}=require('../../middlewares/auth');
const controller=require('./controller');

router.post('/',verifyToken,controller.CreateOrder);
router.put('/:id',verfiTokenAndAdmin,controller.UpdateOrder);
router.delete('/:id',verfiTokenAndAdmin,controller.DeleteOrder);
router.get('/find/:userid',verfiTokenAndAuth,controller.GetFindOrder);
router.get('/',verfiTokenAndAdmin,controller.GetAllOrder);
router.get('/income',verfiTokenAndAdmin,controller.GetMonthlyIncome);
module.exports=router;