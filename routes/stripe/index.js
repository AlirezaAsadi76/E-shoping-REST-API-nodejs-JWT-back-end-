const router=require('express').Router();
const controller=require('./controller');
router.post('/payment',controller.payment);
module.exports=router;