import { Sequelize } from "sequelize";

const sequelize = new Sequelize('sequelize_test','root','password',{
    host :"127.0.0.1",
    port : 3306,
    dialect : "mysql"
})

sequelize.authenticate().then(()=>{
    console.log("connection established successfully")
}).catch((e)=>{
    console.log("Error in connecting database ",e)
})

export {
    sequelize
}