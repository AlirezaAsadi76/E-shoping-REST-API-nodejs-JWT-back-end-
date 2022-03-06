
const router=require('express').Router();
const {verifyToken,verfiTokenAndAuth,verfiTokenAndAdmin}=require('../../middlewares/auth');
const controller=require('./controller');

router.post('/',verifyToken,controller.CreateCart);
router.put('/:id',verfiTokenAndAuth,controller.UpdateCart);
router.delete('/:id',verfiTokenAndAdmin,controller.DeleteCart);
router.get('/find/:userid',verfiTokenAndAuth,controller.GetFindCart);
router.get('/',verfiTokenAndAdmin,controller.GetAllCart);
module.exports=router;