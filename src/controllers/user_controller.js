const { sign } = require("jsonwebtoken");
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
            message:"Someting went wrong in controller",
            data:{},
            success:false,
            error:{error}
        })
    }
}

const getById = async (req,res)=>{
    try {
        const response = await userService.getById(req.params.id);
        return res.status(200).json({
            success:true,
            message:"Successfully fetched the user",
            data:{response},
            error:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Someting went wrong in controller",
            data:{},
            success:false,
            error:{error}
        })
    }
}

const signIn = async (req,res)=>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            success:true,
            data:response,
            error:{},
            message:"Sucessfully signed in"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Someting went wrong in controller",
            data:{},
            success:false,
            error:{error}
        })
    }
}

module.exports={
    create,
    getById,
    signIn
}