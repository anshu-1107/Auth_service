const UserService = require("../service/user_service");

const userService = new UserService();

const create = async (req,res)=>{
    try {
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            success:true,
            message:"Successfully created a new user",
            data:{response},
            error:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Someting went wrong",
            data:{},
            success:false,
            error:{error}
        })
    }
}

module.exports={
    create
}