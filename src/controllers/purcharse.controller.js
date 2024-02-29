const catchError = require('../utils/catchError');
const Purcharse = require('../models/Purcharse');
const Cart = require('../models/Cart');
const Purchase = require('../models/Purcharse');
const Category = require('../models/Category');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
     const results = await Purcharse.findAll({ 
        where:{userId},
        include:[{
            model: Product,
            attributes:{exclude:['createdAt', 'updatedAt']},
          include:{
            model: Category,
            attributes:['name']
          }
        }]
     });
      return res.json(results);
});
const create = catchError(async(req, res) => {
    const userId = req.user.id
    const cart = await Cart.findAll({
        where:{userId},
        raw:true,
        attributes:['quantity','userId', 'productId']  //raw es para que no me devuelva el id de la tabla intermedia 
    })
    if(!cart) return res.sendStatus(404)
    const result= await Purchase.bulkCreate(cart)
    if(!result) return res.sendStatus(404)

    await  Cart.destroy({where:{userId}}); //delete the cart after purchase
    return res.status(201).json(result);
});

module.exports = {
    getAll,
   create
   
}