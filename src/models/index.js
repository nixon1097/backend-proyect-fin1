const User = require("./User")
const Category = require('./Category')
const  Product = require('./Product');
const Cart = require("./Cart");
const Purchase = require("./Purcharse");
const ProductImg = require("./ProductImg");

// ProductId -> categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//CartId-> UserId
Cart.belongsTo(User)
User.hasMany(Cart)

//CartId -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase -> userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase -> productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//ProducyImga ->productId

ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)

