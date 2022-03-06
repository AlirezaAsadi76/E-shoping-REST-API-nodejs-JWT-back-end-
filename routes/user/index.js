const router=require('express').Router();
const {verifyToken,verfiTokenAndAuth,verfiTokenAndAdmin}=require('../../middlewares/auth');
const controller=require('./controller');

router.put('/:id',verfiTokenAndAuth,controller.update);
router.delete('/:id',verfiTokenAndAuth,controller.delete);
router.get('/find/:id',verfiTokenAndAdmin,controller.get);
router.get('/',verfiTokenAndAdmin,controller.getAll);
router.get('/status',verfiTokenAndAdmin,controller.getAllStatus);


module.exports=router;