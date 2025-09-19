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

const isAuthenticated = async (req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const respnse = userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            err:{},
            data:respnse,
            message:"User is Authenticated and token is valid"
        })

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

const isAdmin = async (req,res)=>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            err:{},
            success:true,
            message: "Successfully fetched whether user is Admin or not"
        })

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
    signIn,
    isAuthenticated,
    isAdmin
}