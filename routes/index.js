const router=require('express').Router();
const userRouter=require('./user');
const authRouter=require('./auth');
const productRouter=require('./product');
const cartRouter=require('./cart');
const orderRouter=require('./order');
const stripeRouter=require('./stripe');
router.use("/user",userRouter);
router.use("/auth",authRouter);
router.use("/product",productRouter);
router.use("/cart",cartRouter);
router.use("/order",orderRouter);
router.use("/checkout",stripeRouter);




module.exports=router;