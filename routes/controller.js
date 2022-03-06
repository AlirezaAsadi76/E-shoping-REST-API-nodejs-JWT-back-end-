const autobind=require('auto-bind');
const User=require('../model/User');
module.exports=class {
    constructor()
    {
        autobind(this);
        this.User=User;
    }
    responce({res,code=200,data=null,message=null}){
        res.status(code).json({data:data,message:message});
    }
}