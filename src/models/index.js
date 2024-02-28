const User = require("./User")
const Category = require('./Category')
const  Product = require('./Product');

// ProductId -> categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

