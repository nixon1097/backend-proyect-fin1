const User = require("../../models/User")

const userCreate = async()=>{

  await User.create(
    {

    firstName:"Nixon",
    lastName:"Parra",
    email:"nixonandrewparra@gmail.com",
    password: "1234nixon",
    phone:"+573026898020"
    }
  )

}
module.exports= userCreate