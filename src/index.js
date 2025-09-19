const express = require("express")
const app = express();
const {PORT, DB_SYNC} = require("./config/serverConfig")

const apiRoutes = require("./routes/index"); 
const bodyParser = require("body-parser");
const db = require("./models/index")
const {Role,User} = require("./models/index")

const prepareAndStart = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))

    app.use('/api',apiRoutes);

    app.listen(PORT,async ()=>{
        console.log(`Server started at PORT:${PORT}`);
        if(DB_SYNC==true){
            db.sequelize.sync({alter:true})
        }
        // const u1 = await User.findByPk(4);
        // const r1 = await Role.findByPk(3);
        // // u1.addRole(r1);
        // const response = await u1.getRoles();
        // console.log(response);

    })

}

prepareAndStart()