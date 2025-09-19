const UserRepository = require("../repository/user_repository")

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Somethingwent wrong in Service layer");
            throw(error);
        }
    }

}

module.exports = UserService;