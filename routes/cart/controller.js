const Controller = require('../controller');
const Cryptjs = require('crypto-js');
const _ = require('lodash');
const Product = require('../../model/Product');
const Cart = require('../../model/Cart');


module.exports = new (class extends Controller {
async CreateCart(req, res) {
    try {
        const newCart=await new Cart();
        await newCart.save();
        this.responce({ res, code: 200, data: newCart, message: "created successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
async UpdateCart(req,res){
    try {

        const newCart=await Cart.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
     
        this.responce({ res, code: 200, data: newCart, message: "update successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
async DeleteCart(req, res){
    try {
        await Cart.findByIdAndDelete(req.params.id);
        
        this.responce({ res, code: 200, message: "Cart deleted successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
async GetFindCart(req, res){
    try {
        const data= Cart.findOne({userId:req.params.userid});
        
        this.responce({ res, code: 200,data:data, message: "successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
async GetAllCart(req, res){
    
    try {
        let Carts;
        if(req.query.new)
        {
            Carts = await Cart.find().sort({createdAt:-1}).limit(5);
        }
        else{
            Carts=await Cart.find();
        }
        
        this.responce({ res, code: 200,data:Carts, message: " successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
})