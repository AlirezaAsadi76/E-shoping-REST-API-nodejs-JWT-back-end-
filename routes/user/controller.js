const Controller = require('../controller');
const Cryptjs = require('crypto-js');
const _ = require('lodash');
const User = require('../../model/User');

module.exports = new (class extends Controller {
    async update(req, res) {

        if (req.body.password) {
            req.body.password = Cryptjs.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            this.responce({ res, code: 200, data: _.pick(user, ["username", "email", "isAdmin"]), message: "update successfully" });
        } catch (error) {
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }
    async delete(req, res) {

        try {
            const user = req.user;
            await user.remove();
            this.responce({ res, code: 200, message: "delete successfully" });
        } catch (error) {
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }
    async get(req, res) {

        try {
            const user = await User.findById(req.params.id);
            this.responce({ res, code: 200, data: user, message: "find successfully" });
        } catch (error) {
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }
    async getAll(req, res) {

        try {

            const users = await User.find({});
            this.responce({ res, code: 200, data: users, message: "find successfully" });
        } catch (error) {
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }
    async getAllStatus(req, res) {
        const date = new Date();
        const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));

        try {
            const data = await User.aggregate([
                {
                    $match: { createdAt: { $gte: lastyear } },

                },
                {
                    $project: {
                        month: { $month: "$createdAt" }
                    }
                },
                {
                    $group: {
                        _id: "$month", total: { $sum: 1 }
                    }
                }

            ])

            this.responce({ res, code: 200, data: data, message: "successfully" });
        } catch (error) {
            console.log(error);
            this.responce({ res, code: 500, message: "internal server error" });
        }
    }

})