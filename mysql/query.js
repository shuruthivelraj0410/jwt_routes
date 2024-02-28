import {registerUsers} from './model.js';
import { Op } from 'sequelize';
const createUser = async (values)=>{
    try{
  let data = await registerUsers.findOrCreate({
    where :{ 
    emailId : values.username
},
    defaults :{
        emailId : values.username,
        password : values.password,
        role : values.role
    }
  })
  return data;
}catch(e){
    console.log("Error in creating user : ",e);
    return e;
}
}

const findUser = async (values)=>{
    try{
        console.log("values::: ",values)
    let data = await registerUsers.findOne({
        where : {
            emailId: values.username
        }
    })
    data = JSON.parse(JSON.stringify(data))
    return data
}
catch(e){
    console.log("Error in finding user : ",e)
    return e;
}
}

export {
    createUser,
    findUser
}