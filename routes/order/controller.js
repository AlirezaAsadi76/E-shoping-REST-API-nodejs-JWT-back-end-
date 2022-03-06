const Controller = require('../controller');
const Cryptjs = require('crypto-js');
const _ = require('lodash');
const Product = require('../../model/Product');
const Order = require('../../model/Order');


module.exports = new (class extends Controller {
    async CreateOrder(req, res) {

        try {
           
            const newOrder = await new Order(req.body);
            await newOrder.save();
            this.responce({ res, code: 200, data: newOrder, message: "created successfully" });
        } catch (error) {
   
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }
    async UpdateOrder(req, res) {
        try {

            const newOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            this.responce({ res, code: 200, data: newOrder, message: "update successfully" });
        } catch (error) {
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }
    async DeleteOrder(req, res) {
        try {
            await Order.findByIdAndDelete(req.params.id);

            this.responce({ res, code: 200, message: "Order deleted successfully" });
        } catch (error) {
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }
    async GetFindOrder(req, res) {
        try {
            const data = Order.findOne({ userId: req.params.userid });

            this.responce({ res, code: 200, data: data, message: "successfully" });
        } catch (error) {
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }
    async GetAllOrder(req, res) {

        try {
            let Orders;
            if (req.query.new) {
                Orders = await Order.find().sort({ createdAt: -1 }).limit(5);
            }
            else {
                Orders = await Order.find();
            }

            this.responce({ res, code: 200, data: Orders, message: " successfully" });
        } catch (error) {
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }
    async GetMonthlyIncome(req, res) {
        const date = new Date();
        const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
        const perviousmonth = new Date(new Date().setMonth(lastmonth.getMonth() - 1));
        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: perviousmonth } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount"
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" }
                    }
                }
            ]);
            this.responce({ res, code: 200, data: income, message: " successfully" });

        } catch (error) {
            this.responce({ res, code: 500, message: "internal server error" });

        }
    }
}) 