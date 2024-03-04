const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const path = require("path")
const fs = require("fs")

const getAll = catchError(async(req, res) => {
    const resutl = await ProductImg.findAll()
    return res.json(resutl)
});
const create = catchError(async (req, res) => {
    const { filename}= req.file
    console.log(filename)

     const url=`${req.protocol }://${req.headers.host}/uploads/${filename}`; 
    const newBOdy = {filename , url}
    const result= await ProductImg.create(newBOdy)
 return  res.status(201).json(result)
})
const remove = catchError(async (req, res)=>{
   const {id}= req.params
   const result =await ProductImg.findByPk(id)
   if(!result) return res.sendStatus(404)

   const imageFilePAth= path.join(__dirname,"..","public",'uploads',`${result.filename}`)
    fs.unlinkSync(imageFilePAth);
   await result.destroy()

   return res.sendStatus(204)

})
module.exports = {
    getAll,
    create,
    remove
}