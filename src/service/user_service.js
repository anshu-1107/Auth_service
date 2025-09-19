const UserRepository = require("../repository/user_repository")
const jwt = require("jsonwebtoken")
const {JWT_KEY} = require("../config/serverConfig")
const bcrypt = require("bcrypt")

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Some thing went wrong in Service layer");
            throw(error);
        }
    }

    async getById(id){
        try {
            const user = await this.userRepository.getById(id);
            return user;
        } catch (error) {
            console.log("Something went wrong in Service layer");
            throw(error);
        }
    }

    async signIn(email,plainPassword){
        try {
            // step 1 : fetch the user using email
            const user = await this.userRepository.getByEmail(email);
            // step 2 : compare incoming plain password with stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword,user.password);
            
            if(!passwordsMatch)
            {
                console.log("Password dosen't match");
                throw {error:"Incorrect Password"};
            }
            
            // if passwords match then create token and send it to user
            const newJWT = this.createToken({email:user.email, id:user.id});
            return newJWT;

        } catch (error) {
            console.log("Something went wrong in the sign in Process");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1d'} );
            return result;
        } catch (error) {
            console.log("Something went wrong in the token creation")
            throw error; 
        }
    }

    verifyToken(token){
        try {
            const result = jwt.verify(token,JWT_KEY);
            return result;
        } catch (error) {
            console.log("Something went wrong in the token validation ", error)
            throw error; 
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Somethin went wrong in Password comparison");
            throw error;
        }
    }

}

module.exports = UserService;