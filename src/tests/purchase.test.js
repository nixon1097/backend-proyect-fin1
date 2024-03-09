require('../models')
const request  = require('supertest')
const app = require('../app')
const Product = require('../models/Product')

const URL_USER = "/users/login"
const URL_PURCHASE  = "/purchase"
let TOKEN
let userId
let product
let cart  

beforeAll(async()=>{
    const  user ={
        email:"nixonandrewparra@gmail.com",
        password: "1234nixon"
    }
    const res= await request(app)
    .post(URL_USER)
    .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id

    product= await Product.create({
        title: 'Product 1',
        description: 'Description of the product 1',
        price:45.65
     }        
    )
    cart = {
        productId:product.id,
        quantity:3
    }
    await request(app)
    .post("/cart")
    .send(cart)
    .set("Authorization", `Bearer ${TOKEN}`)


})
test("POST -> URL_PURCHASE, should return status code 201, res.body to be defined and res.body.quantity  === bodyCart.quantity", async () => {
    const res = await request(app)
      .post(URL_PURCHASE)
      .set("Authorization", `Bearer ${TOKEN}`)
  
    // console.log(res.body);
    expect(res.status).toBe(201)
    expect(res.body[0]).toBeDefined()
    expect(res.body[0].quantity).toBe(cart.quantity)


  })

  test("GET -> URL_PURCHASE, should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    const res = await request(app)
      .get(URL_PURCHASE)
      .set("Authorization", `Bearer ${TOKEN}`)
  
    // console.log(res.body);
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
  
    expect(res.body[0].productId).toBeDefined()
    expect(res.body[0].productId).toBe(product.id)
  
    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].userId).toBe(userId)
  
    await product.destroy()
  
  
  })