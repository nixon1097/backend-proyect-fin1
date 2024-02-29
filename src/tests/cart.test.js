// require('../models')
// const request = require('supertest');
// const app = require ('../app');
// const Product = require('../models/Product');

// const BASE_URL = '/cart'
// const URL_BASE_USERS='/users'

// let cart 
// let user
// let userId
// let product
// let TOKEN

// beforeAll(async()=>{
//      // login de usuario 
//       user ={
//         email:"nixonandrewparra@gmail.com",
//         password: "1234nixon"
//     }
//      const res= await request(app)
//      .post(`${URL_BASE_USERS}/login`)
//      .send(user)
   
//     TOKEN=res.body.token
//     userId=res.body.user.id

//     product= await Product.create({
//         title: "lorem20",
//         description: "lorenn200",
//         price: "20.5",
        
//     })

//     cart= {
        
//         quantity:3,
//         productId:product.id
//     }

// })

// test("POST -> 'BASE_URL', should return res.statusCode 201, to be defined and res.body.quantify === cart.quantify",async()=>{

//      const res= await request(app)
//      .post(BASE_URL)
//      .send(cart) 
//      .set("Authorization", `Bearer ${TOKEN}`)
//      console.log(res.body)

//      expect (res.status).toBe(201)
//      expect(res.body).toBeDefined()
//      expect(res.body.quantity).toBe(cart.quantity)
//      await product.destroy()
 
// })

// // test("GET -> 'URL_BASE', should status 200, res.body to be defined and res.body.length === 1",async()=>{
// //     const res= await request(app)
// //      .get(BASE_URL)
// //      .set("Authorization", `Bearer ${TOKEN}`)

// //      console.log(res.body);

// //      expect(res.statusCode).toBe(200)
// //      expect(res.body).toBeDefined()
// //      expect(res.body).toHaveLength(1)

// //       await product.destroy()


// // })