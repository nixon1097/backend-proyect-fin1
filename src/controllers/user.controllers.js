const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});



const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.status(204).json({message:"delete users"});
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
   delete req.body.password
   delete req.body.email     
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req,res)=>{

    const { id, email, password}= req.body
    // email
    const  user = await User.findOne({where:{email}})
    if (!user) return res.status(401).json({message:'Invalid credentials'})
    // password
const validPassword = await bcrypt.compare(password, user.password) 
if (!validPassword) return res.status(401).json({message:"Invalid credentials"})
 // generetion token 
const token = jwt.sign(  //llave que abrira la cerradura
    {user},
    process.env.TOKEN_SECRET,//cerradura que tenemos en nuestra casa
    {expiresIn:'1d'} )


    return res.json({user,token })


})


module.exports = {
    getAll,
    create,
    remove,
    update,
    login
}