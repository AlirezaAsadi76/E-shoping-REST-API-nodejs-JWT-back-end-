
const router=require('express').Router();
const {verifyToken,verfiTokenAndAuth,verfiTokenAndAdmin}=require('../../middlewares/auth');
const controller=require('./controller');

router.post('/',verfiTokenAndAdmin,controller.CreateProduct);
router.put('/:id',verfiTokenAndAdmin,controller.UpdateProduct);
router.delete('/:id',verfiTokenAndAdmin,controller.DeleteProduct);
router.get('/find/:id',controller.GetFindProduct);
router.get('/',controller.GetAllProduct);
module.exports=router;