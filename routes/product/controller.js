const Controller = require('../controller');
const Cryptjs = require('crypto-js');
const _ = require('lodash');
const Product = require('../../model/Product');

module.exports = new (class extends Controller {
async CreateProduct(req, res) {
    try {
        const newProduct=await new Product({
            title: req.body.title,
            desc:req.body.desc,
            img: req.body.img,
            categories:req.body.categories,
            size:req.body.size,
            color: req.body.color,
            price: req.body.price
        });
        await newProduct.save();
        this.responce({ res, code: 200, data: newProduct, message: "created successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
async UpdateProduct(req,res){
    try {
        console.log(1);
        const newProduct=await Product.findByIdAndUpdate(req.params.id,{$set:{
            title: req.body.title,
            desc:req.body.desc,
            img: req.body.img,
            categories:req.body.categories,
            size:req.body.size,
            color: req.body.color,
            price: req.body.price
        }},{new:true});
        console.log(2);
        this.responce({ res, code: 200, data: newProduct, message: "update successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
async DeleteProduct(req, res){
    try {
        await Product.findByIdAndDelete(req.params.id);
        
        this.responce({ res, code: 200, message: "product deleted successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
async GetFindProduct(req, res){
    try {
        const data= Product.findById(req.params.id);
        
        this.responce({ res, code: 200,data:data, message: "successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
async GetAllProduct(req, res){
    
    try {
        let products;
        if(req.query.new)
        {
            products = await Product.find().sort({createdAt:-1}).limit(5);
        }
        else if(req.query.category)
        {
            products = await Product.find({categories:{$in:[req.query.category]}});
        }
        else{
            products=await Product.find();
        }
        
        this.responce({ res, code: 200,data:products, message: " successfully" });
    } catch (error) {
        this.responce({ res, code: 500, message: "internal server error" });
    }
}
})