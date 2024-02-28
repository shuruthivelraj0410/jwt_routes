import { DataTypes } from "sequelize";
import { sequelize } from "./connection.js";


const registerUsers = sequelize.define('registerUsers',{
    id :{
    type: DataTypes.INTEGER,
    allowNull : false,
    autoIncrement : true,
    primaryKey : true
    },
    emailId : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password :{
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    role : {
        type : DataTypes.STRING,
        allowNull : false,
        defaultValue : "user"
    }
})

registerUsers.sync().then(()=>{
    console.log("table created successfully")
}).catch((e)=>{
    console.log("Error in creating table ",e)
})

export {
    registerUsers
}