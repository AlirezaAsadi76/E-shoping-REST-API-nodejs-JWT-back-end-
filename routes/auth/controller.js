const Controller=require('../controller');
const Cryptjs=require('crypto-js');
const _=require('lodash')
const jwt=require('jsonwebtoken');
module.exports=new (class extends Controller{
    async register(req,res){
        const user=await this.User.findOne({email:req.body.email});
        if(user){
            this.responce({res,code:400,message:"email already exists"});
            return;
        }
        const newuser=new this.User({
            username:req.body.username,
            email:req.body.email,
            password:Cryptjs.AES.encrypt(req.body.password,process.env.PASS_KEY).toString()
        });
        try {
            await newuser.save();
            this.responce({res,code:201,data:_.pick(newuser,["username","email","isAdmin"]),message:"created successfuly"});
        } catch (error) {
            this.responce({res,code:500,message:"(internal server error)"});
        }
    }
    async login(req, res){

        const user=await this.User.findOne({email:req.body.email});
        if(!user){
            this.responce({res,code:400,message:"invalid email or password"});
            return;
        }
       const hashpass=Cryptjs.AES.decrypt(user.password,process.env.PASS_KEY);
       const isValidPassword=(hashpass.toString(Cryptjs.enc.Utf8)==req.body.password);

        if(!isValidPassword)
        {
            this.responce({res,code:400,message:"invalid email or password"});
            return;
        }

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_KEY,{expiresIn:"2d"});
        this.responce({res,code:201,data:{token:token},message:"login successfuly"});
    }
})