const validateUserAuth = (req,res,next)=>{  // used for both signUp and signIn

    if(!req.body.email || !req.body.password)
    {
        return res.status(400).json({
            success:false,
            data:{},
            message:"Something went wrong",
            error:"Email or Password is missing!"
        });
    }
    next();
}

module.exports = {
    validateUserAuth
}